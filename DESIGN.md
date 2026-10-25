---
name: dy.ojeda
description: Portfolio personal de Daniel Ojeda, Backend & Full-Stack Developer.
colors:
  teal-ink: "oklch(0.511 0.096 186.391)"
  teal-bright: "oklch(0.704 0.14 182.503)"
  teal-deep: "oklch(0.437 0.078 188.216)"
  teal-foam: "oklch(0.984 0.014 180.72)"
  mist-white: "oklch(1 0 0)"
  mist-wash: "oklch(0.963 0.002 197.1)"
  mist-hairline: "oklch(0.925 0.005 214.3)"
  mist-slate: "oklch(0.56 0.021 213.5)"
  night-ink: "oklch(0.148 0.004 228.8)"
  night-card: "oklch(0.218 0.008 223.9)"
  night-wash: "oklch(0.275 0.011 216.9)"
  night-haze: "oklch(0.723 0.014 214.4)"
  night-frost: "oklch(0.987 0.002 197.1)"
  night-hairline: "oklch(1 0 0 / 10%)"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 15vw, 13rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.556
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  terminal:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
    letterSpacing: "0.1em"
rounded:
  base: "0.625rem"
  card: "1.125rem"
  pill: "9999px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2rem"
  row: "2rem"
  block: "2.5rem"
  section: "3.5rem"
  section-wide: "5rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.teal-foam}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-primary-light:
    backgroundColor: "{colors.teal-ink}"
    textColor: "{colors.teal-foam}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.night-frost}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-outline-hover:
    backgroundColor: "{colors.night-wash}"
  button-social:
    backgroundColor: "transparent"
    textColor: "{colors.night-frost}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 16px"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.night-frost}"
    rounded: "{rounded.pill}"
    size: "36px"
  nav-link:
    textColor: "{colors.night-haze}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  nav-link-hover:
    textColor: "{colors.night-frost}"
  card-tonal:
    backgroundColor: "{colors.night-card}"
    textColor: "{colors.night-frost}"
    rounded: "{rounded.card}"
    padding: "48px"
  card-status:
    backgroundColor: "{colors.night-card}"
    textColor: "{colors.night-frost}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
---

# Design System: dy.ojeda

## Overview

**Creative North Star: "El estándar, hecho a mano"**

Es el portafolio de desarrollador que la gente espera encontrar, ejecutado con el oficio de las referencias que Daniel eligió (gauravgrv.vercel.app primero, ezradesmonds.my.id después). No hay metáfora que descifrar: el nombre ocupa el primer viewport a escala de cartel, una línea de terminal se escribe sola encima, la jerarquía es clara y siempre hay un camino corto a "Contáctame". La personalidad sale de la precisión: escala tipográfica dramática, mucho aire vertical, un solo acento teal y detalles propios como el punto de dy.ojeda.

La superficie es plana. La profundidad viene de tarjetas un paso tonal por encima del fondo y de bordes de un píxel, nunca de sombras. Los neutros son los del preset shadcn "mist" (grises fríos con un leve tinte hacia el teal) y los dos modos son de primera clase: el servidor entrega oscuro y un script en línea aplica antes del primer pintado la elección guardada o, si no hay, la preferencia del sistema. Todo el sitio es bilingüe ES/EN desde la estructura (`/es`, `/en`), con el mismo peso en ambos idiomas.

El punto de "dy.ojeda" es el motivo vivo del sitio: el retrato del hero está hecho de puntos teal y el fondo del hero es una retícula de puntos que respira y se ilumina cerca del cursor. El movimiento lo orquesta GSAP (`components/site/page-motion.tsx`, plugins registrados en `lib/gsap.ts`): intro del nombre letra por letra con el punto cayendo al final, títulos que se revelan con el scroll, filas que entran escalonadas y botones magnéticos. La terminal sigue siendo CSS. Todo queda quieto y completo con `prefers-reduced-motion`.

