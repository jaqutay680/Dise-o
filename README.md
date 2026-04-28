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
│   ├── showreel-naturaleza.mp4 
│   ├── showreel-naturaleza.webm  
│   ├── showreel-es.vtt
├   ├── ambiente-naturaleza.mp3 
│   └── Todas las imagenes .jpg-.webp    
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
