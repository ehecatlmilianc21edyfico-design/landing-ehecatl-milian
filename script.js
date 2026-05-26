const WHATSAPP_DESTINO = "5214439484031";
const MIN_FORM_SECONDS = 6;
const WHATSAPP_SEND_LOCK_MS = 8000;
const OPEN_FIELD_MAX_LENGTH = 500;
const SECURITY_NOTE =
  "Por seguridad, no compartas documentos, contraseñas ni datos bancarios en este formulario. Si hace falta revisar algo específico, lo vemos después por un medio adecuado.";
const FINISH_DEFAULT_MESSAGE =
  "Revisaré tus respuestas y me pondré en contacto contigo para orientarte según tu objetivo inmobiliario.";

const baseQuestions = [
  {
    id: "nombre",
    type: "text",
    inputType: "text",
    kicker: "Antes de empezar",
    title: "Antes de empezar, ¿cómo te llamas?",
    summaryTitle: "Nombre",
    help: "Me gusta dirigirme a cada persona por su nombre, porque cada caso inmobiliario es distinto.",
    required: true,
    placeholder: "Escribe tu nombre",
    autocomplete: "given-name",
  },
  {
    id: "bienvenida_nombre",
    type: "message",
    kicker: ({ name }) => `Mucho gusto, ${name}`,
    title: "Gracias por estar aquí. Vamos paso a paso.",
    help:
      "No tienes que tener todo claro todavía. Mi intención es ayudarte a ordenar tu idea y darte una orientación que realmente tenga sentido para ti.",
    cta: "Continuar",
  },
  {
    id: "objetivo",
    type: "choice",
    kicker: "Primer contexto",
    title: ({ name }) => `${name}, ¿qué te gustaría resolver o lograr en este momento?`,
    summaryTitle: "¿Qué te gustaría resolver o lograr en este momento?",
    help:
      "Puede ser comprar, vender, rentar, invertir o simplemente entender por dónde empezar. Elige lo que más se acerque a tu caso.",
    required: true,
    options: [
      ["comprar", "Comprar una propiedad"],
      ["vender", "Vender una propiedad"],
      ["rentar", "Rentar una propiedad"],
      ["poner_renta", "Poner en renta una propiedad"],
      ["invertir", "Invertir en bienes raíces"],
      ["valuacion", "Saber cuánto vale mi propiedad"],
      ["orientacion", "Necesito asesoría porque no sé por dónde empezar"],
    ],
  },
  {
    id: "etapa",
    type: "choice",
    kicker: "Momento",
    title: ({ name }) => `¿En qué punto estás ahorita, ${name}?`,
    summaryTitle: "¿En qué punto estás ahorita?",
    help:
      "No importa si apenas estás viendo opciones o si ya quieres avanzar. Saber esto me ayuda a acompañarte mejor y sin presionarte.",
    required: true,
    options: [
      ["explorando", "Apenas estoy explorando"],
      ["idea_clara", "Ya tengo una idea clara"],
      ["avanzar_pronto", "Quiero avanzar pronto"],
      ["comparar", "Necesito comparar opciones"],
      ["asesoria_antes", "Necesito asesoría antes de decidir"],
    ],
  },
  {
    id: "prioridad",
    type: "choice",
    kicker: "Prioridad",
    title: "¿Qué te gustaría cuidar más en esta decisión?",
    summaryTitle: "¿Qué te gustaría cuidar más en esta decisión?",
    help:
      "Para mí no se trata solo de mostrar propiedades. También importa que te sientas seguro, bien orientado y con claridad.",
    required: true,
    options: [
      ["seguridad", "Seguridad en la operación"],
      ["ubicacion", "Buena ubicación"],
      ["precio_justo", "Precio justo"],
      ["plusvalia", "Plusvalía"],
      ["rapidez", "Rapidez"],
      ["credito", "Facilidad de pago o crédito"],
      ["acompanamiento", "Acompañamiento profesional"],
      ["no_errores", "No cometer errores"],
    ],
  },
  {
    id: "transicion_perfilamiento",
    type: "message",
    kicker: "Ya voy entendiendo mejor",
    title: ({ name }) => `Gracias, ${name}. Con esto ya puedo ubicar mejor tu situación.`,
    help:
      "Ahora te haré unas preguntas más específicas según lo que necesitas. Prometo hacerlo breve: la idea es no mandarte información al azar, sino darte seguimiento con intención.",
    cta: "Vamos",
  },
];

