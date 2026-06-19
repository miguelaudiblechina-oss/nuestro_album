/* ====================================================
   ÁLBUM DE ANIVERSARIO — lógica
   ==================================================== */

/* -----------------------------------------------------
   1. TUS PÁGINAS
   -----------------------------------------------------
   - photo: ruta a la imagen dentro de /img
   - letter: el texto de la carta para esa página
   - date: (opcional) fecha o etiqueta bajo la carta
   - bpm: tempo aproximado de la canción, para el pulso
            del fondo. No necesitas ser exacto: 60-80
            (balada lenta), 90-110 (medio), 120-140 (rápida).
   - embed: pega aquí el código <iframe> que te da
            Spotify o YouTube al usar "Compartir → Insertar"
            (ver guía de instalación, paso 5)
   ----------------------------------------------------- */
const albumData = [
  {
    photo: "img/foto1.jpg",
    letter: "Nuestra primera foto juntos...",
    date: "Marzo 2021",
    bpm: 92,
    embed: `<iframe src="https://open.spotify.com/embed/track/1jeQT4ymqWO7TJr4Ei8NLz?utm?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
    },
  {
    photo: "img/foto2.jpg",
    letter: "Esa vez que fuimos a patinar...",
    date: "Julio 2022",
    bpm: 118,
    embed: `<iframe src="https://open.spotify.com/embed/track/REEMPLAZA_CON_TU_ID?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  }
];

/* ----------------------------------------------------- */

let currentPage = 0;
let pulseFrameId = null;
let pulseStartTime = null;

const colorThief  = new ColorThief();
const imgElement   = document.getElementById("album-photo");
const letterEl     = document.getElementById("album-letter");
const dateEl       = document.getElementById("album-date");
const embedWrap    = document.getElementById("embed-wrap");
const pageIndicator = document.getElementById("page-indicator");
const prevBtn      = document.getElementById("prev-btn");
const nextBtn      = document.getElementById("next-btn");

const root = document.documentElement;

function loadPage(index) {
  const data = albumData[index];

  imgElement.src = data.photo;
  imgElement.alt = data.letter.slice(0, 60);
  letterEl.textContent = data.letter;
  dateEl.textContent = data.date || "";
  pageIndicator.textContent = `Página ${index + 1} de ${albumData.length}`;
  embedWrap.innerHTML = data.embed || "";

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === albumData.length - 1;

  startPulse(data.bpm || 100);
  extractDominantColor();
}

function extractDominantColor() {
  // Si la imagen ya está en caché el evento 'load' no siempre vuelve a
  // disparar, así que comprobamos 'complete' primero.
  const run = () => {
    try {
      const [r, g, b] = colorThief.getColor(imgElement);
      root.style.setProperty("--dominant-color", `${r}, ${g}, ${b}`);
    } catch (err) {
      // Falla típica: la imagen no tiene CORS habilitado o no cargó.
      console.warn("No se pudo extraer el color dominante:", err);
    }
  };

  if (imgElement.complete && imgElement.naturalWidth > 0) {
    run();
  } else {
    imgElement.onload = run;
    imgElement.onerror = () => console.warn("No se pudo cargar la foto:", imgElement.src);
  }
}

/* -----------------------------------------------------
   Pulso de fondo simulado por BPM.
   No leemos audio real (los embeds de Spotify/YouTube
   viven en otro dominio y el navegador no permite
   analizar su señal), así que animamos un "latido"
   suave a partir del tempo de cada canción.
   ----------------------------------------------------- */
function startPulse(bpm) {
  if (pulseFrameId) cancelAnimationFrame(pulseFrameId);
  pulseStartTime = performance.now();

  const beatDuration = 60000 / bpm; // ms por beat

  function tick(now) {
    const elapsed = (now - pulseStartTime) % beatDuration;
    const phase = elapsed / beatDuration; // 0 → 1 dentro de cada beat

    // Curva tipo "latido": sube rápido, baja suave (no es una onda seno pura)
    const pulse = Math.pow(1 - phase, 2) * Math.sin(phase * Math.PI);

    root.style.setProperty("--pulse-scale", (1 + pulse * 0.06).toFixed(4));
    root.style.setProperty("--pulse-opacity", (0.45 + pulse * 0.35).toFixed(3));

    pulseFrameId = requestAnimationFrame(tick);
  }

  pulseFrameId = requestAnimationFrame(tick);
}

function changePage(direction) {
  const next = currentPage + direction;
  if (next < 0 || next >= albumData.length) return;
  currentPage = next;
  loadPage(currentPage);
}

prevBtn.addEventListener("click", () => changePage(-1));
nextBtn.addEventListener("click", () => changePage(1));

// Navegación con flechas del teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") changePage(-1);
  if (e.key === "ArrowRight") changePage(1);
});

window.addEventListener("DOMContentLoaded", () => loadPage(currentPage));
