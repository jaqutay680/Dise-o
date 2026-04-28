# Guía de Estilos — LuxFrame Studio
**Versión:** 1.0 | **Fecha:** Enero 2025

---

## 1. Identidad Visual

**Concepto:** Elegancia oscura minimalista. La oscuridad hace que la fotografía resplandezca.

---

## 2. Paleta de Colores

| Nombre          | Variable CSS           | Hex       | Uso                          |
|-----------------|------------------------|-----------|------------------------------|
| Fondo principal | `--color-bg`           | `#0d0d14` | Fondo base de la web         |
| Fondo alternativo| `--color-bg-alt`      | `#111118` | Secciones alternas           |
| Superficie      | `--color-surface`      | `#1a1a28` | Cards, modales, inputs       |
| Superficie 2    | `--color-surface-2`    | `#222235` | Hover, accordeón activo      |
| **Acento**      | `--color-accent`       | `#c8a96e` | CTA, bordes destacados, iconos|
| Acento claro    | `--color-accent-light` | `#e4c98a` | Hover del acento             |
| Texto           | `--color-text`         | `#f0eeea` | Texto principal              |
| Texto secundario| `--color-text-muted`   | `#888898` | Subtextos, placeholders      |
| Borde           | `--color-border`       | `#2a2a3e` | Separadores, contornos       |

**Contraste:** Texto `#f0eeea` sobre fondo `#0d0d14` → ratio **15.8:1** ✅ (WCAG AAA)
**Contraste acento:** `#c8a96e` sobre `#0d0d14` → ratio **6.2:1** ✅ (WCAG AA)

---

## 3. Tipografía

| Familia              | Uso                     | Peso     |
|----------------------|-------------------------|----------|
| Playfair Display     | Títulos (H1–H4), brand  | 400, 700 |
| DM Sans              | Cuerpo, UI, botones     | 300, 400, 500 |

```css
font-family: 'Playfair Display', Georgia, serif;   /* títulos */
font-family: 'DM Sans', system-ui, sans-serif;     /* cuerpo  */
```

**Escala tipográfica:**
- H1 hero: `clamp(3rem, 7vw, 5.5rem)`
- H2 sección: `clamp(2rem, 4vw, 2.8rem)`
- H3: `1.5rem`
- Cuerpo: `1rem / 1.7`
- Small: `0.875rem`

---

## 4. Espaciado

| Token          | Valor   |
|----------------|---------|
| Sección grande | 100px   |
| Sección mobile | 70px    |
| Gap tarjetas   | 1.5rem  |
| Padding card   | 2rem    |

---

## 5. Bordes y Radios

| Variable       | Valor  | Uso                      |
|----------------|--------|--------------------------|
| `--radius-sm`  | 6px    | Botones, inputs, badges  |
| `--radius-md`  | 12px   | Cards, tabs, acordeón    |
| `--radius-lg`  | 20px   | Carrusel, modal          |

---

## 6. Componentes Bootstrap Utilizados

- **Navbar** (`navbar-expand-lg` + `fixed-top`) — Navegación principal
- **Carousel** (`carousel slide carousel-fade`) — Portfolio destacado
- **Tabs** (`nav-tabs`) — Servicios por categoría
- **Accordion** — Proceso de trabajo
- **Modal** — Detalle de obras del portfolio
- **Tooltips** — Información del equipo
- **Forms** con validación Bootstrap

---

## 7. Iconografía

Bootstrap Icons v1.11. Siempre con `aria-hidden="true"` y texto alternativo en el elemento padre.

---

## 8. Animaciones

| Nombre         | Tipo        | Descripción                         |
|----------------|-------------|-------------------------------------|
| `fadeUp`       | CSS Keyframe| Entrada de elementos al cargar       |
| `scrollPulse`  | CSS Keyframe| Indicador de scroll en hero          |
| Contadores     | JS rAF      | Números stats se animan al entrar    |
| Partículas     | Canvas API  | Animación bokeh en sección multimedia|
| Constelación   | Canvas API  | Fondo hero con estrellas             |
| Proceso        | Canvas API  | Diagrama de flujo animado            |
| Scroll Reveal  | IntersectionObserver | Fade-in al hacer scroll   |

**Respeto a preferencias:** `@media (prefers-reduced-motion: reduce)` desactiva todas las animaciones.

---

## 9. Responsive Breakpoints (Bootstrap)

| Breakpoint | Ancho      | Layout                             |
|------------|------------|------------------------------------|
| xs         | < 576px    | 1 columna, font reducido           |
| sm         | ≥ 576px    | 2 col portfolio                    |
| md         | ≥ 768px    | 2 col servicios                    |
| lg         | ≥ 992px    | 3 col portfolio, navbar horizontal |
| xl         | ≥ 1200px   | Layout completo                    |

---

## 10. Accesibilidad

- Todos los elementos interactivos tienen `aria-label` o texto descriptivo
- Imágenes decorativas: `aria-hidden="true"`
- Formulario: `aria-required`, `role="alert"` en mensajes
- Carrusel: botones con `aria-label`
- Focus visible en todos los elementos con `:focus-visible`
- Contraste mínimo WCAG AA en todos los textos
- Subtítulos en vídeo (`.vtt`)
- Estructura semántica: `nav`, `main`, `section`, `article`, `footer`, `blockquote`
