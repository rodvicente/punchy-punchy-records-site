const translations = {
  en: {
    nav: { home: "Home", releases: "Releases", demos: "Submit demos", contact: "Contact" },
    hero: {
      title: "Music with impact",
      lead: "Independent label focused on urban, electronic and alternative sounds."
    },
    buttons: {
      listenNow: "Listen now",
      listenReleases: "Listen to releases",
      submitDemo: "Submit demo",
      email: "Write by email",
      sendMessage: "Send message",
      listen: "Listen",
      more: "More",
      close: "Close"
    },
    releases: { eyebrow: "Catalog", title: "Releases", platforms: "View platforms" },
    about: {
      title: "Sounds without limits",
      p1: "Punchy Punchy Records is an independent label created to push music with identity, energy and production vision.",
      p2: "We work with artists, producers and projects moving between urban, electronic, alternative and organic sounds: from trap, house, drum and bass and electropop to funk, folk, downtempo and hard-to-label hybrids.",
      p3: "The idea is simple: authentic, powerful music with a future-facing vision."
    },
    demos: {
      title: "Got music to show?",
      p1: "If you are working on an urban, electronic, alternative or hard-to-label project, you can submit your demo for us to listen.",
      p2: "We accept demos, finished songs, ideas in development and projects with their own identity.",
      notice: "Please send listening links. Do not attach heavy files."
    },
    artists: { title: "Artists", badge: "Roster" },
    platforms: { title: "Links / Platforms" },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk",
      copy: "For press, releases, partnerships, distribution or production, write to us at:"
    },
    forms: {
      artistName: "Artist name",
      email: "Email",
      location: "Country / city",
      listenLink: "Listening link",
      genre: "Genre / style",
      message: "Message",
      name: "Name",
      subject: "Subject"
    },
    footer: { copy: "© 2026 Punchy Punchy Records. All rights reserved." },
    formStatus: "Received. Replace this behavior when you connect the form.",
    imageAlt: { cover: "Cover artwork for", artist: "Photo of" }
  },
  es: {
    nav: { home: "Inicio", releases: "Lanzamientos", demos: "Enviá tu maqueta", contact: "Contacto" },
    hero: {
      title: "Música con impacto",
      lead: "Sello independiente enfocado en sonidos urbanos, electrónicos y alternativos."
    },
    buttons: {
      listenNow: "Escuchar ahora",
      listenReleases: "Escuchar lanzamientos",
      submitDemo: "Enviar maqueta",
      email: "Escribir por email",
      sendMessage: "Enviar mensaje",
      listen: "Escuchar",
      more: "Ver más",
      close: "Cerrar"
    },
    releases: { eyebrow: "Catálogo", title: "Lanzamientos", platforms: "Ver plataformas" },
    about: {
      title: "Sonidos sin límites",
      p1: "Punchy Punchy Records es un sello independiente creado para impulsar música con identidad, energía y criterio de producción.",
      p2: "Trabajamos con artistas, productores y proyectos que se mueven entre lo urbano, lo electrónico, lo alternativo y lo orgánico: desde trap, house, drum and bass y electropop hasta funk, folk, downtempo y fusiones difíciles de encasillar.",
      p3: "La idea es simple: música auténtica, potente y con visión de futuro."
    },
    demos: {
      title: "¿Tenés música para mostrar?",
      p1: "Si estás trabajando en un proyecto urbano, electrónico, alternativo o difícil de encasillar, podés enviar tu maqueta para que la escuchemos.",
      p2: "Aceptamos demos, canciones terminadas, ideas en desarrollo y proyectos con identidad propia.",
      notice: "Por favor enviá links de escucha. No adjuntes archivos pesados."
    },
    artists: { title: "Artistas", badge: "Roster" },
    platforms: { title: "Links / Plataformas" },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos",
      copy: "Para prensa, lanzamientos, alianzas, distribución o producción, escribinos a:"
    },
    forms: {
      artistName: "Nombre artístico",
      email: "Email",
      location: "País / ciudad",
      listenLink: "Link de escucha",
      genre: "Género / estilo",
      message: "Mensaje",
      name: "Nombre",
      subject: "Motivo"
    },
    footer: { copy: "© 2026 Punchy Punchy Records. Todos los derechos reservados." },
    formStatus: "Recibido. Reemplazá este comportamiento cuando conectes el formulario.",
    imageAlt: { cover: "Portada de", artist: "Foto de" }
  }
};

let currentLanguage = "en";

function t(key) {
  return key.split(".").reduce((value, part) => value?.[part], translations[currentLanguage]) || key;
}

