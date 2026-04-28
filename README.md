# LuxFrame Studio — Proyecto Web
## Estructura de carpetas

```
luxframe/
├── index.html              ← Página principal
├── css/
│   └── custom.css          ← Estilos personalizados compilados
├── scss/
│   └── custom.scss         ← Fuente Sass (compilar → css/custom.css)
├── js/
│   └── main.js             ← JavaScript personalizado
├── media/
│   ├── showreel-2024.mp4   ← [AÑADIR] Vídeo principal
│   ├── showreel-2024.webm  ← [AÑADIR] Alternativa WebM
│   ├── showreel-es.vtt     ← [AÑADIR] Subtítulos
│   └── ambient.mp3         ← [AÑADIR] Audio ambiental
├── img/
│   ├── originales/         ← Imágenes SIN optimizar (guardar aquí las originales)
│   └── optimizadas/        ← Imágenes optimizadas para web (WebP, JPG)
└── GUIA-ESTILOS.md         ← Guía de estilos del proyecto
```

## Tecnologías utilizadas
- Bootstrap 5.3
- Bootstrap Icons 1.11
- Google Fonts (Playfair Display + DM Sans)
- Sass (SCSS)
- Canvas API (animaciones)
- Vanilla JS (ES6+)

## Compilar Sass
```bash
sass scss/custom.scss css/custom.css --watch
```

## Archivos multimedia a añadir
Ver sección PENDIENTE en index.html (comentarios con <!-- NOTA: -->)
