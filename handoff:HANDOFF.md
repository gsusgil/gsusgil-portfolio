# gsusgil portfolio — traspaso a Claude Code

Prototipo de referencia: `gsusgil-portfolio.html` (un solo archivo, HTML + CSS + JS sin build).
Es la fuente de verdad de estructura, medidas y comportamiento. Este documento explica qué está cerrado, qué es provisional y qué falta.

## 0. Estado al cierre (8 de octubre de 2026)

Estructura, diseño, interacciones y textos base cerrados. Lo siguiente se hace en Claude Code, en este orden:

1. Crear una rama nueva en el repositorio del portfolio antiguo (gsusgil-portfolio.vercel.app) y revisar su tecnología antes de adaptar nada (sección 7).
2. Montar el prototipo en esa tecnología, con una ruta por proyecto (sección 6).
3. Sustituir los gráficos de relleno por las imágenes y vídeos reales (sección 4), optimizados según la nota de peso del final.
4. Rellenar el contenido pendiente (sección 5): Arita, años, medias de cuenta, líneas de concepto y decisión con la voz de Jesús, retrato para la ráfaga de la cabecera.
5. Probar en móvil real (iOS y Android), modo oscuro y la velocidad: objetivo, primera vista en menos de 2 s en 4G.

Pendiente para más adelante: sección «Art Direction Studies» (sección 9), cuando estén los tres proyectos del curso.

## 1. Objetivo

Portfolio privado (se comparte por enlace junto al CV) de Jesús Gil, senior visual designer en Barcelona que da el paso hacia dirección de arte. Meta: conseguir entrevistas. El visitante tipo es un recruiter o director creativo que decide en menos de un minuto y lo abre primero en el móvil.

Posicionamiento cerrado: "Senior visual designer … working across brand, web and campaigns, and moving into art direction". No se presenta como director de arte ya consolidado.

## 2. Decisiones cerradas (no cambiar sin preguntar)

**Idioma:** todo en inglés.

**Color**
| Token | Claro | Oscuro |
|---|---|---|
| `--bg` | `#ffffff` | `#20201f` |
| `--ink` | `#20201f` | `#f4f4f4` |
| `--mute` | `#868686` | `#9a9a9a` |
| `--line` | `#dedede` | `#383838` |
| `--plate` | `#f3f3f3` | `#2a2a2a` |
| `--accent` | `#ff4d4d` | `#ff4d4d` |

- El negro es `#20201f`, nunca negro puro.
- El rojo es resalte, en torno al 10 %: cifras, etiqueta "View project", punto del reloj y el punto final del nombre (cabecera y pie). Nunca en titulares ni en el nombre.
- El tema sigue al sistema. Hay botón para cambiarlo, pero la elección no se guarda.

**Tipografía (dos familias):** Inter Tight Black Italic para todo lo que es display y firma: el nombre «gsusgil.» (minúsculas, interletrado -0.075em, letras que se tocan, punto final rojo), la pista «hi, it’s me» y los títulos Previous / Next (con las mayúsculas de cada proyecto y sin punto). Hanken Grotesk 500 para todo el texto, base 14 px, interletrado -0.025em. Solo se cargan esos dos archivos (Inter Tight 900 cursiva y Hanken 500). Inter Tight es el sustituto gratuito de la referencia comercial del usuario; si se licencia la original, se cambia aquí. Archivo se eliminó para ahorrar una tipografía. Se probó un contorno del color del fondo en el nombre y se descartó.

**Estructura de la home:** nombre «gsusgil.» a todo el ancho → navegación (Work, Profile, Contact) + Barcelona y hora → presentación en el tercio derecho + etiqueta de cifras a la izquierda → selector Grid/List → 4 proyectos → Profile → pie con contacto y nombre animado.

**Proyectos (4, en este orden, misma jerarquía):**
1. Student Week — Event Identity
2. Paula Belil + Arita — Brand Identity (dos clientes, cada uno con su información y su bento)
3. HVAC Master Launch — Campaign Direction
4. Email System — CRM Design

**Lo que se descartó a propósito:** página de resume, enlaces a Instagram y Behance (solo LinkedIn), "Available for projects" (ahora "Open to conversations"), la mención "built with AI", el zoom en hover de las tarjetas, la deriva continua de las imágenes, y que la sección de proyectos tape el texto de presentación.

## 3. Comportamientos y sus parámetros