function localize(item, field) {
  return item[currentLanguage]?.[field] || item[field];
}

const releases = [
  {
    title: "Fuerza",
    artist: "Yesenia Quintero",
    credits: "Produced by Rod Vicente",
    date: "June 24, 2026",
    genre: "Latin / Urban / Pop",
    mood: "New release",
    es: {
      credits: "Producido por Rod Vicente",
      date: "24 de junio de 2026",
      mood: "Nuevo lanzamiento"
    },
    coverImage: "assets/covers/FUERZA.png",
    spotify: "https://open.spotify.com/intl-es/artist/2TMbr2pJzuY2AvSAkZjL1U?si=5ODBs_6NRw2A9DtL1bKjIQ",
    youtube: "dQw4w9WgXcQ",
    links: {
      Spotify: "https://open.spotify.com/intl-es/artist/2TMbr2pJzuY2AvSAkZjL1U?si=5ODBs_6NRw2A9DtL1bKjIQ",
      Instagram: "https://www.instagram.com/rodvicentemusic",
      YouTube: "https://youtube.com/@rodvicentemusic",
      "Apple Music": "#"
    }
  },
  {
    title: "Love To Be",
    artist: "Rod Vicente",
    credits: "Punchy Punchy Records",
    date: "Out now",
    genre: "Electronic / Pop / House",
    mood: "Rod Vicente",
    es: {
      date: "Disponible ahora"
    },
    coverImage: "assets/covers/rod-final-mix.jpg",
    spotify: "https://open.spotify.com/intl-es/track/6npoKcqJxgLDjXi8QpuwIn?si=8a00cbb7097d4f55",
    youtube: "https://youtube.com/@rodvicentemusic",
    links: {
      Spotify: "https://open.spotify.com/intl-es/track/6npoKcqJxgLDjXi8QpuwIn?si=8a00cbb7097d4f55",
      Instagram: "https://www.instagram.com/rodvicentemusic",
      YouTube: "https://youtube.com/@rodvicentemusic"
    }
  },
  {
    title: "Tell Me What Is Wrong",
    artist: "Rod Vicente",
    credits: "Punchy Punchy Records",
    date: "Out now",
    genre: "Electronic / Alternative",
    mood: "Single",
    es: {
      date: "Disponible ahora"
    },
    coverImage: "assets/covers/rod-final-mix.jpg",
    spotify: "https://open.spotify.com/intl-es/album/0wrT3ygaTeINuyIzUzPvgL?si=Hvkh0MVhRAWv0SxTEKn6-g",
    youtube: "https://youtube.com/@rodvicentemusic",
    links: {
      Spotify: "https://open.spotify.com/intl-es/album/0wrT3ygaTeINuyIzUzPvgL?si=Hvkh0MVhRAWv0SxTEKn6-g",
      Instagram: "https://www.instagram.com/rodvicentemusic",
      YouTube: "https://youtube.com/@rodvicentemusic"
    }
  },
  {
    title: "Long Way Home",
    artist: "Rod Vicente",
    credits: "Punchy Punchy Records",
    date: "Out now",
    genre: "Downtempo / Electronic",
    mood: "Single",
    es: {
      date: "Disponible ahora"
    },
    coverImage: "assets/covers/long-way-home.jpg",
    spotify: "https://open.spotify.com/intl-es/album/6ksJAqZ3Gy5Nj6YlzU3jQM?si=mhXZ3J0JRP63IWT6QdLitw",
    youtube: "https://youtube.com/@rodvicentemusic",
    links: {
      Spotify: "https://open.spotify.com/intl-es/album/6ksJAqZ3Gy5Nj6YlzU3jQM?si=mhXZ3J0JRP63IWT6QdLitw",
      Instagram: "https://www.instagram.com/rodvicentemusic",
      YouTube: "https://youtube.com/@rodvicentemusic"
    }
  },
  {
    title: "Strange Fire (Radio Edit)",
    artist: "Taxi Radio",
    credits: "Taxi Radio",
    date: "Out now",
    genre: "Electronic / Pop / Alternative",
    mood: "Taxi Radio",
    es: {
      date: "Disponible ahora"
    },
    coverImage: "assets/covers/taxi-radio-strange-fire.jpg",
    spotify: "https://open.spotify.com/intl-es/album/0xVaKXO5hoN27ur5DQCqn6?si=KIG_DFyjTr-_gdkGa4xhwA",
    youtube: "",
    links: {
      Spotify: "https://open.spotify.com/intl-es/album/0xVaKXO5hoN27ur5DQCqn6?si=KIG_DFyjTr-_gdkGa4xhwA"
    }
  },
  {
    title: "Strange Fire (Rod Vicente Remix 2025)",
    artist: "Taxi Radio",
    credits: "Remix by Rod Vicente",
    date: "Out now",
    genre: "Electronic / Remix / Pop",
    mood: "Remix",
    es: {
      credits: "Remix por Rod Vicente",
      date: "Disponible ahora"
    },
    coverImage: "assets/covers/taxi-radio-strange-fire-remix.jpg",
    spotify: "",
    youtube: "",
    links: {
      Spotify: "#"
    }
  }
];

