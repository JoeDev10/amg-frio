/* AMG Frío — datos del negocio.
   Editá este archivo para cambiar el nombre, el WhatsApp, la cobertura,
   los servicios, los trabajos y las reseñas. El resto del sitio los toma de acá.

   REGLA: acá no van datos inventados. Si un dato no está confirmado por Martín,
   queda vacío o marcado con [CONFIRMAR]. Mejor que falte a que sea falso. */
window.SITE_CONFIG = {
  businessName: "AMG Frío",
  /* URL pública del sitio. La usan el canonical, Open Graph y el schema. */
  siteUrl: "https://joedev10.github.io/amg-frio/",
  logoLines: ["AMG", "FRIO"],
  tagline: "Refrigeración y Climatización",
  technicianName: "Martín",
  whatsappNumber: "5491157303266",
  whatsappDisplay: "+54 9 11 5730-3266",

  /* Píxel de Meta (Facebook e Instagram).
     Vacío = no se carga nada y no se rastrea a nadie.
     Para activarlo, pegá acá el ID numérico que da el Administrador de Eventos
     de Meta (son 15 o 16 dígitos). Con el ID puesto, la página avisa a Meta
     cuando alguien abre el sitio y cuando toca un botón de WhatsApp o llamar. */
  metaPixelId: "",
  addressLine: "Juan María Gutiérrez · Berazategui",
  zonas: "Base en Berazategui. Atendemos en Zona Sur y Capital Federal, a domicilio y en comercios.",

  /* [CONFIRMAR CON MARTÍN] Localidades donde sale a trabajar.
     Sacá las que no cubra y agregá las que falten. Alimentan la sección
     «Dónde trabajamos» y el areaServed del schema. */
  localidades: [
    "Berazategui",
    "Hudson",
    "Ranelagh",
    "Quilmes",
    "Bernal",
    "Ezpeleta",
    "Don Bosco",
    "Florencio Varela",
    "San Francisco Solano",
    "Avellaneda",
    "Sarandí",
    "Wilde",
    "Lanús",
    "Lomas de Zamora",
    "Almirante Brown",
    "Capital Federal"
  ],

  /* Los tres caminos del inicio: lo primero que ve el que entra.
     Tres opciones grandes con foto, una por rubro, y cada una baja derecho
     a su parte. Son tres a propósito: con más, el que entra no elige.
     Para cambiar el orden, mové el bloque entero. */
  caminos: {
    titulo: "¿Qué venís a hacer?",
    bajada: "Tocá el que va con tu equipo.",
    items: [
      /* `foto` es el id del servicio de más abajo del que sale la imagen.
         Se reusa a propósito: si se repitiera la ruta, el archivo suelto
         quedaría incrustado dos veces y la página pesaría 112 KB de más.
         Cambiar la foto del servicio cambia también la del camino. */
      {
        titulo: "Cámaras frigoríficas",
        nota: "Armado, reparación y mantenimiento",
        foto: "camaras",
        destino: "#camaras"
      },
      {
        titulo: "Heladeras y equipos de comercio",
        nota: "Exhibidoras, freezers y vitrinas",
        foto: "comercial",
        destino: "#comercio"
      },
      {
        titulo: "Aire acondicionado",
        nota: "Instalación, limpieza y reparación",
        foto: "aires",
        destino: "#aire"
      }
    ]
  },

  /* Las secciones que tienen foto, lista y un botón: las tres a las que
     llevan los caminos del inicio, más mantenimiento. Todas con el mismo
     orden: primero qué hacemos, después el botón.

     `id` es el de la sección en index.html (se llena #<id>-cuerpo).
     `servicio` es el id del servicio del que sale la foto, para no incrustar
     el mismo archivo dos veces. Los puntos no agregan nada nuevo: son lo que
     el sitio ya decía de cada servicio, partido en renglones.
     Sin `mensaje`, el botón usa el de `messages` con el mismo id.
     El botón es discreto a propósito: la página no tiene que ser «llame ya». */
  rubros: [
    {
      id: "camaras",
      servicio: "camaras",
      titulo: "Cámaras frigoríficas",
      bajada: "Armado, instalación, reparación y mantenimiento.",
      puntos: [
        "Armado e instalación de cámaras nuevas",
        "De conservación, congelación o mixtas",
        "Reparación y diagnóstico de fallas",
        "Mantenimiento preventivo"
      ],
      accion: "Consultar por una cámara",
      mensaje: "Hola, quiero consultar por una cámara frigorífica."
    },
    {
      id: "comercio",
      servicio: "comercial",
      titulo: "Heladeras y equipos de comercio",
      bajada: "Heladeras exhibidoras, freezers, vitrinas y equipos de comercios.",
      puntos: [
        "Heladeras exhibidoras",
        "Freezers y congeladores",
        "Vitrinas refrigeradas",
        "Equipos de comercio en general"
      ],
      accion: "Consultar por una heladera",
      mensaje: "Hola, necesito consultar por un equipo de comercio: heladera, freezer o vitrina."
    },
    {
      id: "aire",
      servicio: "aires",
      titulo: "Aire acondicionado",
      bajada: "Instalación, mantenimiento, limpieza, diagnóstico de fallas y reparación.",
      puntos: [
        "Instalación de split",
        "Mantenimiento y limpieza",
        "Diagnóstico de fallas",
        "Reparación"
      ],
      accion: "Consultar por un aire",
      mensaje: "Hola, necesito consultar por un aire acondicionado."
    },
    /* Antes había tres planes con la misma lista repetida. Se sacaron a
       pedido: queda una sola lista de qué incluye cada visita y para quién. */
    {
      id: "mantenimiento",
      servicio: "mantenimiento",
      etiqueta: "Cada visita incluye",
      puntos: [
        "Limpieza",
        "Control de temperatura y funcionamiento",
        "Revisión preventiva",
        "Informe de lo que se vio"
      ],
      para: ["Heladerías", "Carnicerías", "Supermercados", "Restaurantes", "Otros comercios"],
      accion: "Consultar por mantenimiento"
    }
  ],

  /* Franja del inicio. El que lleva `numero` se muestra en grande, con el
     número arriba y abajo qué significa, como en las webs que venden.

     ACÁ NO VA NINGÚN NÚMERO INVENTADO. Los años de experiencia y la
     cantidad de clientes los tiene que confirmar Martín: si el sitio dice
     veinte años y en la primera charla aparece que son ocho, se pierde la
     venta y la confianza. Lo mismo con la matrícula, que es un dato
     verificable. Mientras tanto van los datos que ya sabemos ciertos.

     Cuando Martín pase los reales, agregá los bloques así, arriba de todo:

       { icono: "clock", numero: "+12 años", titulo: "De experiencia" },
       { icono: "store", numero: "+400", titulo: "Comercios atendidos" },
       { icono: "shield", numero: "Matriculado", titulo: "Nº de matrícula" },

     y cuando la ficha de Google tenga reseñas:

       { icono: "star", numero: "5,0", titulo: "En Google" },
  */
  confianza: [
    {
      icono: "truck",
      titulo: "Herramientas propias",
      detalle: "Diagnosticamos en el lugar."
    },
    {
      icono: "pin",
      titulo: "Base en Berazategui",
      detalle: "Zona Sur y Capital Federal."
    },
    {
      icono: "store",
      titulo: "Comercios y hogares",
      detalle: "De un split a una cámara."
    },
    {
      icono: "chat",
      titulo: "Sin compromiso",
      detalle: "Consultanos y te orientamos."
    }
  ],

  /* Atajos de diagnóstico del inicio. Cada uno abre WhatsApp con el
     síntoma ya escrito, así el cliente no tiene que redactar nada.
     `icono` es el dibujo de la tarjeta: termometro, hielo, heladera, ruido,
     split, nueva, agenda u otro (están en main.js, en ICONOS_LINEA). */
  diagnostico: {
    titulo: "¿Qué le pasa a tu equipo?",
    bajada: "Tocá tu caso y se abre WhatsApp con el mensaje escrito.",
    items: [
      {
        icono: "termometro",
        etiqueta: "La cámara no llega a temperatura",
        mensaje: "Hola, tengo una cámara frigorífica que no llega a la temperatura que necesito. ¿Pueden verla?"
      },
      {
        icono: "hielo",
        etiqueta: "Se formó hielo en el evaporador",
        mensaje: "Hola, se me formó hielo en el evaporador del equipo de frío. ¿Pueden verlo?"
      },
      {
        icono: "heladera",
        etiqueta: "La heladera exhibidora no enfría",
        mensaje: "Hola, tengo una heladera exhibidora que no enfría. ¿Pueden verla?"
      },
      {
        icono: "ruido",
        etiqueta: "El equipo hace ruido raro o vibra",
        mensaje: "Hola, mi equipo de frío hace un ruido raro o vibra más que de costumbre. ¿Pueden revisarlo?"
      },
      {
        icono: "split",
        etiqueta: "El split no enfría o gotea",
        mensaje: "Hola, mi aire acondicionado split no enfría bien o está goteando. ¿Pueden verlo?"
      },
      {
        icono: "nueva",
        etiqueta: "Quiero armar una cámara nueva",
        mensaje: "Hola, quiero armar una cámara frigorífica nueva. ¿Pueden pasarme un presupuesto?"
      },
      {
        icono: "agenda",
        etiqueta: "Necesito mantenimiento programado",
        mensaje: "Hola, necesito mantenimiento preventivo programado para los equipos de mi comercio."
      },
      {
        icono: "otro",
        etiqueta: "Mi caso es otro",
        mensaje: "Hola, quiero hacer una consulta por un equipo de refrigeración."
      }
    ]
  },

  /* Cómo trabajamos. Pasos del proceso, sin plazos prometidos.
     Si Martín confirma tiempos de respuesta, agregalos en `detalle`. */
  pasos: [
    {
      titulo: "Nos contás qué pasa",
      detalle: "Qué equipo es, qué falla y dónde estás."
    },
    {
      titulo: "Vemos el equipo",
      detalle: "Coordinamos la visita y lo revisamos en el lugar."
    },
    {
      titulo: "Te explicamos qué tiene",
      detalle: "En castellano, antes de tocar nada."
    },
    {
      titulo: "Armamos la propuesta",
      detalle: "Con el alcance del trabajo según el equipo."
    }
  ],

  /* Lo técnico de la sección de cámaras frigoríficas. El título, la lista
     y el botón están en `rubros`, como Comercio y Aire. Esto va plegado en
     «Ver más»: es información técnica general del rubro, no promesas del
     negocio. */
  camaras: {
    /* Frío industrial y compresores no son un rubro aparte: son trabajos
       que entran acá. Antes tenían una tarjeta propia en la grilla. */
    tambien: "También hacemos frío industrial y reparación de compresores y motocompresores.",
    mas: {
      titulo: "Lo que conviene saber de una cámara",
      detalle: "Señales de falla, conservación o congelación y qué define el equipo."
    },
    porQue: {
      titulo: "Casi siempre avisa antes",
      texto: "Una falla que arranca como un ruido o un poco de hielo de más termina en mercadería perdida y el negocio parado un día de venta.",
      senales: [
        "Tarda más de lo normal en bajar la temperatura",
        "Hielo acumulado en el evaporador o en las paredes",
        "El equipo trabaja sin parar y nunca corta",
        "Agua en el piso o desagüe tapado",
        "La puerta no cierra bien o el burlete está vencido",
        "Sube el consumo eléctrico sin explicación"
      ]
    },
    tipos: {
      titulo: "Conservación o congelación",
      texto: "Lo primero es definir a qué temperatura tiene que trabajar. De eso dependen el aislamiento, el equipo y el consumo.",
      items: [
        {
          titulo: "Conservación",
          rango: "0 °C a 8 °C",
          detalle: "Carnes frescas, lácteos, fiambres, frutas y verduras, bebidas, flores."
        },
        {
          titulo: "Congelación",
          rango: "−18 °C o menos",
          detalle: "Carnes congeladas, pescado, helados, materia prima para producción."
        },
        {
          titulo: "Mixta",
          rango: "Dos sectores",
          detalle: "Conservación y congelación separadas, cuando el espacio es limitado."
        }
      ]
    },
    dimensionar: {
      titulo: "Qué define el equipo que necesitás",
      texto: "No se calcula por metro cuadrado. Estas son las seis cosas que miramos:",
      items: [
        "Volumen real del recinto, en m³: el alto cuenta igual que el largo y el ancho",
        "Temperatura que tenés que sostener adentro",
        "Cuánto producto entra por día y a qué temperatura llega",
        "Cuántas veces por hora se abre la puerta",
        "Calor que se genera adentro: luces, forzadores, gente trabajando",
        "Aislamiento de paredes, piso y techo"
      ],
      cierre: "Una cámara chica para lo que guardás trabaja al máximo todo el día y se desgasta. Una demasiado grande arranca y para todo el tiempo y también consume de más."
    }
  },

  showReviews: false,
  reviews: [],
  /* Oculto hasta tener fotos reales de Martín. Poné true y cargá las rutas en antesDespues. */
  showAntesDespues: false,
  /* Logos reales de clientes. Vacío hasta tener archivos. Cada ítem: { nombre, imagen, alt }. */
  showClientLogos: false,
  clientLogos: [],
  /* Oculto hasta tener fotos reales de Martín. Poné true y cargá ítems en trabajos. */
  showTrabajos: false,
  /* Cada trabajo real: { titulo, descripcion, imagen, alt }. Vacío hasta tener fotos. */
  trabajos: [],
  /*
    Pares antes/después. No hay fotos reales todavía.
    Para reemplazar, poné la ruta en antes y despues, por ejemplo:
    antes: "img/antes-1.jpg", despues: "img/despues-1.jpg"
  */
  antesDespues: [
    {
      titulo: "Mantenimiento de cámara frigorífica",
      antes: "",
      despues: "",
      antesRotulo: "Antes",
      despuesRotulo: "Después"
    },
    {
      titulo: "Instalación de split",
      antes: "",
      despues: "",
      antesRotulo: "Antes",
      despuesRotulo: "Después"
    },
    {
      titulo: "Reparación de heladera comercial",
      antes: "",
      despues: "",
      antesRotulo: "Antes",
      despuesRotulo: "Después"
    }
  ],
  messages: {
    hero: "Hola, quiero consultar por una cámara frigorífica o por mantenimiento preventivo y pedir un presupuesto.",
    general: "Hola, quiero hacer una consulta.",
    mantenimiento: "Hola, necesito consultar por mantenimiento preventivo para mi comercio."
  },
  /* Ya no hay grilla de «Servicios». Esta lista arma el desplegable del
     formulario de contacto y da las fotos de los caminos del inicio y de las
     secciones de `rubros`. `enGrilla` quedó de cuando había grilla: hoy no
     cambia nada. */
  services: [
    {
      id: "camaras",
      titulo: "Cámaras frigoríficas",
      descripcion: "Armado, instalación, reparación y mantenimiento de cámaras frigoríficas.",
      imagen: "img/servicios/camaras.webp",
      alt: "Interior de una cámara de frío con estanterías y paredes claras",
      mensaje: "Hola, necesito consultar por una cámara frigorífica.",
      destacado: true,
      enGrilla: false
    },
    {
      id: "mantenimiento",
      titulo: "Mantenimiento para comercios",
      descripcion: "Mantenimiento preventivo y visitas programadas para que el frío de tu negocio no se corte.",
      imagen: "img/servicios/mantenimiento.webp",
      alt: "Unidad exterior de un equipo de refrigeración en servicio",
      mensaje: "Hola, necesito consultar por mantenimiento preventivo para mi comercio.",
      destacado: true,
      enGrilla: false
    },
    {
      id: "aires",
      titulo: "Aires acondicionados",
      descripcion: "Instalación, mantenimiento, limpieza, diagnóstico de fallas y reparación.",
      imagen: "img/servicios/aires.webp",
      alt: "Aire acondicionado split instalado en lo alto de una pared",
      mensaje: "Hola, necesito consultar por un aire acondicionado.",
      destacado: false
    },
    {
      id: "comercial",
      titulo: "Refrigeración comercial",
      descripcion: "Heladeras exhibidoras, freezers, vitrinas y equipos de comercios.",
      imagen: "img/servicios/comercial.webp",
      alt: "Heladera exhibidora con bebidas en un comercio",
      mensaje: "Hola, necesito consultar por refrigeración comercial.",
      destacado: false
    },
    {
      id: "industrial",
      titulo: "Frío industrial",
      descripcion: "Diagnóstico y mantenimiento de instalaciones y equipos de frío industrial.",
      /* Para la foto real, cargala en img/frio-industrial.jpg y poné:
         imagen: "img/frio-industrial.jpg" */
      imagen: "",
      alt: "Frío industrial",
      placeholderEmoji: "❄️",
      mensaje: "Hola, necesito consultar por frío industrial.",
      destacado: false
    },
    {
      id: "compresores",
      titulo: "Compresores y motocompresores",
      descripcion: "Diagnóstico, reparación o reemplazo según el equipo.",
      /* Para la foto real, cargala en img/compresores.jpg y poné:
         imagen: "img/compresores.jpg" */
      imagen: "",
      alt: "Compresores y motocompresores",
      placeholderEmoji: "⚙️",
      mensaje: "Hola, necesito consultar por un compresor o motocompresor.",
      destacado: false
    }
  ]
};