const routeQuestions = {
  comprar: [
    {
      id: "comprar_tipo",
      type: "choice",
      kicker: "Compra",
      title: "Para buscar bien, ¿qué tipo de propiedad te imaginas?",
      help: "Si todavía no lo tienes definido, no pasa nada. Podemos partir de una idea general.",
      required: true,
      options: [
        ["casa", "Casa"],
        ["departamento", "Departamento"],
        ["terreno", "Terreno"],
        ["local_oficina", "Local u oficina"],
        ["aun_no_se", "Aún no sé"],
      ],
    },
    {
      id: "comprar_zona",
      type: "textarea",
      kicker: "Zona",
      title: "¿Qué zonas te harían sentido?",
      help: "Puedes mencionar colonias, municipios, cercanía al trabajo, escuelas o cualquier referencia útil.",
      required: true,
      placeholder: "Ej. zona o colonia, municipio, cerca de mi trabajo...",
    },
    {
      id: "comprar_presupuesto",
      type: "choice",
      kicker: "Presupuesto",
      title: "¿Qué rango te gustaría cuidar para comprar con tranquilidad?",
      help: "No tiene que ser exacto. Me sirve para no proponerte opciones fuera de tu realidad.",
      required: true,
      options: [
        ["menos_1_5m", "Menos de $1.5 M"],
        ["1_5m_3m", "$1.5 M a $3 M"],
        ["3m_5m", "$3 M a $5 M"],
        ["5m_8m", "$5 M a $8 M"],
        ["mas_8m", "Más de $8 M"],
        ["por_definir", "Aún por definir"],
      ],
    },
    {
      id: "comprar_pago",
      type: "choice",
      kicker: "Forma de pago",
      title: "¿Ya tienes idea de cómo te gustaría financiar la compra?",
      help: "Esto ayuda a anticipar tiempos, requisitos y alternativas viables.",
      required: true,
      options: [
        ["credito_bancario", "Crédito hipotecario"],
        ["infonavit_fovissste", "Infonavit o Fovissste"],
        ["recursos_propios", "Recursos propios"],
        ["mixto", "Mixto"],
        ["necesito_orientacion", "Necesito orientación"],
      ],
    },
    {
      id: "comprar_tiempo",
      type: "choice",
      kicker: "Tiempo",
      title: "Si aparece una buena opción, ¿qué tan pronto te gustaría avanzar?",
      required: true,
      options: [
        ["0_3_meses", "0 a 3 meses"],
        ["3_6_meses", "3 a 6 meses"],
        ["6_12_meses", "6 a 12 meses"],
        ["sin_prisa", "Sin prisa, cuando encuentre lo ideal"],
      ],
    },
  ],
  vender: [
    {
      id: "vender_tipo",
      type: "choice",
      kicker: "Venta",
      title: "Cuéntame, ¿qué tipo de propiedad estás pensando vender?",
      required: true,
      options: [
        ["casa", "Casa"],
        ["departamento", "Departamento"],
        ["terreno", "Terreno"],
        ["local_oficina", "Local u oficina"],
        ["otro", "Otro"],
      ],
    },
    {
      id: "vender_ubicacion",
      type: "textarea",
      kicker: "Ubicación",
      title: "¿En qué zona o colonia se encuentra la propiedad?",
      help: "No necesito la dirección exacta todavía; con colonia y ciudad es suficiente para iniciar.",
      required: true,
      placeholder: "Ej. zona o colonia, municipio o ciudad",
    },
    {
      id: "vender_documentos",
      type: "choice",
      kicker: "Documentación",
      title: "¿Cómo sientes la parte de documentación?",
      help: "Esto me ayuda a detectar si conviene preparar algo antes de promoverla.",
      required: true,
      options: [
        ["en_regla", "Escrituras y pagos en regla"],
        ["credito_vigente", "Tiene crédito vigente"],
        ["requiere_revision", "Necesita revisión"],
        ["sucesion", "Hay sucesión o tema legal"],
        ["no_se", "No estoy seguro"],
      ],
    },
    {
      id: "vender_precio",
      type: "choice",
      kicker: "Precio",
      title: "¿Ya tienes una idea del precio o prefieres revisarlo conmigo?",
      required: true,
      options: [
        ["si", "Sí, ya tengo un precio"],
        ["aproximado", "Tengo una idea aproximada"],
        ["necesito_valuacion", "Necesito una opinión de valor"],
        ["quiero_validarlo", "Quiero validar si es competitivo"],
      ],
    },
    {
      id: "vender_tiempo",
      type: "choice",
      kicker: "Tiempo",
      title: "¿Qué tan pronto te gustaría vender si el proceso se ordena bien?",
      required: true,
      options: [
        ["urgente", "Lo antes posible"],
        ["1_3_meses", "En 1 a 3 meses"],
        ["3_6_meses", "En 3 a 6 meses"],
        ["sin_prisa", "Sin prisa, pero quiero prepararme"],
      ],
    },
  ],
  rentar: [
    {
      id: "rentar_tipo",
      type: "choice",
      kicker: "Renta",
      title: "Para orientarte mejor, ¿qué tipo de propiedad necesitas rentar?",
      required: true,
      options: [
        ["casa", "Casa"],
        ["departamento", "Departamento"],
        ["habitacion", "Habitación"],
        ["local_oficina", "Local u oficina"],
        ["otro", "Otro"],
      ],
    },
    {
      id: "rentar_zona",
      type: "textarea",
      kicker: "Zona",
      title: "¿Qué zona te funcionaría mejor para rentar?",
      help: "Puede ser por trabajo, escuela, movilidad, familia o estilo de vida.",
      required: true,
      placeholder: "Colonias, ciudad, cercanía a trabajo o escuela...",
    },
    {
      id: "rentar_presupuesto",
      type: "choice",
      kicker: "Presupuesto",
      title: "¿Qué presupuesto mensual te gustaría mantener cómodo?",
      required: true,
      options: [
        ["menos_10k", "Menos de $10,000"],
        ["10k_18k", "$10,000 a $18,000"],
        ["18k_30k", "$18,000 a $30,000"],
        ["30k_50k", "$30,000 a $50,000"],
        ["mas_50k", "Más de $50,000"],
        ["por_definir", "Aún por definir"],
      ],
    },
    {
      id: "rentar_necesidades",
      type: "textarea",
      kicker: "Necesidades",
      title: "¿Hay algo importante que deba cuidar al buscar opciones?",
      help: "Mascotas, estacionamiento, amenidades, amueblado, fiador, facturación o cualquier detalle relevante.",
      required: false,
      placeholder: "Comparte lo que deba cuidar al buscar opciones.",
    },
    {
      id: "rentar_tiempo",
      type: "choice",
      kicker: "Tiempo",
      title: "¿Cuándo te gustaría poder mudarte?",
      required: true,
      options: [
        ["inmediato", "De inmediato"],
        ["este_mes", "Este mes"],
        ["1_3_meses", "En 1 a 3 meses"],
        ["sin_fecha", "Aún no tengo fecha"],
      ],
    },
  ],
  poner_renta: [
    {
      id: "poner_renta_tipo",
      type: "choice",
      kicker: "Arrendamiento",
      title: "¿Qué tipo de propiedad quieres poner en renta?",
      help: "Con esto puedo pensar en el perfil de inquilino y estrategia de promoción adecuada.",
      required: true,
      options: [
        ["casa", "Casa"],
        ["departamento", "Departamento"],
        ["local_oficina", "Local u oficina"],
        ["bodega", "Bodega"],
        ["otro", "Otro"],
      ],
    },
    {
      id: "poner_renta_ubicacion",
      type: "textarea",
      kicker: "Ubicación",
      title: "¿En qué zona o colonia se encuentra la propiedad?",
      help: "No hace falta dirección exacta; una referencia general basta para empezar.",
      required: true,
      placeholder: "Zona o colonia, ciudad o referencia general",
    },
    {
      id: "poner_renta_estado",
      type: "choice",
      kicker: "Disponibilidad",
      title: "¿Cómo está actualmente la propiedad para recibir a un inquilino?",
      required: true,
      options: [
        ["lista", "Lista para rentarse"],
        ["ocupada", "Ocupada, se desocupa pronto"],
        ["requiere_arreglos", "Requiere algunos arreglos"],
        ["necesito_prepararla", "Necesito prepararla para renta"],
      ],
    },
    {
      id: "poner_renta_servicio",
      type: "choice",
      kicker: "Servicio",
      title: "¿Qué parte del proceso te gustaría que te ayude a resolver?",
      help: "Puede ser solo encontrar inquilino o acompañarte con una estrategia más completa.",
      required: true,
      options: [
        ["solo_colocacion", "Conseguir inquilino"],
        ["administracion", "Administración de renta"],
        ["precio_y_colocacion", "Definir precio y colocarla"],
        ["asesoria", "Asesoría completa"],
      ],
    },
    {
      id: "poner_renta_precio",
      type: "choice",
      kicker: "Renta estimada",
      title: "¿Ya tienes una renta mensual en mente?",
      required: true,
      options: [
        ["si", "Sí, ya tengo una renta estimada"],
        ["aproximada", "Tengo una idea aproximada"],
        ["no", "No, necesito estimarla"],
        ["quiero_validar", "Quiero validar el precio"],
      ],
    },
  ],
  invertir: [
    {
      id: "invertir_objetivo",
      type: "choice",
      kicker: "Inversión",
      title: "Para invertir con sentido, ¿qué resultado estás buscando?",
      help: "No todas las inversiones inmobiliarias persiguen lo mismo; por eso conviene partir de tu objetivo.",
      required: true,
      options: [
        ["plusvalia", "Plusvalía"],
        ["renta_mensual", "Ingreso por renta"],
        ["diversificar", "Diversificar patrimonio"],
        ["retiro", "Construir patrimonio a largo plazo"],
        ["no_se", "Quiero entender opciones"],
      ],
    },
    {
      id: "invertir_monto",
      type: "choice",
      kicker: "Capital",
      title: "¿Qué rango de inversión te gustaría analizar?",
      help: "Puede ser aproximado. Lo importante es ubicar oportunidades realistas.",
      required: true,
      options: [
        ["menos_1m", "Menos de $1 M"],
        ["1m_3m", "$1 M a $3 M"],
        ["3m_5m", "$3 M a $5 M"],
        ["5m_10m", "$5 M a $10 M"],
        ["mas_10m", "Más de $10 M"],
        ["por_definir", "Aún por definir"],
      ],
    },
    {
      id: "invertir_horizonte",
      type: "choice",
      kicker: "Horizonte",
      title: "¿En qué horizonte te gustaría ver resultados?",
      required: true,
      options: [
        ["corto", "Menos de 1 año"],
        ["medio", "1 a 3 años"],
        ["largo", "3 a 5 años"],
        ["patrimonial", "Más de 5 años"],
      ],
    },
    {
      id: "invertir_tipo",
      type: "choice",
      kicker: "Activo",
      title: "¿Qué tipo de oportunidad te llama más la atención?",
      required: true,
      options: [
        ["residencial", "Residencial"],
        ["terreno", "Terreno"],
        ["comercial", "Comercial"],
        ["preventas", "Preventas"],
        ["quiero_comparar", "Quiero comparar opciones"],
      ],
    },
    {
      id: "invertir_zona",
      type: "textarea",
      kicker: "Mercado",
      title: "¿Hay alguna ciudad o zona que quieras explorar?",
      help: "Si prefieres que yo te sugiera mercados, puedes dejarlo abierto.",
      required: false,
      placeholder: "Puedes dejarlo abierto o mencionar zonas de interés.",
    },
  ],
  valuacion: [
    {
      id: "valuacion_tipo",
      type: "choice",
      kicker: "Valor",
      title: "Para estimar mejor, ¿qué tipo de propiedad quieres valorar?",
      required: true,
      options: [
        ["casa", "Casa"],
        ["departamento", "Departamento"],
        ["terreno", "Terreno"],
        ["local_oficina", "Local u oficina"],
        ["otro", "Otro"],
      ],
    },
    {
      id: "valuacion_ubicacion",
      type: "textarea",
      kicker: "Ubicación",
      title: "¿En qué zona o colonia se encuentra la propiedad?",
      help: "La ubicación es clave para comparar con referencias reales de mercado.",
      required: true,
      placeholder: "Zona o colonia, ciudad y referencias generales",
    },
    {
      id: "valuacion_caracteristicas",
      type: "textarea",
      kicker: "Características",
      title: "¿Qué características principales recuerdas?",
      help: "Metros, recámaras, baños, estacionamientos, antigüedad o estado general. Lo que tengas a la mano sirve.",
      required: false,
      placeholder: "Ej. 90 m2, 2 recámaras, 2 baños, 1 estacionamiento...",
    },
    {
      id: "valuacion_motivo",
      type: "choice",
      kicker: "Motivo",
      title: "¿Para qué te gustaría conocer el valor?",
      help: "La orientación cambia si estás pensando vender, rentar, comparar o solo tener claridad.",
      required: true,
      options: [
        ["vender", "Estoy pensando vender"],
        ["rentar", "Quiero ponerla en renta"],
        ["herencia", "Herencia o tema familiar"],
        ["credito", "Crédito o trámite"],
        ["curiosidad", "Quiero tener claridad"],
      ],
    },
    {
      id: "valuacion_documentos",
      type: "choice",
      kicker: "Documentos",
      title: "¿Tienes documentos básicos a la mano?",
      help: "No es indispensable para esta primera orientación, pero ayuda a saber qué tan avanzado está el caso.",
      required: true,
      options: [
        ["si", "Sí"],
        ["parcial", "Algunos"],
        ["no", "No por ahora"],
        ["no_se", "No estoy seguro qué se necesita"],
      ],
    },
  ],
  orientacion: [
    {
      id: "orientacion_situacion",
      type: "textarea",
      kicker: "Contexto",
      title: "Cuéntame con tus palabras, ¿qué situación te trae por aquí?",
      help: "No tienes que usar términos técnicos. La idea es entender qué necesitas resolver.",
      required: true,
      placeholder: "Cuéntame brevemente qué estás pensando o qué necesitas resolver.",
    },
    {
      id: "orientacion_interes",
      type: "choice",
      kicker: "Dirección",
      title: "Por lo que me cuentas, ¿a qué se parece más tu necesidad?",
      required: true,
      options: [
        ["comprar", "Comprar"],
        ["vender", "Vender"],
        ["rentar", "Rentar"],
        ["invertir", "Invertir"],
        ["presupuesto", "Definir presupuesto"],
        ["no_se", "No estoy seguro"],
      ],
    },
    {
      id: "orientacion_preocupacion",
      type: "choice",
      kicker: "Preocupación",
      title: "¿Qué te preocupa más en este momento?",
      help: "Esto me ayuda a enfocar la asesoría en lo que realmente te daría tranquilidad.",
      required: true,
      options: [
        ["dinero", "Tomar una mala decisión financiera"],
        ["proceso", "No entender el proceso"],
        ["tiempo", "Perder tiempo"],
        ["seguridad", "Seguridad legal"],
        ["opciones", "No saber qué opciones hay"],
      ],
    },
    {
      id: "orientacion_tiempo",
      type: "choice",
      kicker: "Claridad",
      title: "¿Cuándo te gustaría tener más claridad para decidir?",
      required: true,
      options: [
        ["esta_semana", "Esta semana"],
        ["este_mes", "Este mes"],
        ["sin_prisa", "Sin prisa"],
        ["solo_explorando", "Solo estoy explorando"],
      ],
    },
  ],
};