| Pieza | Comportamiento |
|---|---|
| Nombre de cabecera | «gsusgil.» en minúsculas, mismo estilo que el pie, ajustado por JS al ancho. Estático: solo la entrada, con las letras subiendo escalonadas 45 ms. |
| Texto de presentación | En escritorio (>900 px) baja con el scroll: destino `scrollY × 0.55`, suavizado 0.24 por fotograma, se detiene sobre el selector. Fijo en tablet y móvil. |
| Etiqueta de cifras | Flotante a la izquierda, fuera de la retícula. Muestra una cifra cada vez, relevo con fundido cada 3,6 s. El conteo desde cero ocurre solo una vez, al cargar. Sin movimiento flotante. |
| Grid 2×2 | Cuatro celdas iguales (4:3). Título arriba en dos y abajo en las otras dos, en diagonal. |
| Imagen de tarjeta | Quieta en reposo. Se desplaza con el scroll y sigue al cursor con inercia (suavizado 0.05). Al entrar, el marco se abre (padding 10 → 4 px) y la etiqueta roja "View project ↗" sigue al cursor. La tarjeta activa sube a `z-index: 3`. |
| Móvil sin hover | La tarjeta más cercana al centro de la pantalla se activa sola. |
| Lista | En escritorio la columna de miniaturas es más ancha (1 : 1,5 : 1, miniaturas de unos 146 px); en móvil sin cambios. Vista inicial de los proyectos (la retícula solo si el visitante la eligió antes; se recuerda en su navegador). Fila: nombre · 4 miniaturas · disciplina. Hover: fila invertida, miniaturas desenfocadas, etiqueta "View project" centrada. Las filas entran escalonadas al cambiar de vista. |
| Abrir proyecto | Hoja a pantalla completa que sube desde abajo (0,9 s). Píldora flotante con nombre y cierre. Escape cierra. |
| Cambio entre proyectos | Fundido del contenido dentro de la hoja (0,35 s). No debe verse la home en medio. |
| Descripción del proyecto | Empieza arriba a la derecha y baja con el scroll (`scrollTop × 0.55`, suavizado 0.09) hasta quedar sobre la galería. Fija en móvil. |
| Cifras del proyecto | En rojo, cuentan desde cero al abrir (1,6 s, frenado al final). |
| Galerías | Bento sin hover. Las celdas aparecen al entrar en pantalla. |
| Emails largos | Ventana alta; el email completo se desliza dentro según el avance del scroll de la página. |
| Nombre del pie | «gsusgil» y «designer» se relevan en bucle con GSAP delante de un punto final rojo que no se mueve. Cada letra sube y sale por arriba de la máscara, escalonada 40 ms (0,85 s, expo.inOut), y la otra palabra entra desde abajo. gsusgil se queda 2,6 s y designer 1,9 s. El punto es un elemento aparte, del tamaño de gsusgil; designer se ajusta al mismo ancho de palabra (queda algo más pequeña) y se coloca sobre la misma línea base. Durante cada relevo, desenfoque de movimiento vertical tipo After Effects (filtro SVG `feGaussianBlur` con `stdDeviation="0 Y"`, pico de 0,05 em a mitad del movimiento, solo mientras las letras se desplazan; el punto queda nítido). Se probó una estela tipo Echo y se descartó. Cada letra tiene relleno lateral con margen negativo para que su caja incluya el saliente de la cursiva y no se recorte al animarse (problema visto en la l en iPhone). Se pausa fuera de pantalla. |
| Movimiento reducido | Con `prefers-reduced-motion` se desactivan bucles y recorridos. |

## 4. Material que hay que producir

Todas las imágenes actuales son gráficos generados por código (`<canvas>`); hay que sustituirlas por `<img>` o `<video>`. Las celdas recortan con `object-fit: cover`, así que las proporciones son orientativas. Formato: WebP o AVIF, sRGB. Los tamaños ya cubren pantallas de doble densidad.

**Por cada proyecto**

| Pieza | Proporción | Tamaño de exportación | Notas |
|---|---|---|---|
| Portada (grid de la home) | 4:3 | 1600 × 1200 | La imagen se desplaza dentro del marco: mantener el sujeto en el 80 % central. Las cuatro portadas se ven juntas y deben leerse como un conjunto dirigido. |
| Imagen principal | 16:9 | 2880 × 1620 | Se recorta a aprox. 2:1 en escritorio y 4:5 en móvil: sujeto centrado. Opcional: versión móvil 1200 × 1500. |
| Miniaturas de lista (×4) | 1:1 | 400 × 400 | Pueden ser recortes de la galería. |