**Key Characteristics:**
- El nombre, en Montserrat extrabold a ~15vw, es el protagonista del primer viewport.
- Una línea de terminal en Geist Mono que se escribe sola una vez, con cursor teal.
- Un solo acento teal, reservado para firma y acción.
- Superficies planas: capas tonales y bordes de 1px, sin sombras.
- Iconos lucide de trazo 2px (y marcas propias en la misma retícula), nunca emoji.
- Botones pill; tarjetas con esquinas amplias y consistentes.
- Oscuro y claro igual de cuidados; ES y EN con paridad total.

## Colors

Estrategia contenida: neutros fríos "mist" casi blancos y casi negros, más un solo teal que hace de firma. Todos los colores son tokens de `app/globals.css` con valor claro (`:root`) y oscuro (`.dark`); el OKLCH del frontmatter es la fuente normativa.

### Primary
- **Teal Tinta** (`teal-ink`): en modo claro es a la vez `--signature` (tinta teal sobre el fondo) y `--primary` (relleno del CTA principal).
- **Teal Brillante** (`teal-bright`): `--signature` en modo oscuro; más claro para que el punto, el cursor y el estado se lean como tinta sobre el fondo casi negro.
- **Teal Profundo** (`teal-deep`): `--primary` en modo oscuro; relleno del botón principal, más hondo para sostener el texto claro encima.
- **Espuma Teal** (`teal-foam`): `--primary-foreground` en ambos modos; texto sobre el relleno teal.

### Neutral
- **Blanco Mist** (`mist-white`): fondo de página y de tarjeta en modo claro.
- **Lavado Mist** (`mist-wash`): `--muted`/`--accent` en claro; fondo de hover de botones outline y ghost.
- **Filo Mist** (`mist-hairline`): `--border` en claro; bordes de tarjetas, divisores de proyectos, cabecera y pie.
- **Pizarra Mist** (`mist-slate`): `--muted-foreground` en claro; texto secundario, metadatos, stack de proyectos y enlaces de nav en reposo.
- **Tinta Nocturna** (`night-ink`): fondo de página en oscuro y texto principal en claro.
- **Tarjeta Nocturna** (`night-card`): `--card` en oscuro; el escalón tonal de las tarjetas.
- **Lavado Nocturno** (`night-wash`): `--muted`/`--accent` en oscuro; fondo de hover.
- **Bruma Nocturna** (`night-haze`): `--muted-foreground` en oscuro; texto secundario.
- **Escarcha Nocturna** (`night-frost`): texto principal en oscuro.
- **Filo Nocturno** (`night-hairline`): `--border` en oscuro, blanco al 10%.

### Named Rules
**The One Accent Rule.** El teal aparece solo en el punto de dy.ojeda, el retrato de puntos, el cursor de la terminal, los estados vivos (Lattice Systems y el punto del puesto actual en la línea de tiempo), el CTA principal y los hovers (enlaces, flecha de proyecto, iconos de stack y redes, chips). Para tinta sobre el fondo se usa `--signature`; para rellenos de botón, `--primary`. Ningún otro elemento se pinta de teal en reposo.

**The Two Themes Rule.** Todo color es un token con valor claro y oscuro en `app/globals.css`. Nunca se escribe un color fijo dentro de un componente; si hace falta un color nuevo, se agrega como token en ambos modos.

## Typography

**Display Font:** Montserrat (cargada con `next/font` como `--font-sans`; `--font-heading` apunta a la misma)
**Body Font:** Montserrat
**Label/Mono Font:** Geist Mono (`--font-geist-mono`, expuesta como `--font-mono`)

**Character:** una sans geométrica con mucho cuerpo en peso extrabold, que a escala de cartel es la identidad, contra una mono discreta que hace de voz técnica (prompt, fechas, stack, idioma).