const routeIntroductions = {
  comprar: {
    id: "intro_comprar",
    type: "message",
    kicker: "Compra",
    title: ({ name }) => `Perfecto, ${name}.`,
    help:
      "Comprar una propiedad puede emocionar, pero también puede generar dudas. Vamos a aterrizar zona, presupuesto y forma de pago para que tu búsqueda tenga más dirección.",
    cta: "Continuar",
  },
  vender: {
    id: "intro_vender",
    type: "message",
    kicker: "Venta",
    title: ({ name }) => `Entiendo, ${name}.`,
    help:
      "Vender una propiedad no debería ser solo ponerla en internet y esperar. Hay que cuidar el precio, la presentación y la estrategia para proteger tu patrimonio.",
    cta: "Continuar",
  },
  rentar: {
    id: "intro_rentar",
    type: "message",
    kicker: "Renta",
    title: ({ name }) => `Claro, ${name}.`,
    help:
      "Buscar renta puede volverse pesado si no hay claridad. Te haré unas preguntas para entender zona, presupuesto y detalles importantes para ti.",
    cta: "Continuar",
  },
  poner_renta: {
    id: "intro_poner_renta",
    type: "message",
    kicker: "Poner en renta",
    title: ({ name }) => `Muy bien, ${name}.`,
    help:
      "Rentar tu propiedad también implica cuidarla. La idea es buscar un buen perfil, definir una renta adecuada y hacerlo con orden.",
    cta: "Continuar",
  },
  invertir: {
    id: "intro_invertir",
    type: "message",
    kicker: "Inversión",
    title: ({ name }) => `Buena decisión, ${name}.`,
    help:
      "En inversión inmobiliaria no todo es comprar por comprar. Conviene revisar qué buscas: plusvalía, renta mensual, seguridad patrimonial o crecimiento.",
    cta: "Continuar",
  },
  valuacion: {
    id: "intro_valuacion",
    type: "message",
    kicker: "Valor de propiedad",
    title: ({ name }) => `Claro, ${name}.`,
    help:
      "Conocer el valor de una propiedad ayuda a tomar mejores decisiones. Vamos a revisar ubicación, características y motivo para darte una referencia con más sentido.",
    cta: "Continuar",
  },
  orientacion: {
    id: "intro_orientacion",
    type: "message",
    kicker: "Orientación",
    title: ({ name }) => `Te entiendo, ${name}.`,
    help:
      "A veces lo más difícil es saber por dónde empezar. Vamos a ordenar tus dudas para que tengas un primer mapa claro y puedas decidir con más tranquilidad.",
    cta: "Continuar",
  },
};