**Galería estándar (Student Week, HVAC Master Launch): 5 celdas**

| Celda | Proporción aprox. | Tamaño |
|---|---|---|
| 1 · ancha | 2.6:1 | 2000 × 760 |
| 2 · vertical | 3:5 | 1000 × 1680 |
| 3 y 4 · pequeñas | 9:7 | 1000 × 780 |
| 5 · panorámica | 15:8 | 2800 × 1500 |

- Student Week: la celda 5 es el sitio natural para el vídeo del evento 2025 (16:9, MP4, sin sonido).
- HVAC: si hay imagen del componente maestro de social con sus variantes, merece una celda.

**Branding (por cada cliente: Paula Belil y Arita): 3 celdas**

| Celda | Proporción aprox. | Tamaño |
|---|---|---|
| Grande | 5:4 | 1900 × 1500 |
| Pequeñas (×2) | 9:7 | 1000 × 780 |

- Brandboard animado, uno por cliente: bucle de 6 a 8 s, 1920 × 1080, MP4 (H.264) y WebM, sin sonido, menos de 3 MB, con imagen fija de respaldo. Secuencia sugerida: monograma, wordmark, paleta, tipografía, aplicación real.

**Email System: 2 ventanas largas + 3 detalles**

| Celda | Tamaño |
|---|---|
| Email completo (×2: newsletter y post-evento) | 1400 px de ancho, alto libre (hasta unos 6000 px) |
| Detalles (×3) | 1000 × 780 |

**Total aproximado:** 4 portadas, 4 imágenes principales, 16 miniaturas, 10 celdas estándar, 6 celdas de branding, 2 brandboards, 2 emails largos, 3 detalles, 1 vídeo de evento.

Convención de nombres sugerida: `/projects/<id>/cover.webp`, `hero.webp`, `01.webp`…`05.webp`, `t1.webp`…`t4.webp`. Ids: `student-week`, `brand-identity`, `hvac-master-launch`, `email-system`.

## 5. Contenido provisional (hay que sustituirlo o confirmarlo)

- **Arita:** descripción, ficha y pies de imagen están en lorem ipsum.
- **Líneas de concepto y filas "Decision"** de cada proyecto: borradores escritos a partir del portfolio antiguo. Jesús debe reescribirlos con su voz.
- **Años:** solo Student Week tiene (2023–26). El resto dice "To be added".
- **Benchmark** en HVAC y Email: "Account average to be added".
- **Créditos:** por función, sin nombres. En branding, "Collaborators (To be added)".
- **Cliente de los tres proyectos de empresa:** aparece como "In-house · Higher education (AEC)". Pendiente de que Jesús confirme con su empresa si puede mostrar las piezas y nombrarla.
- **Cifras:** reales y redondeadas, tomadas del portfolio antiguo (230K+, 1.5K+, 65K+, 47.36 %, 39.29 %, 4 ediciones) y del CV (9+ años).

## 6. Tareas técnicas pendientes

1. **Sustituir los `<canvas>` por imágenes y vídeo reales.** En las tarjetas del grid hay dos capas (fondo y objetos) que se mueven a distinta profundidad; con fotos será una sola capa, salvo que se preparen recortes con transparencia.
2. **GSAP como dependencia** (`npm i gsap`) en lugar del enlace externo. Lo usa el relevo gsusgil. / designer. del pie.
3. **Lenis** para el scroll suave. Afinarlo en vivo: afecta al recorrido del texto de presentación y de la descripción de proyecto, que dependen de la posición de scroll.
4. **Animación del pie: descartada.** Se probaron varias versiones (GSUSGIL ↔ GG ↔ DESIGNER, G en contorno rojo, G con rayos de luz) y el usuario las rechazó todas. No reintroducirlas sin que lo pida. La referencia que sí le gusta es tipográfica: una palabra en minúsculas, negra, cursiva y muy cerrada, con punto final.
5. **Rutas reales.** En el prototipo los proyectos son una capa sobre la home con un ancla (`#student-week`). En el sitio final conviene una ruta por proyecto, conservando la transición.
6. **Ajuste menor:** la etiqueta de cifras tiene algo de aire de más por debajo (toma la altura del texto más largo).
7. **Pruebas pendientes:** móvil real (iOS y Android), tipografías cargadas, modo oscuro y la vista de lista con imágenes reales. El prototipo se probó en un navegador automatizado sin las tipografías de Google.

## 7. Guardado para más adelante: migración al repositorio

