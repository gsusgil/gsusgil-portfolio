# CLAUDE.md

Mapa del proyecto — gsusgil Portfolio. Diseño cerrado, fuente de verdad: `handoff/HANDOFF.md` + `handoff/gsusgil-portfolio.html` (prototipo).

## Stack y arranque local
- Astro 5, `output: "static"`, adapter `@astrojs/vercel/static`. GSAP y Lenis como dependencias npm.
- `npm install` → `npm run dev` (http://localhost:4321) → `npm run build` (`dist/` + `.vercel/output/`).

## Dónde está cada parte
- Shell HTML, `<head>`, fuentes (Inter Tight / Hanken Grotesk): `src/layouts/BaseLayout.astro`
- Cabecera + nombre "gsusgil." animado (letras, ajuste de ancho): markup `<header>` en `src/pages/index.astro`; lógica (`fit()`, split de letras) en `src/scripts/portfolio-home.js`
- Cursor-punto rojo + pila de fotos (escritorio `if (fine)` / táctil `if (!fine)`): `src/scripts/portfolio-home.js`; imágenes de la pila en `src/data/projects/index.js` (`burstImages`)
- Intro (texto con parallax + etiqueta 9+/4/65K+): markup `.intro` en `src/pages/index.astro`; parallax y `count()` en `src/scripts/portfolio-home.js`
- Lista/retícula de proyectos (switch Grid/List, bento): markup `#grid`/`#list` en `src/pages/index.astro`; lógica en `src/scripts/portfolio-home.js`
- Datos de los proyectos: `src/data/projects/*.js` (uno por proyecto) + `src/data/projects/index.js` (orden fijo, `burstImages`)
- Páginas de proyecto: `src/pages/projects/[slug].astro`; lógica en `src/scripts/project.js`. Rutas reales (no overlay); transición home↔proyecto vía View Transitions, ver `src/scripts/view-transitions.js` y `.vt-open`/`.vt-close`/`.vt-switch` en `components.css`
- Piezas de vídeo de proyecto (Student Week, Paula, Arita): `src/components/VideoPiece.astro`, estilos `.vidpiece` en `components.css`, campo `videoPiece` en los datos del proyecto/capítulo
- Perfil: sección `#profile` en `src/pages/index.astro`
- Footer + animación gsusgil↔designer: `<footer>` en `src/pages/index.astro`; bloque GSAP `footer .name` en `src/scripts/portfolio-home.js`
- Tema claro/oscuro (sigue al sistema, no persiste): variables en `src/styles/tokens.css`; botón `src/components/ThemeToggle.astro`; lógica en `src/scripts/portfolio-home.js`
- Estilos globales y tokens: `src/styles/tokens.css` (colores/tipografías), `src/styles/global.css` (reset), `src/styles/components.css` (CSS del diseño completo)

## Imágenes
- Por proyecto (portadas, miniaturas, galería, vídeo): `public/projects/event-identity/`, `public/projects/paula-belil/`, `public/projects/ig-funnel/`, `public/projects/email-design/`
- Logos y favicon: `public/logo-*.svg`, `public/favicon.svg`

## Reglas de trabajo
- Haz solo lo que se pide en cada mensaje. No revises, refactorices ni "mejores" nada más.
- Usa este mapa para ir directo a los archivos. No explores el proyecto entero salvo que te lo pida.
- Si algo no está en el mapa, busca solo ese término y actualiza el mapa.
- No cambies diseño, textos, tamaños ni animaciones que no se mencionen en la petición.
- Al terminar: lista de archivos tocados y una frase de qué cambió. Sin resúmenes largos.
- Comprueba solo lo que cambiaste, en los tamaños que se indiquen.