const contactQuestions = [
  {
    id: "whatsapp",
    type: "text",
    inputType: "tel",
    kicker: "Contacto",
    title: ({ name }) => `${name}, ¿a qué WhatsApp puedo darte seguimiento?`,
    summaryTitle: "WhatsApp",
    help: "Ya con tus respuestas, este dato me sirve para contactarte sin que tengas que repetir todo.",
    required: true,
    placeholder: "Ej. 55 1234 5678",
    autocomplete: "tel",
  },
  {
    id: "ciudad",
    type: "text",
    inputType: "text",
    kicker: "Ciudad",
    title: "¿En qué ciudad te encuentras?",
    help: "Esto me ayuda a darte una orientación más aterrizada a tu zona.",
    required: true,
    placeholder: "Ciudad y estado",
    autocomplete: "address-level2",
  },
  {
    id: "correo",
    type: "text",
    inputType: "email",
    kicker: "Correo",
    title: "¿Quieres dejar un correo electrónico?",
    help: "Es opcional. Puede servir si después necesitas información más detallada.",
    required: false,
    placeholder: "tu@correo.com",
    autocomplete: "email",
  },
  {
    id: "medio_contacto",
    type: "choice",
    kicker: "Seguimiento",
    title: "¿Cómo prefieres que te contacte primero?",
    help: "La idea es dar seguimiento por el medio que te resulte más cómodo.",
    required: true,
    options: [
      ["whatsapp", "WhatsApp"],
      ["llamada", "Llamada"],
      ["correo", "Correo electrónico"],
      ["cualquiera", "El que sea más práctico"],
    ],
  },
  {
    id: "horario_contacto",
    type: "choice",
    kicker: "Horario",
    title: ({ name }) => `Por último, ${name}, ¿en qué horario prefieres que te contacte?`,
    summaryTitle: "Horario preferido de contacto",
    help: "Así puedo buscarte en un momento más conveniente para ti.",
    required: true,
    options: [
      ["manana", "Mañana"],
      ["mediodia", "Mediodía"],
      ["tarde", "Tarde"],
      ["noche", "Noche"],
      ["flexible", "Horario flexible"],
    ],
  },
  {
    id: "consentimiento",
    type: "checkbox",
    kicker: "Consentimiento",
    title: "Antes de terminar",
    required: true,
  },
];