Pendiente por decisión de Jesús, se hará después de producir el material.

- Subirlo al mismo repositorio del portfolio antiguo (desplegado en `gsusgil-portfolio.vercel.app`).
- Trabajar en una rama nueva para que la versión actual siga publicada hasta que la nueva esté lista.
- Antes de empezar, revisar la tecnología del repositorio actual y adaptar la estructura a ella.
- El portfolio antiguo tiene una ruta `/resume` con el CV en PDF: decidir si se elimina o se deja como enlace discreto en el pie.

## 8. Revisión final de estructura (cerrada)

Probado en navegador a 1440, 820 y 390 px: home, vista de lista y los cuatro proyectos abren y cierran sin errores ni desbordamiento horizontal.

Decisiones tomadas en el cierre:
- Fechas con guion. El rango sobre los proyectos es "2023-Present"; Student Week es "2023-26"; los otros tres años siguen como "To be added" hasta que el usuario los dé.
- Autoría: las decisiones creativas son del usuario; performance, content y alumni son los stakeholders. Así consta en la presentación y en los créditos.
- Practice en Profile: "Brand identity, art direction, digital design, motion" (art direction en segundo lugar, a propósito).
- Email System: el 39.29 % queda solo como cifra grande; la fila Result ya no lo repite.
- Previous / Next pasan a Inter Tight Black Italic (se eliminó Archivo para que la web cargue menos).

## 9. Ampliación prevista: Art Direction Studies

No se añade todavía. Se hará cuando estén terminados los tres proyectos del Executive Program en IA para Dirección de Arte (BSide Academy).

- Sección propia debajo de Work, titulada "Art Direction Studies (03)". Work se queda con sus cuatro proyectos sin cambios.
- Los tres estudios tienen brief y serán casos completos: misma plantilla de página (concepto, descripción, decisión, galería bento, ficha).
- En la ficha, en lugar de "Client": "Brief: BSide Academy, AI for Art Direction".
- Cada estudio indica qué decidió el usuario y qué hizo la IA.
- Retícula de tres celdas iguales (una fila en escritorio, apiladas en móvil), mismo marco e interacción que Work.
- Vista de lista: línea divisoria con el título de la sección entre los dos grupos.
- Previous / Next recorre los siete proyectos en orden.
- A futuro, los encargos reales de dirección de arte sustituyen a los estudios; un estudio fuerte puede pasar a Work en lugar de Email System.

## 10. Idea guardada: el punto rojo como ventana a una foto del usuario

No se hace todavía. El portfolio no tiene ninguna foto de Jesús y esta es la forma prevista de incluirla.

- El punto rojo del nombre del pie pasa a ser un contenedor.
- Al pasar el ratón por toda la sección del pie, salen desde el centro del punto varias imágenes que crecen rápido, una tras otra, y la secuencia termina en una sola: una foto suya, que se queda.
- Recomendaciones de la conversación:
  - Secuencia corta (menos de 1 s) y una vez por entrada del ratón, no en bucle.
  - La foto final se queda dentro de la forma del punto (círculo que crece), con un tamaño que no tape el correo ni el resto del pie.
  - En móvil no hay hover: lanzarla al entrar el pie en pantalla o al tocar el punto.
  - Imágenes ligeras y precargadas; con movimiento reducido, mostrar solo la foto final.
  - Las imágenes intermedias pueden ser de proceso o de contexto de trabajo; la final, un retrato.

**Prueba hecha en el prototipo (sección 10):** al pasar el ratón por el pie salen seis tarjetas desde el punto rojo, escalonadas 85 ms, y se apilan sueltas encima de él con giros pequeños; la última (retrato, de relleno) queda arriba, algo más grande. Al salir el ratón vuelven al punto. En móvil se abre cuando el nombre entra en pantalla, o al tocar el punto. El usuario descartó meter la foto dentro de la forma del punto: la quiere como foto encima de la pila.