const artists = [
  {
    name: "Rod Vicente",
    style: "Producer / Pop / Electro",
    image: "assets/artists/rod-vicente.jpg",
    imagePosition: "27% center",
    links: {
      Spotify: "https://open.spotify.com/intl-es/artist/2TMbr2pJzuY2AvSAkZjL1U?si=5ODBs_6NRw2A9DtL1bKjIQ",
      Instagram: "https://www.instagram.com/rodvicentemusic",
      YouTube: "https://youtube.com/@rodvicentemusic"
    }
  },
  {
    name: "Yesenia Quintero",
    style: "Latin / Urban / Pop",
    image: "assets/artists/yesenia-quintero.png",
    imagePosition: "43% center",
    links: {
      Spotify: "https://open.spotify.com/intl-es/artist/1W9u5FKMPiA6tYcxQcToZZ?si=D3fn7LyPRsW-RO0ZM5yU4g",
      Instagram: "https://www.instagram.com/yeseniaquinteroc/",
      YouTube: "https://www.youtube.com/@YeseniaQuinteroC"
    }
  },
  {
    name: "Taxi Radio",
    style: "Electronic / Pop / Alternative",
    image: "assets/artists/taxi-radio-avatar.png",
    es: {
      style: "Electronic / Pop / Alternativo"
    },
    links: {
      Spotify: "https://open.spotify.com/intl-es/artist/0722h5FRnYosm6AdnNWhI5?si=dmzKD8hnQIiW9oRusooqfw"
    }
  }
];

const platforms = [
  "Spotify",
  "Instagram",
  "YouTube",
  "Apple Music",
  "SoundCloud",
  "Bandcamp",
  "TikTok",
  "Deezer",
  "Tidal",
  "Amazon Music"
];

