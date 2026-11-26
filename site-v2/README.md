# AMG Frío

Sitio estático de una página para AMG Frío (refrigeración y climatización, base en Berazategui). HTML, CSS y JavaScript, sin framework ni dependencias. Se publica en GitHub Pages: [https://joedev10.github.io/amg-frio/](https://joedev10.github.io/amg-frio/).

## Verlo en tu computadora

En esta carpeta (`site-v2/`):

```bash
python3 -m http.server 43123
```

Abrí `http://127.0.0.1:43123`.

## Cómo se publica (importante)

Lo que está publicado **no es esta carpeta**: es `bundle/index.html`, un único archivo con el CSS, el JS, las fuentes y las imágenes incrustados como data URIs. El repositorio sirve ese archivo desde la raíz. Por eso `css/`, `js/` e `img/` dan 404 en el sitio en vivo.

Editar `site-v2/` y subirlo **no cambia nada** si no se regenera el bundle. El flujo real es:

1. Editar lo que haga falta dentro de `site-v2/`.
2. Desde la carpeta que contiene `site-v2/`, correr:

   ```bash
   python3 build_bundle.py
   ```

   Eso escribe `bundle/index.html` y copia `bundle/img/og-cover.jpg`.
3. Publicar **los dos**: el `index.html` en la raíz del repositorio y `img/og-cover.jpg` junto a él.

`og-cover.jpg` es la única imagen que no se incrusta: las previsualizaciones de WhatsApp, Facebook y X necesitan una URL absoluta a un archivo real. Si falta ese archivo, el sitio funciona igual pero el enlace compartido se ve sin imagen.

No hay paso de build más allá de eso. El `.nojekyll` evita que Pages procese el sitio con Jekyll.

## Editar los datos (un solo lugar)

Abrí `js/config.js`.

| Campo | Para qué sirve |
| --- | --- |
| `businessName` | Nombre visible. Hoy: `AMG Frío`. |
| `siteUrl` | URL pública. La usan el canonical, Open Graph y el schema. |
| `logoLines` | Wordmark del logo: `AMG` y `FRIO`. |
| `tagline` | Bajada del logo: Refrigeración y Climatización. |
| `whatsappNumber` | Número para los links `wa.me`, solo dígitos. Hoy: `5491157303266`. |
| `whatsappDisplay` | Cómo se muestra el teléfono. Hoy: `+54 9 11 5730-3266`. |
| `addressLine` | Franja y footer. Hoy: `Juan María Gutiérrez · Berazategui`. |
| `zonas` | Texto de cobertura en el inicio, la FAQ y el footer. |
| `localidades` | Chips de la sección «Dónde trabajamos». **Falta que Martín confirme la lista.** |
| `confianza` | Franja de cuatro ítems debajo del inicio. `icono` acepta `truck`, `pin`, `store`, `chat` o `snow`. |
| `diagnostico` | Atajos de síntomas del inicio. Cada ítem abre WhatsApp con el problema ya escrito. |
| `pasos` | Los pasos de «Cómo trabajamos». |
| `camaras` | Todo el contenido de la sección de cámaras frigoríficas: señales de falla, conservación/congelación y qué define el equipo. |
| `services` | Tarjetas de servicios y opciones del formulario. Cada una tiene `titulo`, `descripcion`, `imagen`, `alt`, `mensaje` (texto de WhatsApp) y `destacado`. |
| `services[].acciones` | Si un servicio tiene este array (`etiqueta` y `mensaje`), la tarjeta muestra un botón de WhatsApp por acción. Hoy lo usa cámaras frigoríficas. |
| `propuestas` | Las tres propuestas de mantenimiento, sin precios. `destacado: true` la resalta. |
| `trabajos` | Galería. Dejala vacía hasta tener fotos reales. Cada ítem: `{ titulo, descripcion, imagen, alt }`. |
| `showTrabajos` | `false` oculta la sección Trabajos y su ítem del menú. |
| `showAntesDespues` | `false` oculta Antes y después. |
| `showReviews` | `false` oculta Reseñas. Pasalo a `true` solo cuando haya reseñas reales en `reviews` (`{ nombre, texto }`). |
| `showClientLogos` | `false` oculta la franja «Confían en nosotros». Con `true`, carga logos reales en `clientLogos` (`{ nombre, imagen, alt }`). |
| `messages` | Mensajes prellenados del hero, el botón flotante y mantenimiento. |

### Lo que NO se edita desde `config.js`

Están escritos en `index.html` a propósito, para que los lean también los buscadores que no ejecutan JavaScript:

- `<title>`, la meta description, el canonical y las etiquetas Open Graph y Twitter.
- El bloque `schema-org` (datos del negocio y catálogo de servicios).
- El bloque `schema-faq` (preguntas frecuentes para los resultados enriquecidos de Google).
- El texto de las preguntas frecuentes.

Si cambiás el teléfono, las zonas o los servicios en `config.js`, actualizá también esos bloques del `<head>` y la FAQ.

El `schema-faq` solo incluye preguntas con respuesta confirmada. Las dos que están pendientes quedan fuera a propósito: Google penaliza el contenido provisorio en los datos estructurados.

## Fotos

Las imágenes de servicios y del inicio son fotos libres (Pexels), livianas en WebP, o ilustraciones SVG. No son trabajos de AMG Frío.

Reemplazalas por fotos reales de Martín:

- `img/hero.webp` — técnico o equipo en el inicio
- `img/servicios/camaras.webp`
- `img/servicios/mantenimiento.webp`
- `img/servicios/aires.webp`
- `img/servicios/comercial.webp`
- `img/servicios/industrial.svg` y `img/servicios/compresor.svg` — hoy son ilustraciones; podés cambiar la ruta en `config.js` por un `.webp`
- `img/og-cover.jpg` — la imagen que se ve al compartir el enlace (1200 × 630). Se genera a partir del hero; si cambiás el hero, conviene rehacerla.

Créditos de las fotos de stock, para reemplazar:

- Inicio y mantenimiento: José Andrés Pacheco Cortes, Pexels
- Cámara de frío: Anna Shvets, Pexels
- Aire acondicionado: NEOSiAM, Pexels
- Heladera exhibidora: Erik Mclean, Pexels

Los trabajos de la galería no se inventan: se cargan en `trabajos` cuando haya fotos.

## Decisiones tomadas a propósito

- **No hay mapa.** Se sacó a pedido y no se vuelve a agregar.
- **No hay datos inventados.** Ni años de experiencia, ni matrícula, ni cantidad de clientes, ni reseñas, ni garantías, ni urgencias 24 horas, ni precios. La competencia del rubro publica varias de esas cosas; acá no se ponen hasta que Martín las confirme.
- **Trabajos, Antes y después, Reseñas y Clientes están ocultos**, no borrados. Se activan desde `config.js` cuando haya material real.

## Pendiente de confirmar con Martín

1. **Si el diagnóstico tiene costo.** La FAQ hoy dice que se aclara por WhatsApp antes de coordinar, sin prometer nada.
2. **Si factura.** Mismo criterio: la FAQ dice que se consulta por WhatsApp.
3. **La lista de localidades** de `localidades` en `config.js`. Está armada con las localidades de Zona Sur; hay que sacar las que no cubra.
4. **La dirección base** `Juan María Gutiérrez · Berazategui`.
5. **Fotos reales** de trabajos, de frío industrial y de compresores.
6. **Reseñas** de clientes, cuando las haya.

Cuando se confirmen 1 y 2, conviene sumar esas preguntas al bloque `schema-faq` del `<head>`.