### Hierarchy
- **Display** (800, clamp(3.75rem, 15vw, 13rem), interlineado 0.85, interletrado -0.035em): solo el nombre "dy.ojeda" en el hero.
- **Headline** (700, 2.25rem en móvil y 3.75rem desde `sm`, interletrado -0.03em, `text-balance`): títulos de sección con revelado por palabra. El cierre de contacto sube a 4.5rem y el bloque de Lattice baja a 1.875rem/3rem dentro de su tarjeta.
- **Title** (600, 1.5rem, interletrado -0.025em): nombres de proyecto; los puestos de experiencia usan 1.25rem y la línea de rol del hero 1.25rem/1.5rem.
- **Lead** (400, 1.125rem): párrafos de Sobre mí, Lattice y Contacto, en `--muted-foreground`, con medida de 52–62ch.
- **Body** (400, 1rem): descripciones de proyecto y experiencia, máximo 60ch.
- **Terminal** (Geist Mono 400, 0.875rem en móvil y 1rem desde `sm`): la línea `~/dy.ojeda $ whoami`.
- **Label** (Geist Mono 400, 0.75rem, interletrado 0.1em): stack de proyectos, fechas con cifras tabulares, selector ES/EN y la etiqueta y el estado de la tarjeta "Actualmente construyendo".

### Named Rules
**The Scale Contrast Rule.** El salto entre display y body es dramático a propósito. Si el nombre no domina el primer viewport, falta escala.

**The Mono Is Data Rule.** La mono marca datos técnicos (prompt, fechas, herramientas, idioma, estado). Nunca se usa como etiqueta o numeración encima de un título de sección.

## Layout

Una sola página con anclas: cabecera fija, hero, Sobre mí, Proyectos, Experiencia, Stack, bloque de Lattice Systems, Contacto y pie. Todo vive en un contenedor centrado de 72rem con márgenes laterales de 1.25rem (2rem desde `sm`).

- **Hero:** ocupa la altura del viewport menos la cabecera (`100svh - 4rem`) y centra verticalmente prompt, nombre, rol, pitch y CTAs; la tarjeta de estado cierra el primer viewport abajo.
- **Ritmo vertical:** cada sección lleva 3.5rem arriba y abajo (5rem desde `sm`; Contacto, 5rem/8rem). Entre título y contenido hay 2rem (2.5rem desde `sm`).
- **Sobre mí:** a partir de `lg` pasa a dos columnas (1fr / 1.4fr) con el título a la izquierda.
- **Proyectos:** lista vertical con divisores de 1px, no rejilla de tarjetas; cada fila tiene 1.75rem de padding vertical y, a la derecha, la flecha en un círculo o, sin enlace, un candado con "Repositorio privado".
- **Experiencia:** línea de tiempo con riel de 1px a la izquierda y un punto por puesto (el actual en teal, con pulso); columna de 11rem para el periodo y el contenido a la derecha desde `sm`; en móvil se apila.
- **Stack:** cuatro grupos (Backend, Frontend, IA, Datos e infraestructura) en dos columnas desde `sm`; cada grupo lleva un icono lucide en un círculo de 40px y sus herramientas como chips pill en mono.
- **Móvil:** la nav oculta Sobre mí, Proyectos y Experiencia y deja Contacto, ES/EN y el cambio de tema; los CTAs del hero se apilan a ancho completo.
- `scroll-padding-top: 5rem` mantiene las anclas por debajo de la cabecera fija.

## Elevation & Depth

El sistema es plano. No hay sombras en ningún elemento. La profundidad se construye con capas tonales (la tarjeta usa `--card`, un paso por encima del fondo en oscuro) y con bordes de un píxel en `--border`. La cabecera fija se separa del contenido solo con un borde inferior al 60% y el mismo fondo de página, sin desenfoque ni sombra.

### Named Rules
**The Flat Ground Rule.** Ninguna superficie se levanta con sombra. Si algo necesita separarse, sube un paso tonal o gana un borde de 1px; los estados se expresan con color de fondo, color de texto o color de borde.

## Shapes

- **Botones:** pill de radio completo (9999px) en todos los usos de la página, incluido el cambio de tema. El kit `base-rhea` trae `rounded-2xl` por defecto, así que el pill se aplica explícitamente en cada botón.
- **Tarjetas:** esquinas amplias de `rounded-2xl` (1.125rem, 1.8 × `--radius` de 0.625rem), iguales en la tarjeta de estado y en el bloque de Lattice.
- **Bordes:** siempre de 1px y en `--border`.
- **Puntos:** el indicador de estado es un círculo de 6px.

## Components