const platformIcons = {
  spotify: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"/>
      <path d="M7.7 9.6c3.15-.85 6.32-.55 8.82.92"/>
      <path d="M8.35 12.25c2.4-.58 4.86-.34 6.85.82"/>
      <path d="M9.05 14.75c1.72-.34 3.42-.16 4.78.62"/>
    </svg>`,
  instagram: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4"/>
      <circle cx="12" cy="12" r="3.25"/>
      <path d="M16.6 7.45h.01"/>
    </svg>`,
  youtube: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="7" width="16" height="10" rx="3"/>
      <path d="m10.5 9.8 4.5 2.2-4.5 2.2Z"/>
    </svg>`,
  soundcloud: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 14v3"/>
      <path d="M7 12v5"/>
      <path d="M10 10v7"/>
      <path d="M13 17h5.1a2.9 2.9 0 0 0 .2-5.8 4.5 4.5 0 0 0-8.3-1.45"/>
    </svg>`,
  apple: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.72 12.52c-.02-2.28 1.86-3.38 1.95-3.43-1.06-1.55-2.71-1.76-3.29-1.78-1.4-.14-2.73.82-3.44.82-.72 0-1.82-.8-2.99-.78-1.54.02-2.96.9-3.75 2.28-1.6 2.77-.41 6.88 1.15 9.12.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74s1.78.74 2.99.72c1.24-.03 2.02-1.12 2.78-2.22.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.42-.93-2.45-3.71ZM14.46 5.84c.63-.76 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.59.68-1.1 1.77-.96 2.81 1.02.08 2.06-.52 2.69-1.29Z"/>
    </svg>`,
  bandcamp: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.22 6.5h14.2l-4.64 11H2.58l4.64-11Z"/>
    </svg>`,
  tiktok: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.4 2c.35 3 2.04 4.79 4.84 4.98v3.27a8.26 8.26 0 0 1-4.74-1.44v6.04c0 3.05-2.05 5.68-5.39 6.04-3.56.38-6.48-2.34-6.48-5.73 0-3.31 2.67-5.9 6.15-5.73.35.02.69.07 1.02.16v3.48a2.92 2.92 0 0 0-1.38-.24 2.35 2.35 0 0 0-2.16 2.65 2.38 2.38 0 0 0 2.72 2.08c1.31-.2 2.02-1.25 2.02-2.57V2h3.4Z"/>
    </svg>`,
  deezer: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 14h3.6v2.6H3V14Zm0 3.4h3.6V20H3v-2.6Zm4.4-6.8H11v2.6H7.4v-2.6Zm0 3.4H11v2.6H7.4V14Zm0 3.4H11V20H7.4v-2.6Zm4.4-10.2h3.6v2.6h-3.6V7.2Zm0 3.4h3.6v2.6h-3.6v-2.6Zm0 3.4h3.6v2.6h-3.6V14Zm0 3.4h3.6V20h-3.6v-2.6Zm4.4-13.6H20v2.6h-3.8V3.8Zm0 3.4H20v2.6h-3.8V7.2Zm0 3.4H20v2.6h-3.8v-2.6Zm0 3.4H20v2.6h-3.8V14Zm0 3.4H20V20h-3.8v-2.6Z"/>
    </svg>`,
  tidal: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3.5 4.25 4.25L12 12 7.75 7.75 12 3.5ZM3.5 12l4.25-4.25L12 12l-4.25 4.25L3.5 12Zm17 0-4.25-4.25L12 12l4.25 4.25L20.5 12ZM12 12l4.25 4.25L12 20.5l-4.25-4.25L12 12Z"/>
    </svg>`,
  amazon: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.6 17.58c-1.28.94-3.14 1.44-4.74 1.44-2.25 0-4.27-.83-5.8-2.22-.12-.11-.01-.26.13-.17 1.66.96 3.7 1.54 5.82 1.54 1.42 0 2.98-.29 4.42-.9.22-.09.39.15.17.31Zm.53-.61c-.16-.21-1.08-.1-1.49-.05-.13.02-.15-.1-.03-.18.77-.54 2.03-.38 2.18-.2.15.18-.04 1.39-.76 1.98-.11.09-.22.04-.17-.08.16-.39.43-1.25.27-1.47ZM8.7 12.56c0-1.77 1.69-2.7 4.55-3.03v-.46c0-.83-.39-1.23-1.2-1.23-.76 0-1.24.37-1.42 1.11l-1.52-.18c.29-1.45 1.41-2.18 3.05-2.18 1.85 0 2.77.83 2.77 2.48v4.46h-1.48l-.13-.95c-.52.72-1.23 1.08-2.13 1.08-1.49 0-2.49-.8-2.49-2.1Zm4.55-1.76c-1.91.25-2.85.74-2.85 1.58 0 .57.38.89 1.02.89.95 0 1.83-.83 1.83-1.75v-.72Z"/>
    </svg>`
};

function getPlatformIcon(name) {
  const key = name.toLowerCase().replace(" music", "").replace(/\s+/g, "");
  if (key.includes("spotify")) return platformIcons.spotify;
  if (key.includes("instagram")) return platformIcons.instagram;
  if (key.includes("youtube")) return platformIcons.youtube;
  if (key.includes("apple")) return platformIcons.apple;
  if (key.includes("soundcloud")) return platformIcons.soundcloud;
  if (key.includes("bandcamp")) return platformIcons.bandcamp;
  if (key.includes("tiktok")) return platformIcons.tiktok;
  if (key.includes("deezer")) return platformIcons.deezer;
  if (key.includes("tidal")) return platformIcons.tidal;
  if (key.includes("amazon")) return platformIcons.amazon;
  return platformIcons.spotify;
}

function getYouTubeEmbedUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
    }
    if (url.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }
    if (url.pathname.includes("/embed/")) {
      return trimmed;
    }
    if (url.hostname.includes("youtube.com") && url.pathname.includes("@")) {
      return "";
    }
  } catch {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  return `https://www.youtube.com/embed/${trimmed}`;
}

function YouTubeEmbed(source, title) {
  const embedUrl = getYouTubeEmbedUrl(source);
  if (!embedUrl) return "";

  return `
    <div class="embed-block youtube-embed">
      <iframe
        src="${embedUrl}"
        title="Video de YouTube: ${title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
  `;
}

function getSpotifyEmbedUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();

  try {
    const url = new URL(trimmed);
    if (!url.hostname.includes("spotify.com")) return trimmed;
    if (url.pathname.includes("/embed/")) return trimmed;

    const parts = url.pathname.split("/").filter(Boolean);
    const typeIndex = parts.findIndex((part) => ["track", "album", "playlist", "artist"].includes(part));
    if (typeIndex === -1 || !parts[typeIndex + 1]) return trimmed;

    return `https://open.spotify.com/embed/${parts[typeIndex]}/${parts[typeIndex + 1]}`;
  } catch {
    return trimmed;
  }
}

