<?php
declare(strict_types=1);

$configPath = __DIR__ . '/smtp-config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    exit('Missing SMTP configuration.');
}

$config = require $configPath;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

$isAjax = strtolower($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'xmlhttprequest';
$maxAttachmentBytes = max((int)($config['max_attachment_bytes'] ?? 0), 30 * 1024 * 1024);

function respond_error(string $message, int $statusCode, bool $isAjax): void
{
    http_response_code($statusCode);
    if ($isAjax) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => false, 'message' => $message]);
        exit;
    }
    exit($message);
}

function respond_success(string $message, bool $isAjax): void
{
    if ($isAjax) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => true, 'message' => $message]);
        exit;
    }
    header('Location: index.html?sent=1#maqueta');
    exit;
}

function clean_text(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function field(string $name): string
{
    return trim((string)($_POST[$name] ?? ''));
}

function encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function smtp_read($socket): string
{
    $data = '';
    while (($line = fgets($socket, 515)) !== false) {
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $data;
}

function smtp_command($socket, string $command, array $expected): string
{
    fwrite($socket, $command . "\r\n");
    $response = smtp_read($socket);
    $code = (int)substr($response, 0, 3);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException('SMTP error: ' . trim($response));
    }
    return $response;
}

function smtp_send(array $config, string $to, string $subject, string $html, string $replyTo = '', array $attachment = []): void
{
    $socket = fsockopen($config['host'], (int)$config['port'], $errno, $errstr, 20);
    if (!$socket) {
        throw new RuntimeException("SMTP connection failed: {$errstr}");
    }

    smtp_read($socket);
    smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
    smtp_command($socket, 'STARTTLS', [220]);
    stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
    smtp_command($socket, 'AUTH LOGIN', [334]);
    smtp_command($socket, base64_encode($config['username']), [334]);
    smtp_command($socket, base64_encode($config['password']), [235]);

    $fromEmail = $config['from_email'];
    $fromName = $config['from_name'];
    smtp_command($socket, "MAIL FROM:<{$fromEmail}>", [250]);
    smtp_command($socket, "RCPT TO:<{$to}>", [250, 251]);
    smtp_command($socket, 'DATA', [354]);

    $boundary = 'pp_' . bin2hex(random_bytes(12));
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . encode_header($fromName) . " <{$fromEmail}>",
        "To: <{$to}>",
        'Subject: ' . encode_header($subject),
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    ];
    if ($replyTo !== '') {
        $headers[] = "Reply-To: <{$replyTo}>";
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n";
    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $html . "\r\n\r\n";

    if ($attachment) {
        $filename = clean_text($attachment['name']);
        $mime = $attachment['type'] ?: 'application/octet-stream';
        $content = chunk_split(base64_encode(file_get_contents($attachment['tmp_name'])));
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: {$mime}; name=\"{$filename}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
        $message .= $content . "\r\n";
    }

    $message .= "--{$boundary}--\r\n.";
    smtp_command($socket, $message, [250]);
    smtp_command($socket, 'QUIT', [221]);
    fclose($socket);
}

function html_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function format_bytes(int $bytes): string
{
    return number_format($bytes / 1024 / 1024, 1) . ' MB';
}

function build_upload_url(string $filename): string
{
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($host === '') {
        return 'uploads/demos/' . rawurlencode($filename);
    }

    $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    $scheme = $isHttps ? 'https' : 'http';
    $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');
    if ($scriptDir === '/') {
        $scriptDir = '';
    }

    return $scheme . '://' . $host . $scriptDir . '/uploads/demos/' . rawurlencode($filename);
}

$formType = field('form_type') ?: 'demo';
$email = clean_text(field('email'));
$name = clean_text(field('name') ?: field('artist'));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond_error('Invalid email.', 400, $isAjax);
}

$attachment = [];
$emailAttachment = [];
$uploadedFileName = '';
$uploadedFileUrl = '';
$uploadedFileSize = '';
$uploadedFileDelivery = '';
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES['attachment']['error'] !== UPLOAD_ERR_OK) {
        respond_error('Upload failed.', 400, $isAjax);
    }
    if ($_FILES['attachment']['size'] > $maxAttachmentBytes) {
        respond_error('Attachment is too large. Maximum size is 30 MB.', 400, $isAjax);
    }

    $allowedExtensions = ['mp3', 'wav', 'aiff', 'aif', 'm4a', 'flac', 'ogg'];
    $extension = strtolower(pathinfo((string)$_FILES['attachment']['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $allowedExtensions, true)) {
        respond_error('Unsupported audio file type.', 400, $isAjax);
    }

    $uploadDir = __DIR__ . '/uploads/demos';
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
        respond_error('Could not store uploaded file.', 500, $isAjax);
    }

    $storedName = date('Ymd-His') . '-' . bin2hex(random_bytes(8)) . '.' . $extension;
    $storedPath = $uploadDir . '/' . $storedName;
    if (!move_uploaded_file($_FILES['attachment']['tmp_name'], $storedPath)) {
        respond_error('Could not store uploaded file.', 500, $isAjax);
    }

    $attachment = $_FILES['attachment'];
    $uploadedFileName = clean_text((string)$attachment['name']);
    $uploadedFileUrl = build_upload_url($storedName);
    $uploadedFileSize = format_bytes((int)$attachment['size']);
    $uploadedFileDelivery = 'Link included';

    if ((int)$attachment['size'] <= 18 * 1024 * 1024) {
        $emailAttachment = [
            'name' => $uploadedFileName,
            'type' => $attachment['type'] ?: 'application/octet-stream',
            'tmp_name' => $storedPath,
        ];
        $uploadedFileDelivery = 'Attached and link included';
    }
}

$fields = [
    'Form' => $formType,
    'Name / Artist' => $name,
    'Email' => $email,
    'Location' => field('location'),
    'Project type' => field('project_type'),
    'Listening link' => field('listen'),
    'Genre / style' => field('genre'),
    'Audio file' => $uploadedFileName,
    'Audio file size' => $uploadedFileSize,
    'Audio file delivery' => $uploadedFileDelivery,
    'Audio file link' => $uploadedFileUrl,
    'Subject' => field('subject'),
    'Message' => field('message'),
];

$rows = '';
foreach ($fields as $label => $value) {
    if ($value === '') {
        continue;
    }
    $rows .= '<tr><th align="left" valign="top">' . html_escape($label) . '</th><td>' . nl2br(html_escape($value)) . '</td></tr>';
}

$adminSubject = 'New Punchy Punchy Records demo submission';
$adminHtml = '<h2>' . html_escape($adminSubject) . '</h2><table cellpadding="8" cellspacing="0" border="1">' . $rows . '</table>';

$thanksSubject = 'We received your demo - Punchy Punchy Records';
$thanksHtml = '<p>Thanks for sending your music to Punchy Punchy Records.</p><p>We received your demo and will listen to it soon.</p>';

try {
    smtp_send($config, $config['to_email'], $adminSubject, $adminHtml, $email, $emailAttachment);
    smtp_send($config, $email, $thanksSubject, $thanksHtml);
} catch (Throwable $error) {
    respond_error('Could not send message.', 500, $isAjax);
}

respond_success('Thanks. We received your demo and will listen to it soon.', $isAjax);