### Buttons
Directos y táctiles: pocos, grandes y claros.
- **Shape:** pill (9999px).
- **Primary:** relleno `--primary` con texto `--primary-foreground`, 48px de alto, 24px de padding horizontal, texto de 1rem en peso 500 y flecha al final. Uno solo por pantalla: "Contáctame" / "Contact me".
- **Hover / Focus:** el primario baja al 80% de opacidad del relleno; el foco muestra borde `--ring` más un anillo de 3px en `--ring` al 30%. Al presionar baja 1px.
- **Outline (secundario):** borde `--border`, fondo de página en claro y transparente en oscuro; en hover toma `--muted` (claro) o `--input` al 30% (oscuro). Se usa para "Ver proyectos", "Visitar latticesystems.dev" y, a 40px de alto con 16px de padding, para los enlaces sociales.
- **Ghost icon:** el cambio de tema, de 36px, transparente con hover `--muted`; renderiza sol y luna y el CSS muestra el que toca, para que servidor y cliente coincidan.

### Cards / Containers
- **Corner Style:** 1.125rem.
- **Background:** `--card`.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** 1px `--border`; en la tarjeta de estado enlazada, el borde pasa a `--signature` al 50% en hover.
- **Internal Padding:** 2rem (3rem desde `sm`) en el bloque de Lattice; 1rem × 1.25rem en la tarjeta de estado.

### Navigation
Cabecera fija de 64px: wordmark "dy.ojeda" en 1.125rem bold a la izquierda; a la derecha, enlaces de 0.875rem peso 500 en `--muted-foreground` que pasan a `--foreground` en hover, el selector ES/EN en Geist Mono 0.75rem con interletrado amplio y el cambio de tema. Los enlaces tienen padding de 8px × 12px y forma pill.

### Terminal Line
La firma del hero. El prompt en mono se escribe de una vez en 1.4s con pasos iguales al número de caracteres, tras 0.3s; el cursor es un bloque teal (`--signature`) de 0.55em × 1.1em que parpadea cada segundo. Con movimiento reducido aparece completo y quieto.

### Hero Name Intro
El `h1` (`[data-hero-name]`) se divide en letras con SplitText; las letras suben desde 70% con desenfoque de 10px y un escalonado de 0.045s, y el punto teal cae al final con `bounce.out`. Luego el rol, el texto y los CTAs (`[data-hero-fade]`) suben 24px. Mientras tanto quedan ocultos por la clase `.motion` (puesta antes del pintado) con una animación de respaldo que los muestra a los 3s si JS no corre.

### Dot Portrait
Retrato de halftone en canvas (`components/site/dot-portrait.tsx`), sin marco ni fondo: muestrea `public/retrato.png`, un recorte con transparencia (o, sin foto, el texto "dy."), y dibuja un punto `--signature` por celda de 5px solo donde está la figura. Antes de mapear tonos aplica contraste local (cada celda contra el promedio de su vecindad) y ecualiza el histograma solo sobre la figura, para que la cara conserve lentes, ojos y sonrisa entre un sombrero claro y una camisa oscura. Un piso de tono mantiene legible toda la silueta; los bordes de recorte de la foto (abajo y a los lados) se desvanecen. En claro los tonos oscuros dan puntos grandes, con los medios tonos levantados; en oscuro, los claros. La opacidad de cada punto sigue su tono, en cuatro niveles. Los puntos se arman de abajo hacia arriba con `expo.out`, una franja de escaneo recorre la figura cada 7s y, cerca del puntero (suavizado), crecen y se apartan en un radio de 110px. Se apoya en el borde inferior del hero y se redibuja al cambiar de tema.

### Dot Field
Retícula de puntos de 1px cada 28px detrás del hero (`components/site/dot-field.tsx`), en `--muted-foreground` al 22% y desvanecida hacia los bordes con una máscara radial. Respira con una onda lenta; en un radio de 180px alrededor del puntero los puntos crecen y se pintan con `--signature`. Se pausa fuera de pantalla.

### Section Heading Reveal
Cada título (`[data-reveal]`) se divide en palabras con SplitText; con ScrollTrigger en scrub, entre "top 88%" y "top 50%", cada palabra pasa de opacidad 0.12, desenfoque de 6px y 25% de desplazamiento a su estado final.

