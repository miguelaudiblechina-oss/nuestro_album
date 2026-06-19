# Nuestro Álbum 💛

Un álbum virtual de aniversario: fotos, cartas y música, página por página.
El fondo cambia de color según cada foto y "respira" al ritmo de la canción.

➡️ Para instalarlo y publicarlo en GitHub Pages, sigue **GUIA-INSTALACION.md**.

## Estructura

```
├── index.html      → estructura de la página
├── style.css       → estilos (colores, tipografía, layout)
├── app.js          → lógica: páginas, color dominante, pulso
└── img/            → tus fotos van aquí
```

## Personalizar

Todo el contenido del álbum (fotos, cartas, canciones, BPM) se edita en un
solo lugar: el arreglo `albumData` al inicio de `app.js`. No necesitas
tocar el HTML ni el CSS para agregar páginas.
