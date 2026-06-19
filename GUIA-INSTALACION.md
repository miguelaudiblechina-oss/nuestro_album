# Guía de instalación — Publicar tu álbum en GitHub Pages

No necesitas saber programar para seguir esta guía. Tómate tu tiempo,
cada paso es sencillo.

---

## Paso 0 — Antes de empezar: sobre la música

Tu álbum usa canciones populares (con derechos de autor). Por eso este
proyecto **no sube archivos de audio** al repositorio — en vez de eso,
incrusta el reproductor oficial de Spotify o YouTube. Esto es 100% legal
y además se ve muy bien. Lo configuras en el Paso 5.

---

## Paso 1 — Crea tu cuenta de GitHub (si no tienes)

1. Ve a [github.com](https://github.com) y crea una cuenta gratuita.
2. Confirma tu correo.

---

## Paso 2 — Crea el repositorio

1. En GitHub, da clic en el botón **+** (arriba a la derecha) → **New repository**.
2. Nombre sugerido: `nuestro-album` (puede ser el que quieras, sin espacios).
3. Marca **Public** (GitHub Pages gratis requiere que el repo sea público).
4. **No** marques "Add a README" — ya tienes uno.
5. Clic en **Create repository**.

---

## Paso 3 — Sube tus archivos

La forma más fácil sin usar la terminal:

1. En la página de tu repositorio recién creado, clic en **uploading an existing file** (o el botón **Add file → Upload files**).
2. Arrastra estos archivos desde tu computadora:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
   - la carpeta `img` (arrástrala completa con tus fotos dentro)
3. Abajo, en "Commit changes", escribe un mensaje como `Primera versión del álbum` y da clic en **Commit changes**.

> 💡 Tip: Comprime tus fotos antes de subirlas (por ejemplo en
> [squoosh.app](https://squoosh.app)) para que el álbum cargue rápido.

---

## Paso 4 — Edita el contenido con tus fotos y cartas

1. En tu repositorio, abre el archivo `app.js`.
2. Clic en el ícono de lápiz (✏️) para editarlo directamente en GitHub.
3. Dentro del arreglo `albumData`, edita cada página:

```js
{
  photo: "img/foto1.jpg",        // el nombre exacto de tu archivo en /img
  letter: "Aquí va tu carta...", // el texto que quieras
  date: "Marzo 2021",            // opcional
  bpm: 92,                       // tempo aproximado de la canción
  embed: `...`                   // lo llenas en el Paso 5
}
```

4. Para agregar más páginas, copia un bloque `{ ... }` completo, pégalo
   antes del `]` final, y agrega una coma `,` después del bloque anterior.
5. Cuando termines, baja hasta **Commit changes** para guardar.

También puedes editar `index.html` para cambiar el título "Edita esto con
sus nombres" por los nombres reales.

---

## Paso 5 — Conseguir el código de cada canción (Spotify)

1. Abre Spotify (web o app) y busca la canción.
2. Clic en los tres puntos **···** → **Compartir** → **Insertar canción** (Embed track).
3. Copia el código que aparece, algo como:

```html
<iframe src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
```

4. Pega ese código completo en el campo `embed` de la página correspondiente en `app.js`, reemplazando el que dice `REEMPLAZA_CON_TU_ID`.

**¿Prefieres YouTube?** Ve al video → **Compartir** → **Insertar** → copia el código `<iframe>` y pégalo igual en `embed`.

---

## Paso 6 — Activa GitHub Pages

1. En tu repositorio, ve a **Settings** (pestaña arriba).
2. En el menú lateral, clic en **Pages**.
3. En "Branch", selecciona `main` y la carpeta `/ (root)`.
4. Clic en **Save**.
5. Espera 1-2 minutos. Recarga la página: arriba te mostrará el link, algo como:

```
https://tu-usuario.github.io/nuestro-album/
```

¡Ese es el link que puedes compartir! 🎉

---

## Paso 7 (opcional) — Hacer el repositorio privado pero el sitio visible

GitHub Pages gratis requiere repo público para que el link funcione.
Si te preocupa que cualquiera pueda ver tu código y fotos en el repositorio
(no solo el sitio publicado), tienes dos alternativas:

- **GitHub Pro** (de paga) permite Pages desde un repo privado.
- Usar un servicio alterno como [Netlify](https://netlify.com) o
  [Vercel](https://vercel.com), que ofrecen sitios "no listados" gratis
  incluso con repo privado en GitHub (te conectas con tu cuenta de GitHub
  y eliges el repo).

Si tu único objetivo es compartir el link solo con tu pareja y no te
preocupa que el código sea público, el Paso 6 es suficiente.

---

## Solución de problemas

**"Las fotos no cargan"**
Revisa que el nombre del archivo en `app.js` (ej. `img/foto1.jpg`) sea
*exactamente* igual al nombre del archivo subido — mayúsculas y extensión
incluidas (`.jpg` ≠ `.JPG`).

**"El fondo no cambia de color"**
Asegúrate de que la imagen haya cargado bien (revisa el punto anterior).
Algunos navegadores bloquean la extracción de color en `file://` — por
eso lo mejor es probar el sitio ya publicado en GitHub Pages, o correr un
servidor local (ver abajo).

**"Quiero probarlo en mi computadora antes de subirlo"**
No abras `index.html` haciendo doble clic (puede fallar la extracción de
color por seguridad del navegador). En su lugar, dentro de la carpeta del
proyecto:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000` en tu navegador.

---

¿Cambios futuros? Edita los archivos directamente en GitHub (ícono ✏️) y
cada vez que hagas "Commit changes", el sitio se actualiza solo en 1-2
minutos.