const answers = {};
let currentIndex = 0;
let isFinished = false;
let formStartedAt = 0;
let whatsappUnlockAt = 0;

const form = document.querySelector("#advisoryForm");
const honeypotField = form.querySelector('input[name="website"]');
const questionMount = document.querySelector("#questionMount");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const formError = document.querySelector("#formError");
const progressBar = document.querySelector("#progressBar");
const progressLabel = document.querySelector("#progressLabel");
const progressPercent = document.querySelector("#progressPercent");
const finishScreen = document.querySelector("#finishScreen");
const finishTitle = document.querySelector("#finish-title");
const finishMessage = document.querySelector("#finishMessage");
const sendWhatsappButton = document.querySelector("#sendWhatsappButton");

const allRouteQuestionIds = Object.values(routeQuestions)
  .flat()
  .map((question) => question.id);

function getFlow() {
  const selectedObjective = answers.objetivo?.value;
  const route = selectedObjective ? routeQuestions[selectedObjective] || [] : [];
  const routeIntro = selectedObjective && routeIntroductions[selectedObjective]
    ? [routeIntroductions[selectedObjective]]
    : [];
  return [...baseQuestions, ...routeIntro, ...route, ...contactQuestions];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeText(value, maxLength = OPEN_FIELD_MAX_LENGTH) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function hasSuspiciousMarkup(value) {
  return /<[^>]+>|javascript\s*:|\bon\w+\s*=/i.test(String(value || ""));
}

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+ -]/g, "").replace(/\s+/g, " ").trim();
}