### Page Entrance and Scroll
La cabecera baja al abrir la página; el nombre entra letra por letra con giro y desenfoque, el punto cae con rebote y el resto del hero sube saliendo de un desenfoque. Al desplazarse, el texto del hero y el retrato se separan en paralaje (`[data-parallax]`). Cada sección entra con su propio gesto: párrafos que suben desde un desenfoque (`[data-row]`), proyectos que se destapan de abajo hacia arriba con `clip-path` (`[data-row="clip"]`), puestos que se deslizan desde el riel (`[data-row="slide"]`) mientras el riel se dibuja con el scroll (`[data-draw]`), chips y redes que aparecen en cascada con `back.out` (`[data-pop]`) y la tarjeta de Lattice que se abre desde un recorte interior (`[data-expand]`). Los CTAs y enlaces sociales (`[data-magnetic]`) siguen al puntero fino un 30% y regresan con `elastic.out`. Toda animación de entrada usa valores finales explícitos (`fromTo`/`set`+`to`), porque `from` lee estados a medio camino cuando el efecto se vuelve a montar sobre elementos con transiciones CSS.

### Hover States
Los enlaces de la nav ganan un subrayado teal que crece desde el centro; el punto del wordmark salta. En las filas de proyecto una banda `--muted` barre desde la izquierda, el nombre se desplaza, el stack se aclara y la flecha gira hacia afuera dentro de un círculo que se llena de teal. Los chips suben 2px con borde teal; el icono de cada grupo de stack se pinta de teal. Las redes llevan su icono (GitHub, LinkedIn e Instagram dibujados en la retícula de lucide, `components/site/brand-icons.tsx`) que gira y se pinta; el correo se subraya de izquierda a derecha.

### Status Card ("Actualmente construyendo")
Tarjeta enlazada a Lattice Systems al pie del hero: etiqueta en mono, nombre en semibold, descripción en secundario y, a la derecha, el estado en mono teal con un punto que pulsa (solo con `motion-safe`) y una flecha que se desplaza en hover.

### Project Row
Fila de lista con nombre en Title, descripción en Body secundario y herramientas en mono 0.75rem. Si hay enlace, toda la fila es el enlace y en hover la flecha se mueve en diagonal y se pinta con `--signature`.

## Do's and Don'ts

### Do:
- **Do** usar componentes de shadcn/ui (`components/ui/`, `base-rhea` sobre Base UI) reestilizados con los tokens de este sistema; agrégalos con el CLI de shadcn.
- **Do** mantener un solo CTA principal por pantalla: "Contáctame" / "Contact me".
- **Do** dar a cada texto su versión ES y EN con el mismo peso, en los diccionarios de `app/[lang]/dictionaries/`.
- **Do** mostrar solo trabajo real: proyectos de git y experiencia verificable.
- **Do** respetar `prefers-reduced-motion` en toda animación.
- **Do** aplicar forma pill (9999px) a todo botón nuevo; el radio por defecto del kit no es el del sistema.
- **Do** separar superficies con un paso tonal (`--card`) y bordes de 1px.
- **Do** tratar el sombrero estilo Sinaloa, si aparece, como un único ícono de línea con el mismo trazo y color que el resto de la UI.

### Don't:
- **Don't** inventar clientes, testimonios, métricas o casos de Lattice Systems.
- **Don't** escribir colores fijos en componentes: todo sale de los tokens de `app/globals.css`.
- **Don't** pintar de teal nada fuera de la lista de The One Accent Rule.
- **Don't** usar sombras en tarjetas, botones o cabecera.
- **Don't** poner números de sección ni etiquetas tipo eyebrow encima de los títulos.
- **Don't** convertir el sombrero en tema, caricatura o imaginería asociada al narco.
- **Don't** usar degradados morado-azul ni brillos neón como decoración.
- **Don't** agregar animaciones fuera de `PageMotion` o de los componentes de puntos: toda coreografía nueva va por atributos `data-*` en ese mismo lugar, con GSAP y respetando movimiento reducido.
- **Don't** usar partículas o puntos que no sean el punto teal de la marca.
