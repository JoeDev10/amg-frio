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

  /* Franja de confianza del inicio. Solo datos que ya decía el sitio.
     NO agregues acá años de experiencia, matrícula, cantidad de clientes
     ni garantías hasta que Martín los confirme. */
  confianza: [
    {
      icono: "truck",
      titulo: "Movilidad y herramientas propias",
      detalle: "Vamos con el equipamiento para diagnosticar en el lugar."
    },
    {
      icono: "pin",
      titulo: "Base en Berazategui",
      detalle: "Salimos a Zona Sur y Capital Federal."
    },
    {
      icono: "store",
      titulo: "Hogares, comercios y empresas",
      detalle: "Desde un split hasta una cámara frigorífica."
    },
    {
      icono: "chat",
      titulo: "Consulta sin compromiso",
      detalle: "Escribinos y te decimos cómo seguimos, sin obligación."
    }
  ],

  /* Atajos de diagnóstico del inicio. Cada uno abre WhatsApp con el
     síntoma ya escrito, así el cliente no tiene que redactar nada. */
  diagnostico: {
    titulo: "¿Qué le pasa a tu equipo?",
    bajada: "Tocá lo que más se parezca a tu caso y se abre WhatsApp con el mensaje ya armado. Si no encaja ninguno, escribinos igual.",
    items: [
      {
        etiqueta: "La cámara no llega a temperatura",
        mensaje: "Hola, tengo una cámara frigorífica que no llega a la temperatura que necesito. ¿Pueden verla?"
      },
      {
        etiqueta: "Se formó hielo en el evaporador",
        mensaje: "Hola, se me formó hielo en el evaporador del equipo de frío. ¿Pueden verlo?"
      },
      {
        etiqueta: "La heladera exhibidora no enfría",
        mensaje: "Hola, tengo una heladera exhibidora que no enfría. ¿Pueden verla?"
      },
      {
        etiqueta: "El equipo hace ruido raro o vibra",
        mensaje: "Hola, mi equipo de frío hace un ruido raro o vibra más que de costumbre. ¿Pueden revisarlo?"
      },
      {
        etiqueta: "El split no enfría o gotea",
        mensaje: "Hola, mi aire acondicionado split no enfría bien o está goteando. ¿Pueden verlo?"
      },
      {
        etiqueta: "Quiero armar una cámara nueva",
        mensaje: "Hola, quiero armar una cámara frigorífica nueva. ¿Pueden pasarme un presupuesto?"
      },
      {
        etiqueta: "Necesito mantenimiento programado",
        mensaje: "Hola, necesito mantenimiento preventivo programado para los equipos de mi comercio."
      },
      {
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
      detalle: "Por WhatsApp o con el formulario: qué equipo es, qué falla notás y en qué localidad estás."
    },
    {
      titulo: "Vemos el equipo",
      detalle: "Coordinamos la visita para revisarlo en el lugar. Si podés, mandanos fotos del equipo y de la placa antes."
    },
    {
      titulo: "Te explicamos qué encontramos",
      detalle: "Te decimos qué tiene el equipo y qué hay que hacer, en castellano, antes de tocar nada."
    },
    {
      titulo: "Armamos la propuesta",
      detalle: "Con el alcance del trabajo según el equipo y lo que necesites."
    }
  ],

  /* Contenido de la sección de cámaras frigoríficas.
     Es información técnica general del rubro, no promesas del negocio. */
  camaras: {
    titulo: "Cámaras frigoríficas",
    bajada: "Es el equipo que menos se mira y el que más caro sale cuando falla. Armado, instalación, reparación y mantenimiento.",
    porQue: {
      titulo: "Por qué no conviene esperar",
      texto: "Cuando una cámara deja de sostener la temperatura, el problema no es el equipo: es la mercadería adentro. Una falla que arranca como un ruido o un poco de hielo de más termina en pérdida de producto, cortes de servicio en pleno día de venta y problemas con la habilitación. Casi siempre avisa antes.",
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
      texto: "Antes de armar o cambiar una cámara, lo primero es definir a qué temperatura tiene que trabajar. De eso dependen el aislamiento, el equipo y lo que vas a gastar por mes en luz.",
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
      texto: "No se calcula por metro cuadrado. Estas son las variables que miramos antes de pasarte una propuesta:",
      items: [
        "Volumen real del recinto, en m³: el alto cuenta igual que el largo y el ancho",
        "Temperatura que tenés que sostener adentro",
        "Cuánto producto entra por día y a qué temperatura llega",
        "Cuántas veces por hora se abre la puerta",
        "Calor que se genera adentro: luces, forzadores, gente trabajando",
        "Aislamiento de paredes, piso y techo"
      ],
      cierre: "Una cámara chica para lo que guardás trabaja al máximo todo el día y se desgasta. Una demasiado grande arranca y para todo el tiempo y también consume de más."
    },
    mensaje: "Hola, quiero consultar por una cámara frigorífica."
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
  propuestas: [
    {
      titulo: "Visita periódica básica",
      detalle: "Una recorrida programada para ver cómo está el equipo.",
      incluye: ["Limpieza", "Control de temperatura y funcionamiento", "Revisión preventiva", "Informe"],
      mensaje: "Hola, quiero que armen una propuesta de visita periódica básica para mi comercio."
    },
    {
      titulo: "Mantenimiento frecuente",
      detalle: "Para cuando el frío del negocio no puede cortarse. La frecuencia la definimos con vos.",
      incluye: ["Limpieza", "Control de temperatura y funcionamiento", "Revisión preventiva", "Informe"],
      mensaje: "Hola, quiero que armen una propuesta de mantenimiento frecuente para mi comercio.",
      destacado: true
    },
    {
      titulo: "A medida",
      detalle: "Definimos el alcance según tus instalaciones y lo que necesitás cuidar.",
      incluye: ["Limpieza", "Control de temperatura y funcionamiento", "Revisión preventiva", "Informe"],
      mensaje: "Hola, quiero que armen una propuesta de mantenimiento a medida para mi comercio."
    }
  ],
  messages: {
    hero: "Hola, quiero consultar por una cámara frigorífica o por mantenimiento preventivo y pedir un presupuesto.",
    general: "Hola, quiero hacer una consulta.",
    mantenimiento: "Hola, necesito consultar por mantenimiento preventivo para mi comercio."
  },
  services: [
    {
      id: "camaras",
      titulo: "Cámaras frigoríficas",
      descripcion: "Armado, instalación, reparación y mantenimiento de cámaras frigoríficas.",
      imagen: "img/servicios/camaras.webp",
      alt: "Interior de una cámara de frío con estanterías y paredes claras",
      mensaje: "Hola, necesito consultar por una cámara frigorífica.",
      destacado: true,
      acciones: [
        {
          etiqueta: "Armado o instalación",
          mensaje: "Hola, necesito consultar por el armado o instalación de una cámara frigorífica."
        },
        {
          etiqueta: "Mantenimiento de cámara instalada",
          mensaje: "Hola, necesito mantenimiento para una cámara ya instalada."
        }
      ]
    },
    {
      id: "mantenimiento",
      titulo: "Mantenimiento para comercios",
      descripcion: "Mantenimiento preventivo y visitas programadas para que el frío de tu negocio no se corte.",
      imagen: "img/servicios/mantenimiento.webp",
      alt: "Unidad exterior de un equipo de refrigeración en servicio",
      mensaje: "Hola, necesito consultar por mantenimiento preventivo para mi comercio.",
      destacado: true
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
