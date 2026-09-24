LIMITVERSE 8.0 — ARQUITECTURA CON API

La banca de preguntas, respuestas correctas y explicaciones ya no se entrega en game.js.

ARCHIVOS:
- index.html / style.css / game.js: cliente de GitHub Pages.
- api-config.js: URL de tu API.
- worker.js: backend para Cloudflare Workers.

DESPLIEGUE:
1. Crea un Cloudflare Worker nuevo.
2. Copia el contenido de worker.js en el Worker y publica.
3. Copia la URL del Worker en api-config.js en lugar de TU-WORKER.workers.dev.
4. Sube index.html, style.css, game.js y api-config.js a GitHub Pages.

La protección no es absoluta: el navegador siempre puede inspeccionar el HTML/JS que necesita ejecutar. Lo que sí queda fuera del cliente son las respuestas correctas y explicaciones.