function getPhoneDigits(value) {
  return normalizePhone(value).replace(/\D/g, "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function isLikelyBot() {
  return Boolean(honeypotField && honeypotField.value.trim());
}

function markFormStarted() {
  if (!formStartedAt) {
    formStartedAt = Date.now();
  }
}

function getMaxLengthForQuestion(question) {
  if (question.type === "textarea") {
    return OPEN_FIELD_MAX_LENGTH;
  }

  if (question.id === "nombre") {
    return 80;
  }

  if (question.id === "ciudad") {
    return 100;
  }

  if (question.id === "correo") {
    return 120;
  }

  if (question.id === "whatsapp") {
    return 30;
  }

  return OPEN_FIELD_MAX_LENGTH;
}

function createNode(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function optionToObject(option) {
  return { value: option[0], label: option[1] };
}

function getFirstName() {
  const rawName = answers.nombre?.label || answers.nombre?.value || "";
  const firstName = rawName.trim().split(/\s+/)[0];
  return firstName || "gracias";
}

function formatCopy(copy) {
  if (typeof copy === "function") {
    return copy({ name: getFirstName() });
  }

  return copy || "";
}

function getQuestionLabel(question) {
  return formatCopy(question.summaryTitle || question.title);
}

function renderQuestion() {
  isFinished = false;
  const flow = getFlow();
  const question = flow[currentIndex];

  if (!question) {
    showFinish();
    return;
  }

  finishScreen.hidden = true;
  form.hidden = false;
  formError.hidden = true;
  formError.textContent = "";
  nextButton.textContent =
    question.cta || (currentIndex === flow.length - 1 ? "Terminar asesoría" : "Continuar");
  backButton.hidden = currentIndex === 0;

  const title = formatCopy(question.title);
  const helpText = formatCopy(question.help);
  clearNode(questionMount);

  questionMount.appendChild(
    createNode("p", "question-kicker", formatCopy(question.kicker) || "Asesoría")
  );

  const titleNode = createNode("h3", "question-title", title);
  titleNode.tabIndex = -1;
  questionMount.appendChild(titleNode);

  if (helpText) {
    questionMount.appendChild(createNode("p", "question-help", helpText));
  }

  questionMount.appendChild(renderControl(question));

  updateProgress();

  titleNode.focus({ preventScroll: true });
}

function renderControl(question) {
  const saved = answers[question.id];
  const fragment = document.createDocumentFragment();

  if (question.type === "message") {
    return fragment;
  }

  if (question.type === "choice") {
    const fieldset = createNode("fieldset", "choices");
    const grid = createNode("div", "choices-grid");

    question.options.forEach((option) => {
      const item = optionToObject(option);
      const label = createNode("label", "choice-control");
      const input = document.createElement("input");
      const text = createNode("span", "", item.label);

      input.type = "radio";
      input.name = question.id;
      input.value = item.value;
      input.checked = saved?.value === item.value;

      label.append(input, text);
      grid.appendChild(label);
    });

    fieldset.appendChild(grid);
    return fieldset;
  }

  if (question.type === "textarea") {
    const note = createNode("p", "open-field-note", SECURITY_NOTE);
    const textarea = document.createElement("textarea");
    textarea.className = "field-control";
    textarea.name = question.id;
    textarea.placeholder = question.placeholder || "";
    textarea.required = Boolean(question.required);
    textarea.maxLength = OPEN_FIELD_MAX_LENGTH;
    textarea.value = saved?.value || "";
    fragment.append(note, textarea);
    return fragment;
  }

  if (question.type === "checkbox") {
    const checked = saved?.value === true;
    const label = createNode("label", "checkbox-control");
    const input = document.createElement("input");
    const text = document.createElement("span");

    input.type = "checkbox";
    input.name = question.id;
    input.checked = checked;

    if (question.id === "consentimiento") {
      text.append(
        document.createTextNode(
          "Acepto que Erick Ehecatl Carro Milian, asesor inmobiliario vinculado con Century 21 Edyfico, me contacte por los medios proporcionados para dar seguimiento a mi solicitud inmobiliaria. He leído y acepto el "
        )
      );
      const link = document.createElement("a");
      link.href = "aviso-privacidad.html";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Aviso de Privacidad";
      text.append(link, document.createTextNode("."));
    } else {
      text.textContent = question.label || "";
    }

    label.append(input, text);
    return label;
  }

  const input = document.createElement("input");
  input.className = "field-control";
  input.type = question.inputType || "text";
  input.name = question.id;
  input.value = saved?.value || "";
  input.placeholder = question.placeholder || "";
  input.autocomplete = question.autocomplete || "off";
  input.required = Boolean(question.required);
  input.maxLength = getMaxLengthForQuestion(question);

  if (question.inputType === "tel") {
    input.inputMode = "tel";
  }

  return input;
}

function updateProgress() {
  const flow = getFlow();
  const percent = flow.length ? Math.round((currentIndex / flow.length) * 100) : 100;
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `Paso ${Math.min(currentIndex + 1, flow.length)} de ${flow.length}`;
  progressPercent.textContent = `${percent}%`;
}

function showError(message) {
  if (isFinished || form.hidden) {
    finishMessage.textContent = message;
    return;
  }

  formError.textContent = message;
  formError.hidden = false;
}

function validateSafeText(value, question) {
  const maxLength = getMaxLengthForQuestion(question);
  const cleaned = sanitizeText(value, maxLength);

  if (sanitizeText(value, maxLength + 1).length > maxLength) {
    return {
      isValid: false,
      message:
        question.type === "textarea"
          ? `Para cuidarlo mejor, mantén esta respuesta en máximo ${maxLength} caracteres.`
          : `Este dato debe tener máximo ${maxLength} caracteres.`,
    };
  }

  if (hasSuspiciousMarkup(value)) {
    return {
      isValid: false,
      message: "Por seguridad, escribe la información como texto simple, sin etiquetas o código.",
    };
  }

  if (question.required && !cleaned) {
    return {
      isValid: false,
      message:
        question.id === "nombre"
          ? "Compárteme tu nombre para poder hablarte de forma más personal."
          : "Compárteme este dato para continuar.",
    };
  }

  if (question.id === "nombre") {
    if (cleaned.length < 2) {
      return { isValid: false, message: "Tu nombre debe tener al menos 2 caracteres." };
    }

    if (/^[\d\s]+$/.test(cleaned)) {
      return { isValid: false, message: "Escribe tu nombre con letras, por favor." };
    }
  }

  if (question.id === "ciudad") {
    if (cleaned.length < 2) {
      return { isValid: false, message: "Compárteme tu ciudad o zona para orientarte mejor." };
    }
  }

  if (question.inputType === "email" && cleaned && !isValidEmail(cleaned)) {
    return {
      isValid: false,
      message: "Escribe un correo electrónico válido o deja el campo vacío.",
    };
  }

  return { isValid: true, value: cleaned };
}

function getFirstMissingRequiredIndex() {
  return getFlow().findIndex((question) => {
    if (!question.required || question.type === "message") {
      return false;
    }

    const answer = answers[question.id];
    if (question.type === "checkbox") {
      return answer?.value !== true;
    }

    return !answer || !String(answer.value || "").trim();
  });
}

function canSubmit() {
  if (isLikelyBot()) {
    return false;
  }

  const firstMissingIndex = getFirstMissingRequiredIndex();
  if (firstMissingIndex >= 0) {
    currentIndex = firstMissingIndex;
    renderQuestion();
    showError("Revisa esta respuesta para poder continuar con seguridad.");
    return false;
  }

  const elapsedSeconds = formStartedAt ? (Date.now() - formStartedAt) / 1000 : 0;
  if (elapsedSeconds < MIN_FORM_SECONDS) {
    showError(
      "Parece que el formulario se completó demasiado rápido. Por seguridad, revisa tus respuestas antes de continuar."
    );
    return false;
  }

  return true;
}

function validateAndStore(question) {
  markFormStarted();

  if (isLikelyBot()) {
    return false;
  }

  if (question.type === "message") {
    return true;
  }

  if (question.type === "choice") {
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    if (!checked) {
      showError("Elige la opción que más se acerque a tu caso para poder orientarte mejor.");
      return false;
    }

    const selected = question.options.map(optionToObject).find((item) => item.value === checked.value);
    const previousObjective = answers.objetivo?.value;

    answers[question.id] = selected;

    if (question.id === "objetivo" && previousObjective && previousObjective !== selected.value) {
      clearRouteAnswers();
    }

    return true;
  }

  if (question.type === "checkbox") {
    const checked = form.querySelector(`input[name="${question.id}"]`).checked;
    if (question.required && !checked) {
      showError("Necesito tu consentimiento para poder dar seguimiento a tu solicitud.");
      return false;
    }

    answers[question.id] = {
      value: checked,
      label: checked ? "Aceptado" : "No aceptado",
    };
    return true;
  }

  const field = form.querySelector(`[name="${question.id}"]`);
  const rawValue = field.value;

  if (question.inputType === "tel") {
    const normalized = normalizePhone(rawValue);
    const digits = getPhoneDigits(normalized);
    if (digits.length < 10 || digits.length > 15) {
      showError("Compárteme un número de WhatsApp válido para poder contactarte.");
      field.focus();
      return false;
    }

    answers[question.id] = {
      value: digits,
      label: digits,
    };
    return true;
  }

  const validation = validateSafeText(rawValue, question);
  if (!validation.isValid) {
    showError(validation.message);
    field.focus();
    return false;
  }

  answers[question.id] = {
    value: validation.value,
    label: validation.value || "No proporcionado",
  };

  return true;
}

function clearRouteAnswers() {
  allRouteQuestionIds.forEach((id) => {
    delete answers[id];
  });
}

function showFinish() {
  const firstMissingIndex = getFirstMissingRequiredIndex();
  if (firstMissingIndex >= 0) {
    currentIndex = firstMissingIndex;
    renderQuestion();
    showError("Revisa esta respuesta para poder continuar con seguridad.");
    return;
  }

  isFinished = true;
  form.hidden = true;
  finishScreen.hidden = false;
  finishTitle.textContent = `Gracias, ${getFirstName()}. Ya tengo una idea más clara de lo que necesitas.`;
  finishMessage.textContent = FINISH_DEFAULT_MESSAGE;
  progressBar.style.width = "100%";
  progressLabel.textContent = "Solicitud completa";
  progressPercent.textContent = "100%";
  finishScreen.scrollIntoView({ behavior: "smooth", block: "center" });
}

function buildWhatsappUrl(message) {
  const phone = WHATSAPP_DESTINO.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function buildWhatsappMessage() {
  const name = sanitizeText(answers.nombre?.label || "", 80) || "prospecto";
  const objective = answers.objetivo?.value;
  const wantsToMoveSoon =
    answers.etapa?.value === "avanzar_pronto" || answers.vender_tiempo?.value === "urgente";

  if (objective === "vender" && wantsToMoveSoon) {
    return `Hola Ehecatl, soy ${name}. Acabo de responder el diagnóstico de mi propiedad y me gustaría agendar una llamada para revisar cómo venderla lo antes posible.`;
  }

  const messages = {
    vender: `Hola Ehecatl, soy ${name}. Acabo de responder el diagnóstico de mi propiedad y me gustaría que me ayudes a revisar la mejor estrategia para venderla.`,
    poner_renta: `Hola Ehecatl, soy ${name}. Acabo de responder el diagnóstico de mi propiedad y me gustaría revisar cómo ponerla en renta de forma segura.`,
    comprar: `Hola Ehecatl, soy ${name}. Acabo de responder tu asesoría y me gustaría revisar opciones para comprar con más claridad.`,
    rentar: `Hola Ehecatl, soy ${name}. Acabo de responder tu asesoría y me gustaría revisar opciones de renta.`,
    invertir: `Hola Ehecatl, soy ${name}. Acabo de responder tu asesoría y me gustaría revisar alternativas de inversión inmobiliaria.`,
    valuacion: `Hola Ehecatl, soy ${name}. Acabo de responder el diagnóstico de mi propiedad y me gustaría revisar su valor aproximado.`,
    orientacion: `Hola Ehecatl, soy ${name}. Acabo de responder tu asesoría y me gustaría que me ayudes a ordenar mi caso.`,
  };

  return (
    messages[objective] ||
    `Hola Ehecatl, soy ${name}. Acabo de responder tu formulario de asesoría inmobiliaria. Me gustaría que me ayudes a revisar mi caso.`
  );
}

function openWhatsappWithMessage(message) {
  window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
}

function openQuickWhatsapp() {
  openWhatsappWithMessage(
    "Hola Ehecatl, me gustaría recibir asesoría inmobiliaria inicial."
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  markFormStarted();
  const flow = getFlow();
  const question = flow[currentIndex];

  if (!validateAndStore(question)) {
    return;
  }

  currentIndex += 1;

  if (currentIndex >= getFlow().length) {
    showFinish();
    return;
  }

  renderQuestion();
});

form.addEventListener("focusin", markFormStarted);
form.addEventListener("input", markFormStarted);

backButton.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  renderQuestion();
});

sendWhatsappButton.addEventListener("click", () => {
  const now = Date.now();
  if (now < whatsappUnlockAt || !canSubmit()) {
    return;
  }

  whatsappUnlockAt = now + WHATSAPP_SEND_LOCK_MS;
  sendWhatsappButton.disabled = true;
  sendWhatsappButton.textContent = "Abriendo WhatsApp...";
  finishMessage.textContent = FINISH_DEFAULT_MESSAGE;
  openWhatsappWithMessage(buildWhatsappMessage());
  window.setTimeout(() => {
    sendWhatsappButton.disabled = false;
    sendWhatsappButton.textContent = "Enviar por WhatsApp";
  }, WHATSAPP_SEND_LOCK_MS);
});

document.querySelectorAll("[data-whatsapp-quick]").forEach((button) => {
  button.addEventListener("click", openQuickWhatsapp);
});

document.querySelector('a[href="#asesoria"]').addEventListener("click", () => {
  window.setTimeout(() => {
    const title = questionMount.querySelector(".question-title");
    title?.focus({ preventScroll: true });
  }, 350);
});

renderQuestion();
