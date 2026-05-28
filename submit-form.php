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

$formType = field('form_type') ?: 'contact';
$email = clean_text(field('email'));
$name = clean_text(field('name') ?: field('artist'));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid email.');
}

$attachment = [];
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES['attachment']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        exit('Upload failed.');
    }
    if ($_FILES['attachment']['size'] > (int)$config['max_attachment_bytes']) {
        http_response_code(400);
        exit('Attachment is too large.');
    }
    $attachment = $_FILES['attachment'];
}

$fields = [
    'Form' => $formType,
    'Name / Artist' => $name,
    'Email' => $email,
    'Location' => field('location'),
    'Project type' => field('project_type'),
    'Listening link' => field('listen'),
    'Genre / style' => field('genre'),
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

$adminSubject = $formType === 'demo'
    ? 'New Punchy Punchy Records demo submission'
    : 'New message for Punchy Punchy Records';
$adminHtml = '<h2>' . html_escape($adminSubject) . '</h2><table cellpadding="8" cellspacing="0" border="1">' . $rows . '</table>';

$thanksSubject = 'We received your message - Punchy Punchy Records';
$thanksHtml = '<p>Thanks for contacting Punchy Punchy Records.</p><p>We received your submission and will get back to you soon.</p>';

try {
    smtp_send($config, $config['to_email'], $adminSubject, $adminHtml, $email, $attachment);
    smtp_send($config, $email, $thanksSubject, $thanksHtml);
} catch (Throwable $error) {
    http_response_code(500);
    exit('Could not send message.');
}

header('Location: index.html?sent=1#contacto');
exit;