function SpotifyEmbed(source, title) {
  const embedUrl = getSpotifyEmbedUrl(source);
  if (!embedUrl) return "";

  return `
    <div class="embed-block spotify-embed">
      <iframe
        src="${embedUrl}"
        title="Spotify player: ${title}"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </div>
  `;
}

function ReleaseCard(release, index) {
  const links = Object.entries(release.links)
    .map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
  const coverClass = release.coverImage ? "cover-art has-image" : `cover-art variant-${release.coverVariant}`;
  const coverImage = release.coverImage ? `<img src="${release.coverImage}" alt="${t("imageAlt.cover")} ${release.title}">` : "";

  return `
    <article class="release-card" data-release-card>
      <div class="release-main">
        <div class="${coverClass}" aria-label="${t("imageAlt.cover")} ${release.title}" role="img">${coverImage}</div>
        <div class="release-meta">
          <span class="badge">${localize(release, "mood")}</span>
          <h3>${release.title}</h3>
          <p class="artist-name">${release.artist}</p>
          <p class="release-credits">${localize(release, "credits")}</p>
          <p class="release-date">${localize(release, "date")}</p>
          <p class="release-genre">${localize(release, "genre")}</p>
          <div class="card-actions">
            <a class="button button-primary" href="${release.links.Spotify || "#"}">${t("buttons.listen")}</a>
            <button class="button button-secondary" type="button" aria-expanded="false" data-release-toggle>
              ${t("buttons.more")}
            </button>
          </div>
        </div>
      </div>
      <div class="release-details" id="release-details-${index}">
        ${SpotifyEmbed(release.spotify, release.title)}
        ${YouTubeEmbed(release.youtube, release.title)}
        <div class="external-links">${links}</div>
      </div>
    </article>
  `;
}

function ArtistCard(artist) {
  const artistLinks = currentLanguage === "es" && artist.esLinks ? artist.esLinks : artist.links;
  const linkEntries = Array.isArray(artistLinks)
    ? artistLinks.map((link) => [link, "#"])
    : Object.entries(artistLinks);
  const links = linkEntries.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("");
  const imageClass = artist.image ? "artist-image has-image" : "artist-image";
  const image = artist.image ? `<img src="${artist.image}" alt="${t("imageAlt.artist")} ${artist.name}">` : "";
  const imageStyle = artist.imagePosition ? ` style="--artist-position: ${artist.imagePosition};"` : "";

  return `
    <article class="artist-card">
      <div class="${imageClass}" aria-label="${t("imageAlt.artist")} ${artist.name}" role="img"${imageStyle}>${image}</div>
      <div class="artist-content">
        <h3>${artist.name}</h3>
        <p>${localize(artist, "style")}</p>
        <div class="external-links">${links}</div>
      </div>
    </article>
  `;
}

function PlatformLinks(platform) {
  return `
    <a class="platform-card" href="#" aria-label="${platform}">
      <span class="platform-icon">${getPlatformIcon(platform)}</span>
      <strong>${platform}</strong>
    </a>
  `;
}

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const languageToggle = document.querySelector("[data-lang-toggle]");

function renderIcons() {
  document.querySelectorAll("[data-platform-icon]").forEach((link) => {
    link.innerHTML = getPlatformIcon(link.dataset.platformIcon);
  });
}

function bindReleaseToggles() {
  document.querySelectorAll("[data-release-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-release-card]");
      const isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? t("buttons.close") : t("buttons.more");
    });
  });
}

function renderDynamicContent() {
  document.querySelector("[data-release-grid]").innerHTML = releases.map(ReleaseCard).join("");
  document.querySelector("[data-artist-grid]").innerHTML = artists.map(ArtistCard).join("");
  document.querySelector("[data-platform-grid]").innerHTML = platforms.map(PlatformLinks).join("");
  bindReleaseToggles();
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  languageToggle.textContent = language === "en" ? "ES" : "EN";
  languageToggle.setAttribute("aria-label", language === "en" ? "Cambiar a español" : "Switch to English");
  renderDynamicContent();
  renderIcons();
}

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

languageToggle.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "es" : "en");
});

document.querySelectorAll(".main-nav a, .site-footer a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("form").forEach((form) => {
  const status = document.createElement("p");
  status.className = "form-status wide";
  status.setAttribute("role", "status");
  form.append(status);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    status.textContent = t("formStatus");
  });
});

applyLanguage("en");