**Cambio tras la prueba:** la ráfaga se movió del pie a la cabecera y ya no se abre sola.
- Disparador: solo el punto rojo de «gsusgil.» de la cabecera o su etiqueta. Hover en escritorio (se cierra al salir), toque en móvil (se cierra al volver a tocar). Escape también cierra.
- Pista: «hi, it’s me» en minúsculas, Inter Tight Black Italic pequeña (17 px escritorio, 13 px móvil), color tinta, con una flecha dibujada a mano en SVG (trazo fino de 1,4 px, un bucle) que sube y apunta al punto desde abajo a la izquierda. Fuera del layout, en la capa más alta. Aparece una vez tras cargar: el texto con fundido y la flecha dibujándose (stroke-dashoffset). Pasa a rojo al pasar por encima y a «close» con la pila abierta. Descartadas: la pastilla y el texto gris con «↑». Referencia del usuario: pantalla de app con texto y flecha a mano apuntando al botón principal.
- Un solo pulso del punto (escala 1,45, ida y vuelta) unos 1,5 s después de cargar.
- La pila cae en el espacio libre bajo la navegación, centrada en la página; el retrato queda encima. En pantallas bajas puede quedar en parte por debajo de la primera vista, y en móvil tapa la presentación mientras está abierta.
- El pie ya no tiene ráfaga: conserva solo el relevo gsusgil / designer.

**Peso:** las imágenes de la ráfaga solo se generan la primera vez que se abre. En producción: imágenes optimizadas (AVIF/WebP, `srcset`, carga diferida fuera de la primera vista), las fotos de la ráfaga cargadas al primer hover o toque, solo el núcleo de GSAP, scripts con `defer`. Archivo ya está eliminada.

**Objetivo de carga: primera vista en menos de 2 s.** Estado del prototipo: dos tipografías con solo los pesos usados y conexiones abiertas de antemano (`preconnect`); GSAP al final del cuerpo para no bloquear el primer pintado; la vista inicial (lista) solo pinta sus 16 miniaturas; la retícula, las páginas de proyecto y la ráfaga de fotos se generan solo cuando se ven o se abren. Presupuesto para producción: HTML + CSS + JS propios por debajo de 60 KB comprimidos, GSAP núcleo unos 25 KB comprimidos, dos archivos de fuente (unos 60 KB en total, con `font-display: swap` y alojadas en el propio dominio si es posible), y en la primera vista solo las 16 miniaturas de la lista (400 × 400 en WebP o AVIF, unos 15-25 KB cada una). Todo lo demás, con carga diferida.

**Pista, texto final:** «hi, it’s me» (se descartó «meet the designer» por impersonal). En pantallas táctiles el color rojo de hover solo se aplica con `@media (hover:hover)`, para que no se quede rojo tras un toque; en táctil solo está rojo con la pila abierta.

**Estado de disponibilidad: eliminado.** Ni «Currently employed» ni «Open to conversations» aparecen en la web (fila Status de Profile y línea de móvil bajo la cabecera). El usuario las considera innecesarias: quien llega al portfolio ya viene de su CV.

## 11. Ráfaga de fotos en escritorio: el punto como cursor (versión actual)

Solo en escritorio con ratón (`hover:hover` y `pointer:fine`) y sin movimiento reducido. Todo ocurre dentro del contenedor del nombre de la cabecera, que hace de hero; nada sale de él.
- Al entrar el ratón en el nombre, el punto rojo de «gsusgil.» deja su sitio y pasa a ser el cursor (el cursor del sistema se oculta solo ahí). El cambio es invisible: el cursor rojo se crea con el tamaño y la posición exactos del punto impreso.
- Movimiento por suavizado exponencial (sin rebote ni efecto elástico). Al salir del nombre, el punto vuelve suave a su sitio y se recoloca en la palabra.
- Junto al cursor va «hi, it’s me» en la cursiva del nombre, con `mix-blend-mode: difference` para leerse sobre letras negras y sobre fondo blanco; cambia a «close» con las fotos abiertas.
- Clic: salen las seis fotos desde el punto, escalonadas, y forman una pila arriba a la izquierda del cursor, sin salirse del nombre. La pila sigue al cursor con inercia, cada foto con un retraso algo distinto. Clic de nuevo o salir del nombre: se recogen en el punto.
- En móvil y tablet se mantiene la versión de toque (sección 10): toque en el punto, pista «hi, it’s me» con flecha dibujada, pila bajo la navegación.
- Pendiente: acceso por teclado en escritorio (hoy solo con ratón).

**Ajuste del cursor (escritorio):** la etiqueta va fuera del grupo que se mueve, como elemento propio dentro del nombre, para que `mix-blend-mode: difference` funcione también en Safari (dentro de un contenedor con `will-change` se aislaba y quedaba blanco sobre blanco). Dice «hi, it’s me» y debajo, más pequeño, «click to see me». Mientras el punto es el cursor y la pila está cerrada, sale de él cada 1,9 s un anillo rojo que crece y se desvanece, como señal de que se puede pulsar.
