const WHATSAPP_DESTINO = "5214439484031";
const MAX_VISIBLE_STEPS = 12;
const MIN_FORM_SECONDS = 6;
const WHATSAPP_SEND_LOCK_MS = 8000;
const OPEN_FIELD_MAX_LENGTH = 500;
const MAX_MULTI_SELECT = 3;
const SECURITY_NOTE =
  "Por seguridad, no compartas documentos, contraseñas ni datos bancarios en este formulario. Si hace falta revisar algo específico, lo vemos después por un medio adecuado.";
const FINISH_DEFAULT_MESSAGE =
  "Revisaré tus respuestas y me pondré en contacto contigo para orientarte según tu objetivo inmobiliario.";
const PRIVACY_CONSENT_TEXT = "He leído y acepto el Aviso de Privacidad.";
const PROPERTY_DATA_URL = "data/properties.json";
const FULL_INVENTORY_URL =
  "https://century21mexico.com/busqueda/oficina_632-century-21-edyfico_local";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const PROPERTY_OPTIONS = [
  ["casa", "Casa"],
  ["departamento", "Departamento"],
  ["terreno", "Terreno"],
  ["local_oficina", "Local u oficina"],
  ["otro", "Otro"],
];

const TERRAIN_STATUS_OPTIONS = [
  ["privada_escriturada", "Propiedad privada escriturada"],
  ["ejidal", "Ejidal"],
  ["comunal", "Comunal"],
  ["posesion", "Posesión"],
  ["cesion_derechos", "Cesión de derechos"],
  ["certificado_parcelario", "Certificado parcelario"],
  ["dominio_pleno", "Dominio pleno"],
  ["no_se", "No estoy seguro"],
];

const HOME_NEEDS_OPTIONS = [
  ["seguridad", "Seguridad en la operación"],
  ["ubicacion", "Buena ubicación"],
  ["precio_justo", "Precio justo"],
  ["plusvalia", "Plusvalía"],
  ["rapidez", "Rapidez"],
  ["credito", "Facilidad de pago o crédito"],
  ["acompanamiento", "Acompañamiento profesional"],
  ["no_errores", "No cometer errores"],
];

const CREDIT_STATUS_OPTIONS = [
  ["credito_bancario_preaprobado", "Crédito bancario preaprobado"],
  ["precalificacion_infonavit", "Precalificación Infonavit"],
  ["precalificacion_fovissste", "Precalificación Fovissste"],
  ["simulacion_hecha", "Simulación hecha"],
  ["tramite_iniciado", "Trámite iniciado"],
  ["necesito_orientacion", "Necesito orientación"],
  ["no_se_si_califico", "No sé si califico"],
  ["recursos_propios", "Recursos propios"],
];

const FINANCING_SCORE = {
  recursos_propios: 30,
  credito_bancario_preaprobado: 25,
  precalificacion_infonavit: 22,
  precalificacion_fovissste: 22,
  simulacion_hecha: 14,
  tramite_iniciado: 12,
  necesito_orientacion: 8,
  no_se_si_califico: 4,
};

const STAGE_OPTIONS = [
  ["explorando", "Apenas estoy explorando"],
  ["idea_clara", "Ya tengo una idea clara"],
  ["avanzar_pronto", "Quiero avanzar pronto"],
  ["comparar", "Necesito comparar opciones"],
  ["asesoria_antes", "Necesito asesoría antes de decidir"],
];

const PROPERTY_CONDITION_OPTIONS = [
  ["excelente", "Excelente"],
  ["bueno", "Bueno"],
  ["mantenimiento", "Requiere mantenimiento menor"],
  ["remodelacion", "Requiere remodelación"],
  ["no_se", "No estoy seguro"],
];

const OCCUPANCY_OPTIONS = [
  ["desocupada", "Desocupada"],
  ["habitada", "Habitada por propietario"],
  ["rentada", "Rentada actualmente"],
  ["se_desocupa_pronto", "Se desocupa pronto"],
  ["no_se", "No estoy seguro"],
];

const PRICE_BASIS_OPTIONS = [
  ["comparables", "Lo comparé con propiedades similares"],
  ["inversion", "Me basé en lo que invertí"],
  ["sugerencia", "Me lo sugirió alguien"],
  ["internet", "Lo vi en internet"],
  ["deseado", "Es lo que me gustaría recibir"],
  ["no_seguro", "No estoy completamente seguro"],
];

const UNCLEAR_PRICE_BASIS = new Set(["inversion", "sugerencia", "deseado", "no_seguro"]);
const NAME_TITLE_PATTERN =
  /^(sr|sra|srta|dr|dra|lic|ing|arq|mtro|prof)\.?\s+|^(don|doña)\s+/i;
const LEAD_QUALITY = {
  USEFUL: "useful",
  CURIOUS: "curious",
  SUSPICIOUS: "suspicious",
  PROBABLE_BOT: "probable_bot",
};
const LEAD_QUALITY_LABELS = {
  useful: "Lead útil",
  curious: "Curioso",
  suspicious: "Sospechoso",
  probable_bot: "Probable bot",
};
const IMPOSSIBLE_FORM_SECONDS = 4;
const VERY_FAST_FORM_SECONDS = 8;
const CURIOUS_TIME_VALUES = new Set([
  "explorando",
  "sin_prisa",
  "sin_fecha",
  "solo_explorando",
  "6_12_meses",
  "largo",
  "patrimonial",
]);
const SUSPICIOUS_TEXT_PATTERN =
  /\b(test|asdf|qwerty|lorem|ipsum|fake|prueba|xxx|aaaa|bbbb|n\/a|na)\b/i;
const HIGH_RISK_LAND_STATUS = new Set([
  "ejidal",
  "comunal",
  "posesion",
  "cesion_derechos",
  "certificado_parcelario",
  "no_se",
]);

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
    id: "saludo_inicial",
    type: "message",
    kicker: "Gracias",
    title: ({ name }) => `Hola, ${name}. No te quito mucho tiempo.`,
    help:
      "Solo te haré unas preguntas rápidas para entender mejor cómo puedo ayudarte.",
  },
  {
    id: "objetivo",
    type: "choice",
    kicker: "Primer paso",
    title: "¿Qué te gustaría resolver hoy?",
    summaryTitle: "¿Qué te gustaría resolver hoy?",
    help:
      "Elige lo que más se acerque a tu situación. A partir de eso solo te preguntaré lo necesario.",
    required: true,
    options: [
      ["comprar", "Comprar una propiedad"],
      ["vender", "Vender una propiedad"],
      ["rentar", "Rentar una propiedad"],
      ["poner_renta", "Poner en renta una propiedad"],
      ["valuacion", "Saber cuánto vale mi propiedad"],
      ["invertir", "Invertir en bienes raíces"],
      ["orientacion", "No sé por dónde empezar"],
    ],
  },
];

const routeQuestions = {
  comprar: [
    {
      id: "comprar_inicio",
      type: "group",
      kicker: "Compra",
      title: "Para buscar bien, dime qué propiedad y zona tienes en mente.",
      help: "Si todavía no lo tienes definido, no pasa nada. Podemos partir de una idea general.",
      fields: [
        { id: "comprar_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["casa", "Casa"], ["departamento", "Departamento"], ["terreno", "Terreno"], ["local_oficina", "Local u oficina"], ["aun_no_se", "Aún no sé"]] },
        { id: "comprar_zona", type: "textarea", label: "Zonas que te harían sentido", required: true, placeholder: "Ej. zona o colonia, municipio, cerca de mi trabajo..." },
      ],
    },
    {
      id: "comprar_datos_clave",
      type: "group",
      kicker: "Datos clave",
      title: "Aterricemos lo básico de la propiedad.",
      help: "Solo lo necesario para no mandarte opciones que no van contigo.",
      fields: [
        { id: "comprar_recamaras", type: "choice", label: "Recámaras", required: true, showIf: { id: "comprar_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3", "3"], ["4_mas", "4 o más"], ["flexible", "Flexible"]] },
        { id: "comprar_banos", type: "choice", label: "Baños", required: true, showIf: { id: "comprar_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3_mas", "3 o más"], ["flexible", "Flexible"]] },
        { id: "comprar_estacionamiento", type: "choice", label: "Estacionamiento", required: true, showIf: { id: "comprar_tipo", values: ["casa", "departamento"] }, options: [["0", "No necesito"], ["1", "1"], ["2_mas", "2 o más"], ["flexible", "Flexible"]] },
        { id: "comprar_tamano", type: "text", label: "Tamaño aproximado", placeholder: "Ej. 90 m2 o flexible", required: false, showIf: { id: "comprar_tipo", values: ["casa", "departamento"] } },
        { id: "comprar_terreno_superficie", type: "text", label: "Superficie aproximada", placeholder: "Ej. 300 m2, 1 hectárea", required: true, showIf: { id: "comprar_tipo", values: ["terreno"] } },
        { id: "comprar_terreno_situacion", type: "choice", label: "Situación legal o régimen", required: true, showIf: { id: "comprar_tipo", values: ["terreno"] }, options: TERRAIN_STATUS_OPTIONS },
        { id: "comprar_terreno_uso", type: "choice", label: "Uso pensado", required: true, showIf: { id: "comprar_tipo", values: ["terreno"] }, options: [["habitar", "Construir para habitar"], ["inversion", "Inversión"], ["comercial", "Uso comercial"], ["desarrollo", "Desarrollo"], ["no_se", "No estoy seguro"]] },
        { id: "comprar_terreno_servicios", type: "multichoice", label: "Acceso y servicios", required: true, max: 3, statePath: "landDetails.topNeeds", showIf: { id: "comprar_tipo", values: ["terreno"] }, options: [["acceso", "Acceso claro"], ["agua", "Agua"], ["luz", "Luz"], ["drenaje", "Drenaje"], ["sin_servicios", "Sin servicios"], ["no_se", "No estoy seguro"]] },
      ],
    },
    {
      id: "comprar_finanzas",
      type: "group",
      kicker: "Presupuesto",
      title: "Hablemos de rango y forma de pago.",
      help: "No tiene que ser exacto; me sirve para ubicar opciones realistas.",
      fields: [
        { id: "comprar_presupuesto", type: "choice", label: "Presupuesto aproximado", required: true, options: [["menos_1_5m", "Menos de $1.5 M"], ["1_5m_3m", "$1.5 M a $3 M"], ["3m_5m", "$3 M a $5 M"], ["5m_8m", "$5 M a $8 M"], ["mas_8m", "Más de $8 M"], ["por_definir", "Aún por definir"]] },
        { id: "comprar_pago", type: "choice", label: "Forma de pago", required: true, options: [["credito_bancario", "Crédito hipotecario"], ["infonavit_fovissste", "Infonavit o Fovissste"], ["recursos_propios", "Recursos propios"], ["mixto", "Mixto"], ["necesito_orientacion", "Necesito orientación"]] },
        { id: "comprar_credito_estado", type: "choice", label: "¿Ya tienes alguna preaprobación o precalificación de crédito?", required: true, showIf: { id: "comprar_pago", values: ["credito_bancario", "infonavit_fovissste", "mixto", "necesito_orientacion"] }, options: CREDIT_STATUS_OPTIONS },
      ],
    },
    {
      id: "comprar_tiempo_necesidades",
      type: "group",
      kicker: "Tiempo",
      title: "¿Qué debe cuidar tu búsqueda?",
      help: "Elige hasta 3 prioridades para enfocar mejor las opciones.",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "comprar_tiempo", type: "choice", label: "Tiempo para comprar", required: true, options: [["0_3_meses", "0 a 3 meses"], ["3_6_meses", "3 a 6 meses"], ["6_12_meses", "6 a 12 meses"], ["sin_prisa", "Sin prisa, cuando encuentre lo ideal"]] },
        { id: "comprar_necesidades", type: "multichoice", label: "Top necesidades", required: true, max: 3, statePath: "buyDetails.topNeeds", options: HOME_NEEDS_OPTIONS },
      ],
    },
  ],
  vender: [
    {
      id: "vender_inicio",
      type: "group",
      kicker: "Venta",
      title: "Cuéntame qué propiedad quieres vender y dónde está.",
      help: "No necesito la dirección exacta todavía; con colonia y ciudad es suficiente para iniciar.",
      fields: [
        { id: "vender_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["casa", "Casa"], ["departamento", "Departamento"], ["terreno", "Terreno"], ["local_oficina", "Local u oficina"], ["otro", "Otro"]] },
        { id: "vender_zona", type: "textarea", label: "Zona o colonia", required: true, placeholder: "Ej. zona o colonia, municipio o ciudad" },
      ],
    },
    {
      id: "vender_datos_clave",
      type: "group",
      kicker: "Datos clave",
      title: "Cuéntame lo básico del inmueble.",
      fields: [
        { id: "vender_recamaras", type: "choice", label: "Recámaras", required: true, showIf: { id: "vender_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3", "3"], ["4_mas", "4 o más"], ["no_aplica", "No aplica"]] },
        { id: "vender_banos", type: "choice", label: "Baños", required: true, showIf: { id: "vender_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3_mas", "3 o más"], ["no_se", "No estoy seguro"]] },
        { id: "vender_estacionamiento", type: "choice", label: "Estacionamiento", required: true, showIf: { id: "vender_tipo", values: ["casa", "departamento"] }, options: [["0", "No tiene"], ["1", "1"], ["2_mas", "2 o más"], ["no_se", "No estoy seguro"]] },
        { id: "vender_tamano", type: "text", label: "Tamaño aproximado", placeholder: "Ej. 120 m2", required: false, showIf: { id: "vender_tipo", values: ["casa", "departamento", "local_oficina", "otro"] } },
        { id: "vender_terreno_superficie", type: "text", label: "Superficie aproximada", placeholder: "Ej. 300 m2, 1 hectárea", required: true, showIf: { id: "vender_tipo", values: ["terreno"] } },
        { id: "vender_terreno_situacion", type: "choice", label: "Situación legal o régimen", required: true, showIf: { id: "vender_tipo", values: ["terreno"] }, options: TERRAIN_STATUS_OPTIONS },
        { id: "vender_terreno_uso", type: "choice", label: "Uso actual o pensado", required: true, showIf: { id: "vender_tipo", values: ["terreno"] }, options: [["habitacional", "Habitacional"], ["comercial", "Comercial"], ["agricola", "Agrícola"], ["inversion", "Inversión"], ["no_se", "No estoy seguro"]] },
        { id: "vender_terreno_servicios", type: "multichoice", label: "Acceso y servicios", required: true, max: 3, statePath: "landDetails.topNeeds", showIf: { id: "vender_tipo", values: ["terreno"] }, options: [["acceso", "Acceso claro"], ["agua", "Agua"], ["luz", "Luz"], ["drenaje", "Drenaje"], ["sin_servicios", "Sin servicios"], ["no_se", "No estoy seguro"]] },
      ],
    },
    {
      id: "vender_estado_ocupacion",
      type: "group",
      kicker: "Estado",
      title: "¿Cómo está hoy la propiedad?",
      fields: [
        { id: "vender_estado", type: "choice", label: "Estado general", required: true, options: PROPERTY_CONDITION_OPTIONS },
        { id: "vender_ocupacion", type: "choice", label: "Ocupación", required: true, options: OCCUPANCY_OPTIONS },
      ],
    },
    {
      id: "vender_precio_pantalla",
      type: "group",
      kicker: "Precio",
      title: "Si ya tienes un precio en mente, lo revisamos con cuidado.",
      help: "Tener un precio en mente es un buen inicio, pero conviene validarlo con mercado para evitar que la propiedad se estanque o se castigue su valor.",
      fields: [
        { id: "vender_precio", type: "choice", label: "Precio en mente", required: true, options: [["si", "Sí, ya tengo un precio"], ["aproximado", "Tengo una idea aproximada"], ["necesito_valuacion", "Necesito una opinión de valor"], ["quiero_validarlo", "Quiero validar si es competitivo"]] },
        { id: "vender_precio_base", type: "choice", label: "¿Cómo definiste ese precio?", required: true, options: PRICE_BASIS_OPTIONS },
      ],
    },
    {
      id: "vender_contexto",
      type: "group",
      kicker: "Tiempo",
      title: "Para cuidar la estrategia, falta este contexto.",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "vender_documentos", type: "choice", label: "Documentación declarada", required: true, options: [["en_regla", "Escrituras y pagos en regla"], ["credito_vigente", "Tiene crédito vigente"], ["requiere_revision", "Necesita revisión"], ["sucesion", "Hay sucesión o tema legal"], ["no_se", "No estoy seguro"]] },
        { id: "vender_tiempo", type: "choice", label: "Urgencia", required: true, options: [["urgente", "Lo antes posible"], ["1_3_meses", "En 1 a 3 meses"], ["3_6_meses", "En 3 a 6 meses"], ["sin_prisa", "Sin prisa, pero quiero prepararme"]] },
        { id: "vender_motivo", type: "choice", label: "Motivo principal", required: true, options: [["cambio_casa", "Cambio de casa"], ["liquidez", "Necesito liquidez"], ["inversion", "Mover inversión"], ["herencia", "Herencia o tema familiar"], ["otro", "Otro"]] },
        { id: "vender_disposicion", type: "choice", label: "¿Te gustaría llamada o cita?", required: true, options: [["llamada", "Llamada"], ["cita", "Cita"], ["whatsapp", "Primero WhatsApp"], ["flexible", "Lo revisamos"]] },
      ],
    },
  ],
  rentar: [
    {
      id: "rentar_inicio",
      type: "group",
      kicker: "Renta",
      title: "Para orientarte mejor, dime qué necesitas rentar y en qué zona.",
      help: "Puede ser por trabajo, escuela, movilidad, familia o estilo de vida.",
      fields: [
        { id: "rentar_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["casa", "Casa"], ["departamento", "Departamento"], ["habitacion", "Habitación"], ["local_oficina", "Local u oficina"], ["otro", "Otro"]] },
        { id: "rentar_zona", type: "textarea", label: "Zona que te funcionaría", required: true, placeholder: "Colonias, ciudad, cercanía a trabajo o escuela..." },
      ],
    },
    {
      id: "rentar_presupuesto_tiempo",
      type: "group",
      kicker: "Presupuesto",
      title: "¿Qué rango y tiempo te funcionan?",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "rentar_presupuesto", type: "choice", label: "Presupuesto mensual", required: true, options: [["menos_10k", "Menos de $10,000"], ["10k_18k", "$10,000 a $18,000"], ["18k_30k", "$18,000 a $30,000"], ["30k_50k", "$30,000 a $50,000"], ["mas_50k", "Más de $50,000"], ["por_definir", "Aún por definir"]] },
        { id: "rentar_tiempo", type: "choice", label: "Fecha o tiempo de mudanza", required: true, options: [["inmediato", "De inmediato"], ["este_mes", "Este mes"], ["1_3_meses", "En 1 a 3 meses"], ["sin_fecha", "Aún no tengo fecha"]] },
      ],
    },
    {
      id: "rentar_necesidades",
      type: "multichoice",
      kicker: "Necesidades",
      title: "¿Qué detalles te importan más para rentar?",
      help: "Elige hasta 3 prioridades.",
      required: true,
      max: 3,
      statePath: "rentDetails.topNeeds",
      options: [["mascotas", "Acepta mascotas"], ["estacionamiento", "Estacionamiento"], ["amueblado", "Amueblado"], ["seguridad", "Seguridad"], ["cerca_trabajo", "Cercanía a trabajo/escuela"], ["facturacion", "Facturación"], ["amenidades", "Amenidades"], ["precio", "Precio cómodo"]],
    },
  ],
  poner_renta: [
    {
      id: "poner_renta_inicio",
      type: "group",
      kicker: "Arrendamiento",
      title: "¿Qué propiedad quieres poner en renta y dónde está?",
      help: "Con esto puedo pensar en el perfil de inquilino y estrategia de promoción adecuada.",
      fields: [
        { id: "poner_renta_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["casa", "Casa"], ["departamento", "Departamento"], ["terreno", "Terreno"], ["local_oficina", "Local u oficina"], ["bodega", "Bodega"], ["otro", "Otro"]] },
        { id: "poner_renta_ubicacion", type: "textarea", label: "Zona o colonia", required: true, placeholder: "Zona o colonia, ciudad o referencia general" },
      ],
    },
    {
      id: "poner_renta_estado_ocupacion",
      type: "group",
      kicker: "Disponibilidad",
      title: "¿Cómo está hoy la propiedad?",
      fields: [
        { id: "poner_renta_estado", type: "choice", label: "Estado", required: true, options: [["lista", "Lista para rentarse"], ["requiere_arreglos", "Requiere algunos arreglos"], ["necesito_prepararla", "Necesito prepararla para renta"], ["no_se", "No estoy seguro"]] },
        { id: "poner_renta_ocupacion", type: "choice", label: "Ocupación", required: true, options: OCCUPANCY_OPTIONS },
      ],
    },
    {
      id: "poner_renta_precio_pantalla",
      type: "group",
      kicker: "Renta estimada",
      title: "Si ya tienes una renta estimada, la validamos.",
      help: "Tener una renta estimada ayuda, pero conviene validarla con mercado, zona, estado del inmueble y perfil del inquilino.",
      fields: [
        { id: "poner_renta_precio", type: "choice", label: "Renta estimada", required: true, options: [["si", "Sí, ya tengo una renta estimada"], ["aproximada", "Tengo una idea aproximada"], ["no", "No, necesito estimarla"], ["quiero_validar", "Quiero validar el precio"]] },
        { id: "poner_renta_precio_base", type: "choice", label: "¿Cómo definiste esa renta?", required: true, options: PRICE_BASIS_OPTIONS },
      ],
    },
    {
      id: "poner_renta_contexto",
      type: "group",
      kicker: "Cuidado",
      title: "¿Qué te preocupa más al rentarla?",
      help: "Elige hasta 3 preocupaciones y dime qué tan pronto quieres avanzar.",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "poner_renta_preocupaciones", type: "multichoice", label: "Preocupaciones principales", required: true, max: 3, options: [["inquilino", "Encontrar buen inquilino"], ["pago", "Pago puntual"], ["contrato", "Contrato y seguridad legal"], ["mantenimiento", "Cuidado del inmueble"], ["precio", "Definir renta adecuada"], ["rapidez", "Rentar rápido"]] },
        { id: "poner_renta_urgencia", type: "choice", label: "Urgencia", required: true, options: [["urgente", "Lo antes posible"], ["1_3_meses", "En 1 a 3 meses"], ["sin_prisa", "Sin prisa"]] },
        { id: "poner_renta_disposicion", type: "choice", label: "¿Te gustaría llamada o cita?", required: true, options: [["llamada", "Llamada"], ["cita", "Cita"], ["whatsapp", "Primero WhatsApp"], ["flexible", "Lo revisamos"]] },
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
      id: "invertir_zona_tipo",
      type: "group",
      kicker: "Mercado",
      title: "¿Dónde y en qué tipo de propiedad te imaginas invertir?",
      fields: [
        { id: "invertir_zona", type: "textarea", label: "Zona o ciudad", required: false, placeholder: "Puedes dejarlo abierto o mencionar zonas de interés." },
        { id: "invertir_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["residencial", "Residencial"], ["terreno", "Terreno"], ["comercial", "Comercial"], ["preventas", "Preventas"], ["quiero_comparar", "Quiero comparar opciones"]] },
      ],
    },
    {
      id: "invertir_presupuesto_objetivo",
      type: "group",
      kicker: "Capital",
      title: "¿Qué presupuesto y objetivo tienes en mente?",
      help: "Puede ser aproximado. Lo importante es ubicar oportunidades realistas.",
      fields: [
        { id: "invertir_monto", type: "choice", label: "Presupuesto", required: true, options: [["menos_1m", "Menos de $1 M"], ["1m_3m", "$1 M a $3 M"], ["3m_5m", "$3 M a $5 M"], ["5m_10m", "$5 M a $10 M"], ["mas_10m", "Más de $10 M"], ["por_definir", "Aún por definir"]] },
        { id: "invertir_meta", type: "choice", label: "Objetivo de inversión", required: true, options: [["plusvalia", "Plusvalía"], ["renta_mensual", "Renta mensual"], ["seguridad", "Seguridad patrimonial"], ["crecimiento", "Crecimiento de capital"], ["diversificar", "Diversificar patrimonio"]] },
        { id: "invertir_credito_estado", type: "choice", label: "¿Ya tienes alguna preaprobación o precalificación de crédito?", required: true, showIf: { id: "invertir_tipo", values: ["residencial", "terreno", "comercial", "preventas"] }, options: CREDIT_STATUS_OPTIONS },
      ],
    },
    {
      id: "invertir_factores_tiempo",
      type: "group",
      kicker: "Horizonte",
      title: "¿Qué factores deben pesar más en tu inversión?",
      help: "Elige hasta 3.",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "invertir_factores", type: "multichoice", label: "Top factores", required: true, max: 3, statePath: "investmentDetails.topNeeds", options: [["plusvalia", "Plusvalía"], ["renta_mensual", "Renta mensual"], ["liquidez", "Liquidez"], ["seguridad", "Seguridad jurídica"], ["ubicacion", "Ubicación"], ["riesgo", "Bajo riesgo"], ["facilidad", "Facilidad de administración"]] },
        { id: "invertir_horizonte", type: "choice", label: "Tiempo para invertir", required: true, options: [["corto", "Menos de 1 año"], ["medio", "1 a 3 años"], ["largo", "3 a 5 años"], ["patrimonial", "Más de 5 años"]] },
      ],
    },
  ],
  valuacion: [
    {
      id: "valuacion_inicio",
      type: "group",
      kicker: "Valor",
      title: "Para estimar mejor, dime qué propiedad quieres valorar y dónde está.",
      help: "La ubicación es clave para comparar con referencias reales de mercado.",
      fields: [
        { id: "valuacion_tipo", type: "choice", label: "Tipo de propiedad", required: true, options: [["casa", "Casa"], ["departamento", "Departamento"], ["terreno", "Terreno"], ["local_oficina", "Local u oficina"], ["otro", "Otro"]] },
        { id: "valuacion_ubicacion", type: "textarea", label: "Zona o colonia", required: true, placeholder: "Zona o colonia, ciudad y referencias generales" },
      ],
    },
    {
      id: "valuacion_datos_clave",
      type: "group",
      kicker: "Características",
      title: "¿Qué datos principales recuerdas?",
      fields: [
        { id: "valuacion_recamaras", type: "choice", label: "Recámaras", required: true, showIf: { id: "valuacion_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3", "3"], ["4_mas", "4 o más"], ["no_se", "No estoy seguro"]] },
        { id: "valuacion_banos", type: "choice", label: "Baños", required: true, showIf: { id: "valuacion_tipo", values: ["casa", "departamento"] }, options: [["1", "1"], ["2", "2"], ["3_mas", "3 o más"], ["no_se", "No estoy seguro"]] },
        { id: "valuacion_estacionamiento", type: "choice", label: "Estacionamiento", required: true, showIf: { id: "valuacion_tipo", values: ["casa", "departamento"] }, options: [["0", "No tiene"], ["1", "1"], ["2_mas", "2 o más"], ["no_se", "No estoy seguro"]] },
        { id: "valuacion_tamano", type: "text", label: "Tamaño aproximado", placeholder: "Ej. 90 m2", required: false, showIf: { id: "valuacion_tipo", values: ["casa", "departamento", "local_oficina", "otro"] } },
        { id: "valuacion_terreno_superficie", type: "text", label: "Superficie aproximada", placeholder: "Ej. 300 m2, 1 hectárea", required: true, showIf: { id: "valuacion_tipo", values: ["terreno"] } },
        { id: "valuacion_terreno_situacion", type: "choice", label: "Situación legal o régimen", required: true, showIf: { id: "valuacion_tipo", values: ["terreno"] }, options: TERRAIN_STATUS_OPTIONS },
        { id: "valuacion_terreno_uso", type: "choice", label: "Uso actual o pensado", required: true, showIf: { id: "valuacion_tipo", values: ["terreno"] }, options: [["habitacional", "Habitacional"], ["comercial", "Comercial"], ["agricola", "Agrícola"], ["inversion", "Inversión"], ["no_se", "No estoy seguro"]] },
        { id: "valuacion_terreno_servicios", type: "multichoice", label: "Acceso y servicios", required: true, max: 3, statePath: "landDetails.topNeeds", showIf: { id: "valuacion_tipo", values: ["terreno"] }, options: [["acceso", "Acceso claro"], ["agua", "Agua"], ["luz", "Luz"], ["drenaje", "Drenaje"], ["sin_servicios", "Sin servicios"], ["no_se", "No estoy seguro"]] },
      ],
    },
    {
      id: "valuacion_estado_ocupacion",
      type: "group",
      kicker: "Estado",
      title: "¿Cómo está hoy la propiedad?",
      fields: [
        { id: "valuacion_estado", type: "choice", label: "Estado", required: true, options: PROPERTY_CONDITION_OPTIONS },
        { id: "valuacion_ocupacion", type: "choice", label: "Ocupación", required: true, options: OCCUPANCY_OPTIONS },
      ],
    },
    {
      id: "valuacion_precio_pantalla",
      type: "group",
      kicker: "Valor imaginado",
      title: "Si tienes un valor en mente, lo usamos solo como punto de partida.",
      fields: [
        { id: "valuacion_precio", type: "choice", label: "¿Tienes un valor aproximado?", required: true, options: [["si", "Sí"], ["aproximado", "Tengo una idea aproximada"], ["no", "No"], ["quiero_validar", "Quiero validarlo"]] },
        { id: "valuacion_precio_base", type: "choice", label: "¿Cómo definiste ese valor?", required: true, options: PRICE_BASIS_OPTIONS },
      ],
    },
    {
      id: "valuacion_docs_motivo",
      type: "group",
      kicker: "Motivo",
      title: "¿Para qué necesitas la referencia?",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "valuacion_documentos", type: "choice", label: "Documentación declarada", required: true, options: [["si", "Sí"], ["parcial", "Algunos"], ["no", "No por ahora"], ["no_se", "No estoy seguro qué se necesita"]] },
        { id: "valuacion_motivo", type: "choice", label: "Motivo de valuación", required: true, options: [["vender", "Estoy pensando vender"], ["rentar", "Quiero ponerla en renta"], ["herencia", "Herencia o tema familiar"], ["credito", "Crédito o trámite"], ["curiosidad", "Quiero tener claridad"]] },
      ],
    },
  ],
  terreno: [
    {
      id: "terreno_inicio",
      type: "group",
      kicker: "Terreno",
      title: "Para ordenar tu caso, dime qué necesitas resolver y dónde está el terreno.",
      help: "Los terrenos requieren revisar uso, régimen y viabilidad antes de tomar una decisión.",
      fields: [
        { id: "terreno_intencion", type: "choice", label: "Necesidad principal", required: true, options: [["vender", "Quiero venderlo"], ["comprar", "Quiero comprar un terreno"], ["valuar", "Quiero saber cuánto vale"], ["rentar", "Quiero ponerlo en renta"], ["desarrollar", "Quiero construir o desarrollar"], ["regularizar", "Necesito revisar situación legal"], ["orientacion", "No estoy seguro"]] },
        { id: "terreno_ubicacion", type: "textarea", label: "Zona del terreno", required: true, placeholder: "Ej. municipio, zona, carretera, comunidad o referencia" },
      ],
    },
    {
      id: "terreno_datos_clave",
      type: "group",
      kicker: "Datos clave",
      title: "Aterricemos lo mínimo para saber qué conviene revisar.",
      fields: [
        { id: "terreno_superficie", type: "text", label: "Superficie aproximada", placeholder: "Ej. 300 m2, 1 hectárea", required: true },
        { id: "terreno_situacion", type: "choice", label: "Situación legal o régimen", required: true, options: TERRAIN_STATUS_OPTIONS },
        { id: "terreno_uso", type: "choice", label: "Uso actual o pensado", required: true, options: [["habitacional", "Habitacional"], ["comercial", "Comercial"], ["agricola", "Agrícola"], ["inversion", "Inversión"], ["desarrollo", "Desarrollo"], ["no_se", "No estoy seguro"]] },
      ],
    },
    {
      id: "terreno_servicios_contexto",
      type: "group",
      kicker: "Viabilidad",
      title: "¿Qué sabes sobre accesos y servicios?",
      help: "Elige hasta 3 puntos. Esto ayuda a separar una oportunidad clara de un caso que requiere revisión.",
      fields: [
        { id: "terreno_servicios", type: "multichoice", label: "Acceso y servicios", required: true, max: 3, statePath: "landDetails.topNeeds", options: [["acceso", "Acceso claro"], ["agua", "Agua"], ["luz", "Luz"], ["drenaje", "Drenaje"], ["sin_servicios", "Sin servicios"], ["no_se", "No estoy seguro"]] },
        { id: "terreno_documentos", type: "choice", label: "Documentación declarada", required: true, options: [["en_regla", "Escrituras y pagos en regla"], ["parcial", "Tengo algunos documentos"], ["requiere_revision", "Necesita revisión"], ["no_se", "No estoy seguro"]] },
      ],
    },
    {
      id: "terreno_prioridad",
      type: "group",
      kicker: "Siguiente paso",
      title: "¿Qué te ayudaría más en este momento?",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "terreno_tiempo", type: "choice", label: "Tiempo aproximado", required: true, options: [["urgente", "Lo antes posible"], ["1_3_meses", "En 1 a 3 meses"], ["3_6_meses", "En 3 a 6 meses"], ["sin_prisa", "Sin prisa, quiero claridad"]] },
        { id: "terreno_necesidad", type: "choice", label: "Prioridad principal", required: true, options: [["seguridad", "Seguridad legal"], ["valor", "Conocer valor real"], ["estrategia", "Definir estrategia"], ["viabilidad", "Saber si es viable"], ["acompanamiento", "Acompañamiento profesional"]] },
      ],
    },
  ],
  orientacion: [
    {
      id: "orientacion_inicio",
      type: "group",
      kicker: "Dirección",
      title: "¿Qué tema se parece más a lo que necesitas y en qué zona estás pensando?",
      help: "Puede ser una ciudad, colonia o solo una referencia general.",
      fields: [
        { id: "orientacion_interes", type: "choice", label: "Tema principal", required: true, options: [["comprar", "Comprar"], ["vender", "Vender"], ["rentar", "Rentar"], ["invertir", "Invertir"], ["presupuesto", "Definir presupuesto"], ["no_se", "No estoy seguro"]] },
        { id: "orientacion_zona", type: "textarea", label: "Zona o ciudad", required: true, placeholder: "Ej. Morelia, zona sur, cerca del trabajo..." },
      ],
    },
    {
      id: "orientacion_situacion",
      type: "textarea",
      kicker: "Contexto",
      title: "Cuéntame con tus palabras, ¿qué situación tienes ahorita?",
      help: "No tienes que usar términos técnicos. La idea es entender qué necesitas resolver.",
      required: true,
      placeholder: "Cuéntame brevemente qué estás pensando o qué necesitas resolver.",
    },
    {
      id: "orientacion_prioridades",
      type: "group",
      kicker: "Claridad",
      title: "¿Qué te ayudaría a sentir más claridad?",
      help: "Elige hasta 3 prioridades y dime cuándo te gustaría avanzar.",
      fields: [
        { id: "etapa", type: "choice", label: "¿En qué punto estás ahorita?", required: true, options: STAGE_OPTIONS },
        { id: "orientacion_preocupacion", type: "choice", label: "Preocupación principal", required: true, options: [["dinero", "Tomar una mala decisión financiera"], ["proceso", "No entender el proceso"], ["tiempo", "Perder tiempo"], ["seguridad", "Seguridad legal"], ["opciones", "No saber qué opciones hay"]] },
        { id: "orientacion_tiempo", type: "choice", label: "Tiempo aproximado", required: true, options: [["esta_semana", "Esta semana"], ["este_mes", "Este mes"], ["sin_prisa", "Sin prisa"], ["solo_explorando", "Solo estoy explorando"]] },
        { id: "orientacion_top_prioridades", type: "multichoice", label: "Top prioridades", required: true, max: 3, statePath: "preferences.topNeeds", options: HOME_NEEDS_OPTIONS },
      ],
    },
  ],
};

const contactQuestions = [
  {
    id: "contacto_final",
    type: "group",
    kicker: "Datos de contacto",
    title: ({ name }) => `Listo, ${name}. ¿Dónde puedo darte seguimiento?`,
    help: "Con esto puedo contactarte sin que tengas que repetir todo lo que ya me compartiste.",
    fields: [
      { id: "prioridad", type: "choice", label: "¿Qué te gustaría cuidar más en esta decisión?", required: true, options: HOME_NEEDS_OPTIONS },
      { id: "medio_contacto", type: "choice", label: "Medio preferido", required: true, options: [["whatsapp", "WhatsApp"], ["llamada", "Llamada"], ["correo", "Correo electrónico"], ["cualquiera", "El que sea más práctico"]] },
      { id: "horario_contacto", type: "choice", label: "Horario preferido", required: true, options: [["manana", "Mañana"], ["mediodia", "Mediodía"], ["tarde", "Tarde"], ["noche", "Noche"], ["flexible", "Horario flexible"]] },
      { id: "whatsapp", type: "text", inputType: "tel", label: "WhatsApp", required: true, placeholder: "Ej. 55 1234 5678", autocomplete: "tel" },
      { id: "ciudad", type: "text", inputType: "text", label: "Ciudad", required: true, placeholder: "Ciudad y estado", autocomplete: "address-level2" },
      { id: "correo", type: "text", inputType: "email", label: "Correo electrónico opcional", required: false, placeholder: "tu@correo.com", autocomplete: "email" },
      { id: "consentimiento", type: "checkbox", label: "Consentimiento", required: true },
    ],
  },
];

const answers = {};
const preferences = { topNeeds: [] };
const buyDetails = { topNeeds: [] };
const rentDetails = { topNeeds: [] };
const investmentDetails = { topNeeds: [] };
const landDetails = { topNeeds: [] };
const stateBuckets = {
  preferences,
  buyDetails,
  rentDetails,
  investmentDetails,
  landDetails,
};
const sessionId = generateLeadId().replace("lead_", "session_");
const firstPageUrl = window.location.href;
let currentLeadPayload = null;
let currentLeadSubmission = null;
let loadedProperties = [];
let inventoryRecommendationState = null;
let hasUserInteracted = false;
let currentIndex = 0;
let isFinished = false;
let formStartedAt = 0;
let lastStepViewed = "";
let lastStepCompleted = "";
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
const propertyGrid = document.querySelector("#propertyGrid");
const inventoryEmpty = document.querySelector("#inventoryEmpty");
const inventoryDisclaimer = document.querySelector("#inventoryDisclaimer");

const INTERNAL_ROUTE_ANSWER_IDS = [
  "precio_requiere_validacion",
  "renta_requiere_validacion",
  "riesgo_revision",
  "requiere_revision_profesional",
  "checks_recomendados",
];
const PRIMARY_TYPE_FIELDS = new Set([
  "comprar_tipo",
  "vender_tipo",
  "rentar_tipo",
  "poner_renta_tipo",
  "valuacion_tipo",
]);
const LAND_STATUS_FIELDS = new Set([
  "comprar_terreno_situacion",
  "vender_terreno_situacion",
  "valuacion_terreno_situacion",
  "terreno_situacion",
]);
const LAND_REVIEW_CHECKS = [
  "Revisar régimen de propiedad",
  "Revisar uso de suelo",
  "Revisar viabilidad del proyecto",
  "Revisar acceso y servicios",
];
const STAGE_SCORE = {
  avanzar_pronto: 25,
  idea_clara: 18,
  comparar: 10,
  comparar_opciones: 10,
  asesoria_antes: 8,
  asesoria_antes_decidir: 8,
  explorando: 5,
};
const OBJECTIVE_SCORE = {
  comprar: 15,
  vender: 18,
  poner_renta: 15,
  invertir: 14,
  rentar: 10,
  valuacion: 12,
  terreno: 12,
  orientacion: 6,
};
const TIME_SCORE_GROUPS = [
  {
    values: new Set(["urgente", "lo_antes_posible", "este_mes", "inmediato", "esta_semana"]),
    score: 25,
    reason: "Tiempo de atención inmediato o este mes.",
  },
  {
    values: new Set(["uno_tres_meses", "1_3_meses", "0_3_meses", "pronto", "corto"]),
    score: 18,
    reason: "Tiempo de decisión cercano.",
  },
  {
    values: new Set(["tres_seis_meses", "3_6_meses", "medio"]),
    score: 10,
    reason: "Tiempo de decisión medio.",
  },
  {
    values: new Set([
      "solo_explorando",
      "mas_adelante",
      "sin_prisa",
      "sin_fecha",
      "6_12_meses",
      "largo",
      "patrimonial",
    ]),
    score: 4,
    reason: "Tiempo de decisión exploratorio o sin prisa.",
  },
];
const PAYMENT_SCORE = {
  recurso_propio: 18,
  recursos_propios: 18,
  credito_bancario: 15,
  infonavit: 12,
  fovissste: 12,
  infonavit_fovissste: 12,
  orientacion_credito: 8,
  necesito_orientacion: 8,
  no_se: 3,
};
const BUDGET_FIELD_IDS = [
  "comprar_presupuesto",
  "rentar_presupuesto",
  "invertir_monto",
  "vender_precio",
  "poner_renta_precio",
  "valuacion_precio",
];
const PAYMENT_FIELD_IDS = ["comprar_pago"];
const CREDIT_STATUS_FIELD_IDS = ["comprar_credito_estado", "invertir_credito_estado"];
const TIME_FIELD_IDS = [
  "tiempo",
  "comprar_tiempo",
  "vender_tiempo",
  "renta_tiempo",
  "rentar_tiempo",
  "invertir_tiempo",
  "invertir_horizonte",
  "valuacion_motivo",
  "urgencia",
  "poner_renta_urgencia",
  "orientacion_tiempo",
  "terreno_tiempo",
];
const NEED_FIELD_IDS = [
  "prioridad",
  "comprar_necesidades",
  "rentar_necesidades",
  "invertir_factores",
  "orientacion_top_prioridades",
  "poner_renta_preocupaciones",
  "comprar_terreno_servicios",
  "vender_terreno_servicios",
  "valuacion_terreno_servicios",
  "terreno_servicios",
  "terreno_necesidad",
];
const CONTACT_PREFERENCE_FIELDS = [
  "medio_contacto",
  "vender_disposicion",
  "poner_renta_disposicion",
];
const PROPERTY_TYPE_FIELD_IDS = [
  "comprar_tipo",
  "vender_tipo",
  "rentar_tipo",
  "poner_renta_tipo",
  "valuacion_tipo",
  "invertir_tipo",
];
const LOCATION_FIELD_IDS = [
  "comprar_zona",
  "vender_zona",
  "rentar_zona",
  "poner_renta_ubicacion",
  "invertir_zona",
  "valuacion_ubicacion",
  "orientacion_zona",
  "terreno_ubicacion",
];
const SIZE_FIELD_IDS = [
  "comprar_tamano",
  "vender_tamano",
  "valuacion_tamano",
  "comprar_terreno_superficie",
  "vender_terreno_superficie",
  "valuacion_terreno_superficie",
  "terreno_superficie",
];
const GENERAL_LOCATION_FIELD_IDS = new Set(LOCATION_FIELD_IDS);
const CONDITION_FIELD_IDS = ["vender_estado", "poner_renta_estado", "valuacion_estado"];
const OCCUPANCY_FIELD_IDS = ["vender_ocupacion", "poner_renta_ocupacion", "valuacion_ocupacion"];
const PRICE_BASIS_FIELD_IDS = [
  "vender_precio_base",
  "poner_renta_precio_base",
  "valuacion_precio_base",
];
const DOCUMENTATION_FIELD_IDS = ["vender_documentos", "valuacion_documentos", "terreno_documentos"];
const MOTIVATION_FIELD_IDS = [
  "vender_motivo",
  "valuacion_motivo",
  "invertir_objetivo",
  "invertir_meta",
  "orientacion_interes",
  "orientacion_preocupacion",
  "terreno_intencion",
];
const CRM_DISABLED_MODE = "disabled";
const CRM_CONFIG = {
  enabled: true,
  endpoint: "https://hook.us2.make.com/xdd8pkcr3bjekbyyf1q3omfmdwe2ykog",
  mode: "make",
};
const allRouteQuestionIds = [
  ...new Set([
    ...Object.values(routeQuestions).flatMap((route) => route.flatMap(getQuestionIds)),
    ...INTERNAL_ROUTE_ANSWER_IDS,
  ]),
];

function getFlow() {
  const selectedObjective = answers.objetivo?.value;
  if (!selectedObjective) {
    return baseQuestions.filter(isQuestionVisible);
  }

  const route = selectedObjective ? routeQuestions[selectedObjective] || [] : [];
  return [...baseQuestions, ...route, ...contactQuestions].filter(isQuestionVisible);
}

function getQuestionIds(question) {
  if (question.type === "group") {
    return [question.id, ...question.fields.flatMap(getQuestionIds)];
  }

  return [question.id];
}

function getAnswerValue(id) {
  return answers[id]?.value;
}

function getShowIfRuleIds(rule) {
  if (!rule) {
    return [];
  }

  if (Array.isArray(rule)) {
    return rule.flatMap(getShowIfRuleIds);
  }

  return rule.id ? [rule.id] : [];
}

function groupHasDependentField(question, fieldId) {
  return (
    question?.type === "group" &&
    question.fields.some((field) => getShowIfRuleIds(field.showIf).includes(fieldId))
  );
}

function matchesShowIf(rule) {
  if (!rule) {
    return true;
  }

  if (Array.isArray(rule)) {
    return rule.every(matchesShowIf);
  }

  const answerValue = getAnswerValue(rule.id);
  const acceptedValues = Array.isArray(rule.values) ? rule.values : [rule.value];

  if (Array.isArray(answerValue)) {
    return answerValue.some((value) => acceptedValues.includes(value));
  }

  return acceptedValues.includes(answerValue);
}

function getVisibleFields(question) {
  if (question.type !== "group") {
    return matchesShowIf(question.showIf) ? [question] : [];
  }

  return question.fields.filter((field) => matchesShowIf(field.showIf));
}

function isQuestionVisible(question) {
  if (!matchesShowIf(question.showIf)) {
    return false;
  }

  if (question.type === "group") {
    return getVisibleFields(question).length > 0;
  }

  return true;
}

function isFinalSubmitStep(question, flow) {
  return question?.id === "contacto_final" && currentIndex === flow.length - 1;
}

function getPrimaryButtonText(question, flow) {
  if (question.cta) {
    return question.cta;
  }

  return isFinalSubmitStep(question, flow) ? "Terminar asesoría" : "Siguiente";
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

function sanitizeOpenText(value, maxLength = OPEN_FIELD_MAX_LENGTH) {
  return sanitizeText(value, maxLength)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function hasSuspiciousMarkup(value) {
  return /<[^>]+>|javascript\s*:|\bon\w+\s*=/i.test(String(value || ""));
}

function normalizePhone(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .trim();
}

function getPhoneDigits(value) {
  return normalizePhone(value);
}

function getNameValidationError(value) {
  const name = String(value || "").trim();

  if (NAME_TITLE_PATTERN.test(name)) {
    return "Escribe tu nombre real, sin títulos como Sr., Dra., Lic., Don o Doña.";
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,80}$/.test(name)) {
    return "Escribe tu nombre solo con letras, espacios, acentos y ñ.";
  }

  if (!/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]{2,}/.test(name) || /(.)\1{3,}/i.test(name.replace(/\s+/g, ""))) {
    return "Escribe un nombre real, sin repeticiones o texto basura.";
  }

  return "";
}

function isValidPhone(value) {
  const rawValue = String(value || "").trim();
  return /^\d{10,15}$/.test(rawValue);
}

function isValidCity(value) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.,-]{2,100}$/.test(String(value || ""));
}

function isValidGeneralLocation(value) {
  const cleaned = String(value || "");
  return (
    cleaned.length >= 2 &&
    cleaned.length <= OPEN_FIELD_MAX_LENGTH &&
    /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü\s.,#/-]+$/.test(cleaned) &&
    !/[<>{}[\]\\|~^*$%@!]/.test(cleaned) &&
    !/(.)\1{9,}/.test(cleaned)
  );
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

function setNestedState(path, value) {
  if (!path) {
    return;
  }

  const [bucketName, key] = path.split(".");
  if (stateBuckets[bucketName] && key) {
    stateBuckets[bucketName][key] = value;
  }
}

function resetRouteState() {
  buyDetails.topNeeds = [];
  rentDetails.topNeeds = [];
  investmentDetails.topNeeds = [];
  landDetails.topNeeds = [];
}

function getSelectedLabels(question, values) {
  const selectedValues = Array.isArray(values) ? values : [values];
  return question.options
    .map(optionToObject)
    .filter((item) => selectedValues.includes(item.value))
    .map((item) => item.label);
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

function generateLeadId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `lead_${timestamp}_${random}`;
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: sanitizeText(params.get("utm_source") || "", 120),
    utm_medium: sanitizeText(params.get("utm_medium") || "", 120),
    utm_campaign: sanitizeText(params.get("utm_campaign") || "", 160),
    utm_content: sanitizeText(params.get("utm_content") || "", 160),
    utm_term: sanitizeText(params.get("utm_term") || "", 160),
  };
}

function getStateAnswer(state, id) {
  return state?.[id] || null;
}

function sanitizePayloadValue(value, maxLength = OPEN_FIELD_MAX_LENGTH) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeText(item, 120)).filter(Boolean);
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  return sanitizeText(value, maxLength);
}

function getStateValue(state, id) {
  return sanitizePayloadValue(getStateAnswer(state, id)?.value);
}

function getStateLabel(state, id) {
  return sanitizeText(getStateAnswer(state, id)?.label || "", OPEN_FIELD_MAX_LENGTH);
}

function getFirstStateValue(state, ids) {
  for (const id of ids) {
    const value = getStateValue(state, id);
    if (Array.isArray(value) ? value.length : value) {
      return value;
    }
  }

  return "";
}

function getFirstStateLabel(state, ids) {
  for (const id of ids) {
    const label = getStateLabel(state, id);
    if (label && label !== "No proporcionado") {
      return label;
    }
  }

  return "";
}

function getMultiAnswerLabels(state, ids) {
  const labels = [];

  ids.forEach((id) => {
    const answer = getStateAnswer(state, id);
    if (!answer) {
      return;
    }

    if (Array.isArray(answer.value)) {
      String(answer.label || "")
        .split(",")
        .map((item) => sanitizeText(item, 120))
        .filter(Boolean)
        .forEach((item) => addUnique(labels, item));
      return;
    }

    const label = getStateLabel(state, id);
    if (label && label !== "No proporcionado") {
      addUnique(labels, label);
    }
  });

  return labels;
}

function hasAnyStateAnswer(state, ids) {
  return ids.some((id) => {
    const value = getStateValue(state, id);
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });
}

function addUnique(list, value) {
  const cleaned = sanitizeText(value, OPEN_FIELD_MAX_LENGTH);
  if (cleaned && !list.includes(cleaned)) {
    list.push(cleaned);
  }
}

function raiseRiskLevel(currentLevel, nextLevel) {
  const order = { bajo: 1, medio: 2, alto: 3 };
  return order[nextLevel] > order[currentLevel] ? nextLevel : currentLevel;
}

function getTemperature(score) {
  if (score >= 80) {
    return {
      temperatura: "Lead caliente",
      urgencia: "Alta",
      etapaPipeline: "Cita por agendar",
      accionRecomendada:
        "Contactar en menos de 15 minutos, validar necesidad y proponer llamada o cita.",
    };
  }

  if (score >= 60) {
    return {
      temperatura: "Lead tibio alto",
      urgencia: "Media alta",
      etapaPipeline: "Contactar hoy",
      accionRecomendada: "Contactar hoy, resolver dudas y llevarlo a una llamada breve.",
    };
  }

  if (score >= 40) {
    return {
      temperatura: "Lead tibio",
      urgencia: "Media",
      etapaPipeline: "En seguimiento",
      accionRecomendada: "Enviar mensaje amable, resolver dudas y nutrir seguimiento.",
    };
  }

  return {
    temperatura: "Lead frío",
    urgencia: "Baja",
    etapaPipeline: "Nutrición",
    accionRecomendada: "Dar seguimiento suave y guardar para nutrición.",
  };
}

function getElapsedFormSeconds() {
  return formStartedAt ? Math.max(0, Math.round((Date.now() - formStartedAt) / 1000)) : 0;
}

function getAnswerTextCorpus(state) {
  return Object.keys(state || {})
    .filter((id) => !["consentimiento"].includes(id))
    .map((id) => `${id} ${getStateLabel(state, id)} ${String(getStateValue(state, id))}`)
    .join(" ")
    .toLowerCase();
}

function hasRepeatedPhonePattern(value) {
  const digits = getPhoneDigits(value);
  return /^(\d)\1{9,14}$/.test(digits) || /^(1234567890|0123456789)$/.test(digits);
}

function hasSuspiciousNamePattern(value) {
  const name = normalizeInventoryText(value);
  const compact = name.replace(/\s+/g, "");

  return (
    !name ||
    SUSPICIOUS_TEXT_PATTERN.test(name) ||
    /(.)\1{3,}/i.test(compact) ||
    compact.length < 2
  );
}

function countSparseAnswers(state) {
  const sparseValues = new Set([
    "no_se",
    "aun_no_se",
    "por_definir",
    "no",
    "no_seguro",
    "no_aplica",
    "orientacion",
  ]);

  return Object.keys(state || {}).reduce((count, id) => {
    const value = getStateValue(state, id);
    if (Array.isArray(value)) {
      return count + value.filter((item) => sparseValues.has(item)).length;
    }

    return count + (sparseValues.has(value) ? 1 : 0);
  }, 0);
}

function classifyLeadQuality(state) {
  const reasons = [];
  const flags = {
    validName: false,
    validPhone: false,
    humanTime: false,
    coherentAnswers: true,
    suspiciousName: false,
    suspiciousPhone: false,
    abnormalSpeed: false,
    impossibleSpeed: false,
    repetitiveText: false,
    sparseInformation: false,
    honeypotFilled: isLikelyBot(),
  };
  const addReason = (reason) => addUnique(reasons, reason);
  const name = getStateLabel(state, "nombre");
  const phone = getStateValue(state, "whatsapp");
  const elapsedSeconds = getElapsedFormSeconds();
  const textCorpus = getAnswerTextCorpus(state);
  const answeredRouteCount = Object.keys(buildRouteResponses(state, getStateValue(state, "objetivo"))).length;
  const sparseAnswerCount = countSparseAnswers(state);
  const timeValue = getTimeUrgencyValue(state);
  const acceptsImmediateContact = CONTACT_PREFERENCE_FIELDS.some((id) =>
    ["llamada", "cita", "flexible", "cualquiera"].includes(getStateValue(state, id))
  );
  const hasContactPreference = Boolean(getStateValue(state, "medio_contacto"));
  let riskSignals = 0;
  let botSignals = 0;

  flags.validName = Boolean(name) && !getNameValidationError(name);
  flags.validPhone = isValidPhone(phone);
  flags.humanTime = elapsedSeconds >= VERY_FAST_FORM_SECONDS;
  flags.suspiciousName = !flags.validName || hasSuspiciousNamePattern(name);
  flags.suspiciousPhone = !flags.validPhone || hasRepeatedPhonePattern(phone);
  flags.abnormalSpeed = Boolean(elapsedSeconds && elapsedSeconds < VERY_FAST_FORM_SECONDS);
  flags.impossibleSpeed = Boolean(elapsedSeconds && elapsedSeconds < IMPOSSIBLE_FORM_SECONDS);
  flags.repetitiveText = /(.)\1{9,}/i.test(textCorpus) || SUSPICIOUS_TEXT_PATTERN.test(textCorpus);
  flags.sparseInformation = sparseAnswerCount >= 4 || answeredRouteCount <= 1;
  flags.coherentAnswers = !flags.repetitiveText && !flags.suspiciousName;

  if (flags.validName) {
    addReason("Nombre válido.");
  } else {
    riskSignals += 1;
    addReason("Nombre inválido o extraño.");
  }

  if (flags.validPhone) {
    addReason("Teléfono válido.");
  } else {
    riskSignals += 1;
    addReason("Teléfono inválido o dudoso.");
  }

  if (flags.honeypotFilled) {
    botSignals += 3;
    addReason("Honeypot completado.");
  }

  if (flags.impossibleSpeed) {
    botSignals += 2;
    addReason("Tiempo de respuesta imposible para una persona.");
  } else if (flags.abnormalSpeed) {
    riskSignals += 1;
    addReason("Tiempo de respuesta anormalmente rápido.");
  } else if (flags.humanTime) {
    addReason("Tiempo de respuesta humano.");
  }

  if (flags.suspiciousName) {
    riskSignals += 1;
  }

  if (flags.suspiciousPhone) {
    riskSignals += 1;
    addReason("Patrón de teléfono dudoso.");
  }

  if (flags.repetitiveText) {
    riskSignals += 1;
    botSignals += 1;
    addReason("Respuestas con patrón repetitivo o de prueba.");
  }

  if (flags.sparseInformation) {
    addReason("Información incompleta o muy exploratoria.");
  }

  let classification = LEAD_QUALITY.USEFUL;
  let qualityScore = 85;

  if (botSignals >= 2 || (flags.impossibleSpeed && (flags.suspiciousName || flags.repetitiveText))) {
    classification = LEAD_QUALITY.PROBABLE_BOT;
    qualityScore = 10;
  } else if (riskSignals >= 3 || (flags.abnormalSpeed && (flags.suspiciousPhone || flags.repetitiveText))) {
    classification = LEAD_QUALITY.SUSPICIOUS;
    qualityScore = 30;
  } else if (
    flags.sparseInformation ||
    CURIOUS_TIME_VALUES.has(timeValue) ||
    (hasContactPreference && !acceptsImmediateContact)
  ) {
    classification = LEAD_QUALITY.CURIOUS;
    qualityScore = 60;
  }

  return {
    value: classification,
    label: LEAD_QUALITY_LABELS[classification],
    score: qualityScore,
    reasons,
    flags,
    shouldTriggerUrgentAlert:
      classification !== LEAD_QUALITY.SUSPICIOUS &&
      classification !== LEAD_QUALITY.PROBABLE_BOT,
    canBeHotLead:
      classification !== LEAD_QUALITY.SUSPICIOUS &&
      classification !== LEAD_QUALITY.PROBABLE_BOT,
  };
}

function applyLeadQualityGuardrails(qualification, leadQuality) {
  if (![LEAD_QUALITY.SUSPICIOUS, LEAD_QUALITY.PROBABLE_BOT].includes(leadQuality.value)) {
    return qualification;
  }

  return {
    ...qualification,
    temperatura:
      leadQuality.value === LEAD_QUALITY.PROBABLE_BOT ? "Lead no calificado" : "Lead en revisión",
    urgencia: "Baja",
    etapaPipeline: "Revisión de calidad",
    accionRecomendada:
      "No generar alerta urgente. Revisar calidad del lead antes de priorizar seguimiento.",
  };
}

function getTimeScore(state) {
  let bestMatch = { score: 0, reason: "" };

  TIME_FIELD_IDS.forEach((id) => {
    const value = getStateValue(state, id);
    if (!value || Array.isArray(value)) {
      return;
    }

    TIME_SCORE_GROUPS.forEach((group) => {
      if (group.values.has(value) && group.score > bestMatch.score) {
        bestMatch = { score: group.score, reason: group.reason };
      }
    });
  });

  return bestMatch;
}

function hasBudgetOrPrice(state) {
  return BUDGET_FIELD_IDS.some((id) => {
    const value = getStateValue(state, id);
    return Boolean(value && !["por_definir", "no", "necesito_valuacion"].includes(value));
  });
}

function getPaymentScore(state) {
  for (const id of PAYMENT_FIELD_IDS) {
    const value = getStateValue(state, id);
    if (value && PAYMENT_SCORE[value]) {
      return {
        score: PAYMENT_SCORE[value],
        reason: `Forma de pago clara: ${getStateLabel(state, id)}.`,
      };
    }
  }

  return { score: 0, reason: "" };
}

function getCreditStatusValue(state) {
  return getFirstStateValue(state, CREDIT_STATUS_FIELD_IDS);
}

function getCreditStatusLabel(state) {
  return getFirstStateLabel(state, CREDIT_STATUS_FIELD_IDS);
}

function getCreditType(value) {
  const creditTypes = {
    credito_bancario_preaprobado: "credito_bancario",
    precalificacion_infonavit: "infonavit",
    precalificacion_fovissste: "fovissste",
    simulacion_hecha: "simulacion",
    tramite_iniciado: "tramite",
    necesito_orientacion: "orientacion",
    no_se_si_califico: "por_definir",
    recursos_propios: "recursos_propios",
  };

  return creditTypes[value] || "";
}

function buildFinancingReadiness(state) {
  const creditStatus = getCreditStatusValue(state);
  const creditStatusLabel = getCreditStatusLabel(state);
  const paymentMethod =
    creditStatus === "recursos_propios"
      ? "Recursos propios"
      : getStateLabel(state, "comprar_pago") || creditStatusLabel;
  const financingScore = FINANCING_SCORE[creditStatus] || 0;
  const isPrequalified = [
    "recursos_propios",
    "credito_bancario_preaprobado",
    "precalificacion_infonavit",
    "precalificacion_fovissste",
  ].includes(creditStatus);
  const needsCreditGuidance = ["necesito_orientacion", "no_se_si_califico"].includes(creditStatus);
  let advisorNote = "";

  if (isPrequalified) {
    advisorNote = "Revisar opciones y proponer llamada o cita.";
  } else if (["simulacion_hecha", "tramite_iniciado"].includes(creditStatus)) {
    advisorNote = "Validar capacidad y orientar antes de mostrar muchas opciones.";
  } else if (needsCreditGuidance) {
    advisorNote = "Orientar sobre crédito antes de proponer cita de propiedad.";
  }

  return {
    paymentMethod,
    creditStatus,
    creditType: getCreditType(creditStatus),
    creditStatusLabel,
    isPrequalified,
    needsCreditGuidance,
    financingScore,
    advisorNote,
  };
}

function getPreferredContactScore(state) {
  const values = CONTACT_PREFERENCE_FIELDS.map((id) => getStateValue(state, id)).filter(Boolean);

  if (values.some((value) => ["llamada", "cita", "flexible", "cualquiera"].includes(value))) {
    return { score: 15, reason: "Acepta llamada o cita para seguimiento." };
  }

  if (values.includes("whatsapp")) {
    return { score: 8, reason: "Prefiere seguimiento por WhatsApp." };
  }

  return { score: 0, reason: "" };
}

function getNeedsCount(state) {
  return getMultiAnswerLabels(state, NEED_FIELD_IDS).length;
}

function isCaptureObjective(objective) {
  return ["vender", "poner_renta", "valuacion"].includes(objective);
}

function wantsFastFollowUp(state) {
  return (
    getStateValue(state, "etapa") === "avanzar_pronto" ||
    ["urgente", "inmediato", "este_mes", "esta_semana"].includes(getTimeUrgencyValue(state))
  );
}

function getTimeUrgencyValue(state) {
  for (const id of TIME_FIELD_IDS) {
    const value = getStateValue(state, id);
    if (value && !Array.isArray(value)) {
      return value;
    }
  }

  return "";
}

function wantsListingAppointment(state) {
  return CONTACT_PREFERENCE_FIELDS.some((id) =>
    ["llamada", "cita", "flexible", "cualquiera"].includes(getStateValue(state, id))
  );
}

function hasPriceInMind(state) {
  return ["vender_precio", "poner_renta_precio", "valuacion_precio"].some((id) =>
    ["si", "aproximado", "aproximada", "quiero_validarlo", "quiero_validar"].includes(
      getStateValue(state, id)
    )
  );
}

function hasHighRiskLand(state) {
  const legalSituation = getFirstStateValue(state, [
    "comprar_terreno_situacion",
    "vender_terreno_situacion",
    "valuacion_terreno_situacion",
    "terreno_situacion",
  ]);
  return (
    HIGH_RISK_LAND_STATUS.has(legalSituation) ||
    getStateAnswer(state, "requiere_revision_profesional")?.value === true
  );
}

function isLandIntake(state) {
  const propertyType = getFirstStateValue(state, PROPERTY_TYPE_FIELD_IDS);
  return propertyType === "terreno" || hasAnyStateAnswer(state, [
    "comprar_terreno_superficie",
    "vender_terreno_superficie",
    "valuacion_terreno_superficie",
    "terreno_superficie",
    "comprar_terreno_situacion",
    "vender_terreno_situacion",
    "valuacion_terreno_situacion",
    "terreno_situacion",
  ]);
}

function calculateLeadScore(state, leadQualityOverride = null) {
  let score = 0;
  const razonCalificacion = [];
  const addScore = (points, reason) => {
    if (points > 0) {
      score += points;
      addUnique(razonCalificacion, reason);
    }
  };
  const objective = getStateValue(state, "objetivo");
  const etapa = getStateValue(state, "etapa");
  const stageScore = STAGE_SCORE[etapa] || 0;
  const objectiveScore = OBJECTIVE_SCORE[objective] || 0;
  const timeScore = getTimeScore(state);
  const paymentScore = getPaymentScore(state);
  const financingReadiness = buildFinancingReadiness(state);
  const contactPreferenceScore = getPreferredContactScore(state);
  const needsCount = getNeedsCount(state);

  addScore(stageScore, `Etapa declarada: ${getStateLabel(state, "etapa")}.`);
  addScore(objectiveScore, `Objetivo inmobiliario: ${getStateLabel(state, "objetivo")}.`);
  addScore(timeScore.score, timeScore.reason);

  if (hasBudgetOrPrice(state)) {
    addScore(12, "Tiene presupuesto, precio o renta estimada como punto de partida.");
  }

  addScore(paymentScore.score, paymentScore.reason);
  addScore(
    financingReadiness.financingScore,
    financingReadiness.creditStatusLabel
      ? `Estado de crédito o capital: ${financingReadiness.creditStatusLabel}.`
      : ""
  );

  if (getPhoneDigits(getStateValue(state, "whatsapp")).length >= 10) {
    addScore(10, "WhatsApp válido para seguimiento.");
  }

  if (getStateValue(state, "ciudad")) {
    addScore(6, "Ciudad definida.");
  }

  if (getStateValue(state, "horario_contacto")) {
    addScore(5, "Horario preferido definido.");
  }

  addScore(contactPreferenceScore.score, contactPreferenceScore.reason);

  if (isCaptureObjective(objective)) {
    const documentationValue = getFirstStateValue(state, DOCUMENTATION_FIELD_IDS);
    if (["en_regla", "si"].includes(documentationValue)) {
      addScore(15, "Documentación declarada como disponible o en regla.");
    }

    if (wantsFastFollowUp(state)) {
      addScore(15, "Quiere avanzar pronto en una operación de captación o valoración.");
    }

    if (hasPriceInMind(state)) {
      addScore(6, "Tiene precio o renta estimada en mente.");
    }

    if (wantsListingAppointment(state)) {
      addScore(20, "Acepta llamada o cita para revisar la propiedad.");
    }
  }

  if (needsCount >= 2) {
    addScore(8, "Seleccionó dos o tres prioridades.");
  } else if (needsCount === 1) {
    addScore(5, "Seleccionó una prioridad relevante.");
  }

  score = Math.min(score, 100);
  const leadQuality = leadQualityOverride || classifyLeadQuality(state);
  let qualification = getTemperature(score);

  if (objective === "vender" && wantsFastFollowUp(state)) {
    qualification.accionRecomendada =
      "Contactar cuanto antes y proponer llamada o visita de captación.";
  }

  if (["comprar", "invertir"].includes(objective) && financingReadiness.isPrequalified) {
    qualification.accionRecomendada = "Revisar opciones y proponer llamada o cita.";
  } else if (
    ["comprar", "invertir"].includes(objective) &&
    ["simulacion_hecha", "tramite_iniciado"].includes(financingReadiness.creditStatus)
  ) {
    qualification.accionRecomendada =
      "Validar capacidad y orientar antes de mostrar muchas opciones.";
  } else if (["comprar", "invertir"].includes(objective) && financingReadiness.needsCreditGuidance) {
    qualification.accionRecomendada =
      "Orientar sobre crédito antes de proponer cita de propiedad.";
  }

  if (objective === "vender" && getStateAnswer(state, "precio_requiere_validacion")?.value === true) {
    addUnique(razonCalificacion, "Precio requiere validación de mercado antes de publicar.");
  }

  if (
    objective === "poner_renta" &&
    getStateAnswer(state, "renta_requiere_validacion")?.value === true
  ) {
    addUnique(razonCalificacion, "Renta estimada requiere validación de mercado.");
  }

  if (isLandIntake(state) && hasHighRiskLand(state)) {
    addUnique(
      razonCalificacion,
      "Terreno requiere revisión especial de régimen, uso y viabilidad."
    );
  }

  if (!leadQuality.canBeHotLead) {
    qualification = applyLeadQualityGuardrails(qualification, leadQuality);
    addUnique(
      razonCalificacion,
      `Calidad de lead requiere revisión: ${leadQuality.label}. No generar alerta urgente.`
    );
  }

  return {
    score,
    temperatura: qualification.temperatura,
    urgencia: qualification.urgencia,
    accionRecomendada: qualification.accionRecomendada,
    etapaPipeline: qualification.etapaPipeline,
    leadQuality: leadQuality.value,
    razonCalificacion,
  };
}

function buildPriceMindset(state) {
  const estimatedPriceBasis = getFirstStateLabel(state, ["vender_precio_base", "valuacion_precio_base"]);
  const basisValue = getFirstStateValue(state, ["vender_precio_base", "valuacion_precio_base"]);
  const hasEstimatedPrice = hasAnyStateAnswer(state, ["vender_precio", "valuacion_precio"]);
  const needsMarketValidation =
    getStateAnswer(state, "precio_requiere_validacion")?.value === true ||
    UNCLEAR_PRICE_BASIS.has(basisValue);

  return {
    hasEstimatedPrice,
    estimatedPriceBasis,
    needsMarketValidation,
    note: needsMarketValidation
      ? "Tener un precio en mente es buen inicio, pero conviene validarlo con mercado."
      : "",
  };
}

function buildRentMindset(state) {
  const estimatedRentBasis = getStateLabel(state, "poner_renta_precio_base");
  const basisValue = getStateValue(state, "poner_renta_precio_base");
  const hasEstimatedRent = hasAnyStateAnswer(state, ["poner_renta_precio"]);
  const needsMarketValidation =
    getStateAnswer(state, "renta_requiere_validacion")?.value === true ||
    UNCLEAR_PRICE_BASIS.has(basisValue);

  return {
    hasEstimatedRent,
    estimatedRentBasis,
    needsMarketValidation,
    note: needsMarketValidation
      ? "La renta estimada conviene validarla con mercado, zona, estado del inmueble y perfil del inquilino."
      : "",
  };
}

function buildLandDetails(state) {
  const requiresLandReview = isLandIntake(state) && hasHighRiskLand(state);
  const accessAndServices = getMultiAnswerLabels(state, [
    "comprar_terreno_servicios",
    "vender_terreno_servicios",
    "valuacion_terreno_servicios",
    "terreno_servicios",
  ]);

  return {
    areaRange: getFirstStateLabel(state, [
      "comprar_terreno_superficie",
      "vender_terreno_superficie",
      "valuacion_terreno_superficie",
      "terreno_superficie",
    ]),
    intendedUse: getFirstStateLabel(state, [
      "comprar_terreno_uso",
      "vender_terreno_uso",
      "valuacion_terreno_uso",
      "terreno_uso",
    ]),
    legalSituation: getFirstStateLabel(state, [
      "comprar_terreno_situacion",
      "vender_terreno_situacion",
      "valuacion_terreno_situacion",
      "terreno_situacion",
    ]),
    accessAndServices,
    generalLocation: getFirstStateLabel(state, LOCATION_FIELD_IDS),
    requiresLandReview,
    landReviewNotes: requiresLandReview ? [...LAND_REVIEW_CHECKS] : [],
  };
}

function buildInternalReviewNotes(state, leadQualityOverride = null) {
  const objective = getStateValue(state, "objetivo");
  const leadQuality = leadQualityOverride || classifyLeadQuality(state);
  const review = {
    riskLevel: "bajo",
    reviewStatus: "pendiente",
    leadQuality: leadQuality.value,
    leadQualityLabel: leadQuality.label,
    leadQualityScore: leadQuality.score,
    shouldTriggerUrgentAlert: leadQuality.shouldTriggerUrgentAlert,
    canBeHotLead: leadQuality.canBeHotLead,
    legalFlags: [],
    commercialFlags: [],
    qualityFlags: [],
    recommendedChecks: [],
    advisorNotes: [],
    nextAction: "",
    requiresProfessionalReview: false,
  };
  const raiseRisk = (level) => {
    review.riskLevel = raiseRiskLevel(review.riskLevel, level);
  };
  const addCheck = (value) => addUnique(review.recommendedChecks, value);
  const addLegalFlag = (value) => addUnique(review.legalFlags, value);
  const addCommercialFlag = (value) => addUnique(review.commercialFlags, value);
  const addQualityFlag = (value) => addUnique(review.qualityFlags, value);
  const addAdvisorNote = (value) => addUnique(review.advisorNotes, value);
  const documentationValue = getFirstStateValue(state, DOCUMENTATION_FIELD_IDS);
  const occupancyValue = getFirstStateValue(state, OCCUPANCY_FIELD_IDS);
  const priceMindset = buildPriceMindset(state);
  const rentMindset = buildRentMindset(state);
  const textCorpus = Object.keys(state)
    .map((id) => `${id} ${getStateLabel(state, id)} ${String(getStateValue(state, id))}`)
    .join(" ")
    .toLowerCase();

  if (objective === "vender") {
    if (documentationValue === "en_regla") {
      addCheck("Confirmar documentación antes de publicar");
      addCheck("Revisar libertad de gravamen antes de formalizar");
    } else {
      raiseRisk("medio");
      addCheck("Revisar escritura");
      addCheck("Revisar predial");
      addCheck("Revisar agua/servicios");
      addCheck("Revisar titularidad");
      addCheck("Revisar libertad de gravamen antes de avanzar");
    }
  }

  if (["vender", "valuacion"].includes(objective) && documentationValue && documentationValue !== "en_regla" && documentationValue !== "si") {
    raiseRisk("medio");
    addCheck("Revisar documentación disponible antes de avanzar");
  }

  if (occupancyValue === "rentada") {
    raiseRisk("medio");
    addLegalFlag("Propiedad ocupada por arrendatario");
    addCheck("Revisar contrato de arrendamiento");
    addCheck("Confirmar plazo y condiciones de entrega");
  }

  if (/(sucesi[oó]n|herencia|juicio|embargo|copropiedad|intestado|posesi[oó]n|ejidal|comunal)/i.test(textCorpus)) {
    raiseRisk("alto");
    review.requiresProfessionalReview = true;
    addLegalFlag("Posible situación jurídica sensible");
    addCheck("Revisar titularidad y facultades para disponer");
    addCheck("Recomendar revisión profesional antes de promover");
  }

  if (priceMindset.needsMarketValidation) {
    addCommercialFlag("Precio requiere validación de mercado");
    addCheck("Revisar comparables");
    addCheck("Revisar zona, estado, demanda y competencia");
    addAdvisorNote(
      "Educar con tacto: tener precio en mente es buen inicio, pero conviene validarlo"
    );
  }

  if (objective === "poner_renta") {
    const rentConcerns = getStateValue(state, "poner_renta_preocupaciones");
    if (rentMindset.needsMarketValidation) {
      addCommercialFlag("Renta estimada requiere validación de mercado");
      addCheck("Comparar rentas similares");
      addCheck("Revisar perfil de inquilino y demanda");
    }

    if (
      Array.isArray(rentConcerns) &&
      rentConcerns.some((value) => ["pago", "contrato", "mantenimiento"].includes(value))
    ) {
      addCommercialFlag("Propietario preocupado por riesgo de inquilino");
      addCheck("Reforzar filtro de prospectos");
      addCheck("Revisar contrato");
      addCheck("Validar garantías, depósito o referencias según práctica permitida");
    }
  }

  if (isLandIntake(state)) {
    addCheck("Revisar uso de suelo");
    addCheck("Revisar medidas y colindancias");
    addCheck("Revisar situación catastral");
    addCheck("Revisar acceso y servicios");
  }

  if (isLandIntake(state) && hasHighRiskLand(state)) {
    raiseRisk("alto");
    review.requiresProfessionalReview = true;
    addLegalFlag("Terreno requiere revisión especial de régimen de propiedad");
    addCheck("Revisar régimen de propiedad");
    addCheck("Revisar viabilidad del proyecto");
    addCheck("Revisión profesional recomendada antes de promover");
  }

  if (leadQuality.value === LEAD_QUALITY.SUSPICIOUS) {
    raiseRisk("medio");
    addQualityFlag("Lead sospechoso");
    leadQuality.reasons.forEach(addQualityFlag);
    addCheck("Revisar señales de calidad antes de priorizar seguimiento");
  }

  if (leadQuality.value === LEAD_QUALITY.PROBABLE_BOT) {
    raiseRisk("alto");
    addQualityFlag("Probable bot");
    leadQuality.reasons.forEach(addQualityFlag);
    addCheck("No disparar alerta urgente");
    addCheck("Validar manualmente antes de enviar a CRM o seguimiento prioritario");
  }

  if (!leadQuality.shouldTriggerUrgentAlert) {
    review.nextAction = "Revisar calidad del lead antes de priorizar seguimiento.";
  } else if (review.riskLevel === "alto") {
    review.nextAction = "Validar documentación y situación jurídica antes de promover.";
  } else if (objective === "terreno") {
    review.nextAction = "Contactar para ordenar situación del terreno y definir revisión necesaria.";
  } else if (["vender", "poner_renta", "valuacion"].includes(objective)) {
    review.nextAction = "Contactar para validar estrategia de captación o valoración.";
  } else {
    review.nextAction = "Contactar para seguimiento inicial.";
  }

  return review;
}

function buildRouteResponses(state, route) {
  const routeIds = (routeQuestions[route] || []).flatMap(getQuestionIds);
  return routeIds.reduce((payload, id) => {
    const answer = getStateAnswer(state, id);
    if (!answer || answer.internal) {
      return payload;
    }

    const value = sanitizePayloadValue(answer.value);
    if (Array.isArray(value) ? value.length : value || typeof value === "boolean") {
      payload[id] = {
        value,
        label: sanitizeText(answer.label || "", OPEN_FIELD_MAX_LENGTH),
      };
    }

    return payload;
  }, {});
}

function buildPropertyIntake(state, qualification) {
  const objective = getStateValue(state, "objetivo");
  const financingReadiness = buildFinancingReadiness(state);

  return {
    operation: objective,
    propertyType:
      getFirstStateLabel(state, PROPERTY_TYPE_FIELD_IDS) ||
      (objective === "terreno" ? "Terreno" : ""),
    generalLocation: getFirstStateLabel(state, LOCATION_FIELD_IDS),
    approximateSize: getFirstStateLabel(state, SIZE_FIELD_IDS),
    condition: getFirstStateLabel(state, CONDITION_FIELD_IDS),
    occupancy: getFirstStateLabel(state, OCCUPANCY_FIELD_IDS),
    estimatedPriceOrRent: getFirstStateLabel(state, BUDGET_FIELD_IDS),
    priceBasis: getFirstStateLabel(state, PRICE_BASIS_FIELD_IDS),
    documentationDeclared: getMultiAnswerLabels(state, DOCUMENTATION_FIELD_IDS),
    urgency: getFirstStateLabel(state, TIME_FIELD_IDS),
    motivation: getFirstStateLabel(state, MOTIVATION_FIELD_IDS),
    wantsListingAppointment: getFirstStateLabel(state, CONTACT_PREFERENCE_FIELDS),
    financingReadiness,
    feasibilityScore: qualification.score,
    feasibilityLevel: qualification.temperatura,
    recommendedListingAction: qualification.accionRecomendada,
  };
}

function getIntentOperationType(objective) {
  const operationTypes = {
    comprar: "compra",
    vender: "venta",
    rentar: "renta",
    poner_renta: "captacion_renta",
    valuacion: "valuacion",
    invertir: "inversion",
    terreno: "terreno",
    orientacion: "orientacion",
  };

  return operationTypes[objective] || "";
}

function buildIntentPayload(state, route) {
  const objective = getStateValue(state, "objetivo");

  return {
    objetivo: objective,
    ruta: route,
    etapa: getStateValue(state, "etapa"),
    prioridad: getStateValue(state, "prioridad"),
    tipoOperacion: getIntentOperationType(objective),
  };
}

function buildQualificationPayload(qualification) {
  return {
    score: qualification.score,
    temperatura: qualification.temperatura,
    urgencia: qualification.urgencia,
    etapaPipeline: qualification.etapaPipeline,
    accionRecomendada: qualification.accionRecomendada,
    razonesScore: qualification.razonCalificacion || [],
  };
}

function getRecommendedQualityHandling(leadQuality) {
  const handling = {
    useful: "Priorizar seguimiento comercial normal.",
    curious: "Dar seguimiento suave y orientar sin presión.",
    suspicious: "Revisar manualmente antes de priorizar o generar alertas.",
    probable_bot: "No priorizar. Validar manualmente antes de cualquier acción comercial.",
  };

  return handling[leadQuality.value] || "Revisar calidad del lead antes de seguimiento.";
}

function getQualityFlags(leadQuality, internalReview) {
  return [
    ...(Array.isArray(internalReview?.qualityFlags) ? internalReview.qualityFlags : []),
    ...(Array.isArray(leadQuality?.reasons) ? leadQuality.reasons : []),
  ].reduce((flags, flag) => {
    addUnique(flags, flag);
    return flags;
  }, []);
}

function buildLeadQualityPayload(leadQuality, internalReview) {
  const shouldNotifyAdvisor =
    leadQuality.value === LEAD_QUALITY.USEFUL && Boolean(leadQuality.shouldTriggerUrgentAlert);

  return {
    calidadLead: leadQuality.value,
    qualityStatus: leadQuality.value,
    botRiskScore: Math.max(0, 100 - Number(leadQuality.score || 0)),
    qualityFlags: getQualityFlags(leadQuality, internalReview),
    shouldNotifyAdvisor,
    shouldSendToCRM: true,
    recommendedHandling: getRecommendedQualityHandling(leadQuality),
  };
}

function buildPropertyContext(state) {
  return {
    tipoPropiedad:
      getFirstStateLabel(state, PROPERTY_TYPE_FIELD_IDS) ||
      (getStateValue(state, "objetivo") === "terreno" ? "Terreno" : ""),
    zonaGeneral: getFirstStateLabel(state, LOCATION_FIELD_IDS),
    ciudad: getStateLabel(state, "ciudad"),
    presupuesto: getFirstStateLabel(state, [
      "comprar_presupuesto",
      "rentar_presupuesto",
      "invertir_monto",
    ]),
    precioEnMente: getFirstStateLabel(state, ["vender_precio", "valuacion_precio"]),
    rentaEstimada: getStateLabel(state, "poner_renta_precio"),
    documentacionDeclarada: getMultiAnswerLabels(state, DOCUMENTATION_FIELD_IDS),
    estadoPropiedad: getFirstStateLabel(state, CONDITION_FIELD_IDS),
    ocupacion: getFirstStateLabel(state, OCCUPANCY_FIELD_IDS),
    necesidadesTop3: getMultiAnswerLabels(state, NEED_FIELD_IDS).slice(0, MAX_MULTI_SELECT),
  };
}

function buildInternalNotesPayload(internalReview, qualification, financingReadiness) {
  return {
    notasComerciales: [
      ...(internalReview.commercialFlags || []),
      ...(internalReview.advisorNotes || []),
      ...(financingReadiness.advisorNote ? [financingReadiness.advisorNote] : []),
    ],
    notasLegales: internalReview.legalFlags || [],
    puntosARevisar: internalReview.recommendedChecks || [],
    siguientePasoRecomendado: qualification.accionRecomendada || internalReview.nextAction || "",
  };
}

function getCrmEndpoint() {
  const endpoint = sanitizeText(CRM_CONFIG.endpoint, 500);

  if (!endpoint || !/^https:\/\//i.test(endpoint)) {
    return "";
  }

  return endpoint;
}

function isCrmEndpointConfigured() {
  return Boolean(getCrmEndpoint());
}

function isCrmReadyToSubmit() {
  return Boolean(CRM_CONFIG.enabled && isCrmEndpointConfigured());
}

function buildCrmPayloadStatus(status = CRM_DISABLED_MODE, submittedAt = "") {
  return {
    submitAttempted: status !== CRM_DISABLED_MODE,
    submitStatus: status,
    submittedAt,
    crmMode: CRM_CONFIG.mode,
    crmEndpointConfigured: isCrmEndpointConfigured(),
  };
}

function setLeadCrmStatus(leadPayload, status, submittedAt = "") {
  if (!leadPayload) {
    return;
  }

  leadPayload.crm = buildCrmPayloadStatus(status, submittedAt);
}

function validateLeadPayloadForCrm(leadPayload) {
  const contact = leadPayload?.contact || {};
  const objective = leadPayload?.intent?.objetivo;

  if (!leadPayload?.consent?.acceptedPrivacy) {
    return { valid: false, reason: "missing_consent" };
  }

  if (!sanitizeText(contact.nombre, 80)) {
    return { valid: false, reason: "missing_name" };
  }

  if (getPhoneDigits(contact.whatsapp).length < 10) {
    return { valid: false, reason: "invalid_whatsapp" };
  }

  if (!sanitizeText(objective, 80)) {
    return { valid: false, reason: "missing_objective" };
  }

  if (leadPayload?.leadQuality?.shouldSendToCRM !== true) {
    return { valid: false, reason: "lead_quality_filtered" };
  }

  return { valid: true, reason: "" };
}

function buildLeadPayload(state) {
  const createdAt = new Date().toISOString();
  const route = getStateValue(state, "objetivo");
  const leadQuality = classifyLeadQuality(state);
  const qualification = calculateLeadScore(state, leadQuality);
  const priceMindset = buildPriceMindset(state);
  const rentMindset = buildRentMindset(state);
  const financingReadiness = buildFinancingReadiness(state);
  const internalReview = buildInternalReviewNotes(state, leadQuality);
  const shortMessage = buildWhatsappMessage(state);
  const whatsappUrl = buildWhatsappUrl(shortMessage);
  const acceptedPrivacy = getStateAnswer(state, "consentimiento")?.value === true;
  const routeResponses = buildRouteResponses(state, route);

  return {
    leadId: generateLeadId(),
    createdAt,
    source: "landing-ehecatl-milian",
    pageUrl: sanitizeText(window.location.href, 500),
    contact: {
      nombre: getStateLabel(state, "nombre"),
      whatsapp: getStateValue(state, "whatsapp"),
      ciudad: getStateLabel(state, "ciudad"),
      correo: getStateValue(state, "correo"),
      medioPreferido: getStateLabel(state, "medio_contacto"),
      horarioPreferido: getStateLabel(state, "horario_contacto"),
    },
    intent: buildIntentPayload(state, route),
    qualification: buildQualificationPayload(qualification),
    leadQuality: buildLeadQualityPayload(leadQuality, internalReview),
    financingReadiness,
    propertyContext: buildPropertyContext(state),
    internalNotes: buildInternalNotesPayload(internalReview, qualification, financingReadiness),
    utm: getUtmParams(),
    metrics: {
      sessionId,
      formStartedAt: formStartedAt ? new Date(formStartedAt).toISOString() : "",
      formCompletedAt: createdAt,
      timeToCompleteSeconds: getElapsedFormSeconds() ? String(getElapsedFormSeconds()) : "",
      lastStepViewed,
      lastStepCompleted,
    },
    consent: {
      acceptedPrivacy,
      privacyAcceptedAt: acceptedPrivacy ? createdAt : "",
    },
    whatsapp: {
      shortMessage,
      whatsappUrl,
    },
    crm: buildCrmPayloadStatus(),
    answers: {
      objetivo: getStateValue(state, "objetivo"),
      etapa: getStateValue(state, "etapa"),
      prioridad: getStateValue(state, "prioridad"),
      ruta: route,
      respuestasRuta: routeResponses,
    },
    preferences: {
      topNeeds: getMultiAnswerLabels(state, NEED_FIELD_IDS),
      maxNeedsAllowed: MAX_MULTI_SELECT,
    },
    propertyIntake: buildPropertyIntake(state, qualification),
    priceMindset,
    rentMindset,
    landDetails: buildLandDetails(state),
    qualificationLegacy: qualification,
    leadQualityRaw: leadQuality,
    internalReview,
    recommendedProperties: getRecommendedProperties(state, loadedProperties).map(
      getLeadPropertySummary
    ),
    legacyMetrics: {
      firstPageUrl: sanitizeText(firstPageUrl, 500),
      referrer: sanitizeText(document.referrer || "", 500),
    },
    shortWhatsAppMessage: shortMessage,
  };
}

async function submitLead(leadPayload) {
  const validation = validateLeadPayloadForCrm(leadPayload);

  if (!validation.valid) {
    setLeadCrmStatus(leadPayload, "failed");
    return { ok: false, mode: "failed", reason: validation.reason };
  }

  if (!isCrmReadyToSubmit()) {
    setLeadCrmStatus(leadPayload, CRM_DISABLED_MODE);
    return { ok: true, mode: CRM_DISABLED_MODE };
  }

  const submittedAt = new Date().toISOString();
  setLeadCrmStatus(leadPayload, "submitted", submittedAt);

  try {
    const response = await fetch(getCrmEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
      keepalive: true,
    });

    if (!response.ok) {
      setLeadCrmStatus(leadPayload, "failed");
      return { ok: false, mode: "failed" };
    }

    return { ok: true, mode: "submitted" };
  } catch (error) {
    setLeadCrmStatus(leadPayload, "failed");
    return { ok: false, mode: "failed" };
  }
}

async function prepareLeadPayload() {
  currentLeadPayload = buildLeadPayload(answers);
  const validation = validateLeadPayloadForCrm(currentLeadPayload);

  if (!validation.valid) {
    currentLeadSubmission = { ok: false, mode: "failed", reason: validation.reason };
    setLeadCrmStatus(currentLeadPayload, "failed");
    return false;
  }

  currentLeadSubmission = await submitLead(currentLeadPayload);
  return true;
}

function normalizeInventoryText(value) {
  return sanitizeText(value, OPEN_FIELD_MAX_LENGTH)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeProperty(rawProperty) {
  const topFeatures = Array.isArray(rawProperty.topFeatures)
    ? rawProperty.topFeatures.map((feature) => sanitizeText(feature, 80)).filter(Boolean)
    : [];
  const rawImages = Array.isArray(rawProperty.images) ? rawProperty.images : [];
  const facadeImage = sanitizeText(rawProperty.facadeImage || "", 300);
  const legacyImage = sanitizeText(rawProperty.image || "", 300);
  const submittedCoverImage = sanitizeText(rawProperty.coverImage || "", 300);
  const images = [
    facadeImage,
    submittedCoverImage,
    ...rawImages.map((image) => sanitizeText(image, 300)),
    legacyImage,
  ].filter(Boolean);
  const uniqueImages = [...new Set(images)].slice(0, 3);
  const coverImage = facadeImage || submittedCoverImage || uniqueImages[0] || "";
  const needsImageReview =
    Boolean(rawProperty.needsImageReview) || Boolean(coverImage && !facadeImage);

  return {
    id: sanitizeText(rawProperty.id || "", 120),
    title: sanitizeText(rawProperty.title || "", 160),
    operation: normalizeInventoryText(rawProperty.operation || ""),
    type: normalizeInventoryText(rawProperty.type || ""),
    price: Number.isFinite(Number(rawProperty.price)) ? Number(rawProperty.price) : 0,
    priceText: sanitizeText(rawProperty.priceText || "", 80),
    location: sanitizeText(rawProperty.location || "", 160),
    city: sanitizeText(rawProperty.city || "", 100),
    bedrooms: rawProperty.bedrooms ?? null,
    bathrooms: rawProperty.bathrooms ?? null,
    parking: rawProperty.parking ?? null,
    constructionM2: rawProperty.constructionM2 ?? null,
    landM2: rawProperty.landM2 ?? null,
    topFeatures,
    coverImage,
    facadeImage,
    images: uniqueImages,
    imageAlt: sanitizeText(rawProperty.imageAlt || "", 180),
    url: sanitizeText(rawProperty.url || "", 500),
    source: sanitizeText(rawProperty.source || "", 120),
    fetchedAt: sanitizeText(rawProperty.fetchedAt || "", 80),
    status: normalizeInventoryText(rawProperty.status || "activa"),
    needsImageReview,
  };
}

function isActiveProperty(property) {
  return !["vendida", "rentada", "inactiva"].includes(normalizeInventoryText(property.status));
}

function getPropertyImages(property) {
  const images = [
    property.facadeImage,
    property.coverImage,
    ...(Array.isArray(property.images) ? property.images : []),
  ].filter(Boolean);

  return [...new Set(images)].slice(0, 3);
}

function getPropertyCoverImage(property) {
  return property.coverImage || property.facadeImage || getPropertyImages(property)[0] || "";
}

function hasPropertyImage(property) {
  return Boolean(getPropertyCoverImage(property));
}

async function loadProperties() {
  try {
    const response = await fetch(PROPERTY_DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("properties_unavailable");
    }

    const properties = await response.json();
    loadedProperties = Array.isArray(properties)
      ? properties.map(normalizeProperty).filter((property) => property.id || property.title)
      : [];
  } catch {
    loadedProperties = [];
  }

  updateInventoryRecommendations(inventoryRecommendationState);
  return loadedProperties;
}

function getPropertyOperationPreference(objective) {
  if (objective === "comprar") {
    return "venta";
  }

  if (objective === "rentar") {
    return "renta";
  }

  if (objective === "invertir") {
    return "venta";
  }

  return "";
}

function getInventoryNeedTerms(state) {
  const terms = [];

  NEED_FIELD_IDS.forEach((id) => {
    const answer = getStateAnswer(state, id);
    if (!answer) {
      return;
    }

    const value = getStateValue(state, id);
    if (Array.isArray(value)) {
      value.forEach((item) => addUnique(terms, item));
    } else if (value) {
      addUnique(terms, value);
    }

    const label = getStateLabel(state, id);
    if (label && label !== "No proporcionado") {
      label.split(",").forEach((item) => addUnique(terms, item));
    }
  });

  return terms.map(normalizeInventoryText).filter(Boolean);
}

function getStateLocationTerms(state) {
  return [
    getStateLabel(state, "ciudad"),
    getFirstStateLabel(state, LOCATION_FIELD_IDS),
  ]
    .map(normalizeInventoryText)
    .filter((term) => term.length > 3);
}

function hasCompatibleLocation(state, property) {
  const propertyLocation = normalizeInventoryText(`${property.city} ${property.location}`);
  return getStateLocationTerms(state).some(
    (term) => propertyLocation.includes(term) || term.includes(propertyLocation)
  );
}

function hasCompatibleType(state, property) {
  const wantedType = normalizeInventoryText(getFirstStateValue(state, PROPERTY_TYPE_FIELD_IDS));
  const propertyType = normalizeInventoryText(property.type);

  if (!wantedType || !propertyType || wantedType === "aun_no_se") {
    return false;
  }

  return propertyType.includes(wantedType) || wantedType.includes(propertyType);
}

function hasCompatibleFeature(state, property) {
  const needTerms = getInventoryNeedTerms(state);
  const featureText = normalizeInventoryText((property.topFeatures || []).join(" "));

  if (!needTerms.length || !featureText) {
    return false;
  }

  return needTerms.some((term) => featureText.includes(term) || term.includes(featureText));
}

function getPropertyRecommendationScore(state, property) {
  const objective = getStateValue(state, "objetivo");
  const operationPreference = getPropertyOperationPreference(objective);
  let score = 0;

  if (operationPreference && property.operation === operationPreference) {
    score += 20;
  }

  if (
    objective === "invertir" &&
    property.operation === "venta" &&
    ["terreno", "departamento", "local", "local_oficina"].includes(property.type)
  ) {
    score += 12;
  }

  if (
    objective === "invertir" &&
    property.topFeatures.some((feature) =>
      /plusval[ií]a|renta|inversi[oó]n|rendimiento/i.test(feature)
    )
  ) {
    score += 8;
  }

  if (hasCompatibleLocation(state, property)) {
    score += 10;
  }

  if (hasCompatibleType(state, property)) {
    score += 8;
  }

  if (hasCompatibleFeature(state, property)) {
    score += 6;
  }

  if (property.facadeImage) {
    score += 6;
  } else if (hasPropertyImage(property)) {
    score += 4;
  }

  return score;
}

function getRecommendedProperties(state, properties) {
  const activeProperties = properties.filter(isActiveProperty);

  if (!activeProperties.length) {
    return [];
  }

  if (!state || !getStateValue(state, "objetivo")) {
    return activeProperties
      .map((property, index) => ({ property, index }))
      .sort(
        (a, b) =>
          Number(hasPropertyImage(b.property)) - Number(hasPropertyImage(a.property)) ||
          a.index - b.index
      )
      .slice(0, 3)
      .map((item) => item.property);
  }

  const scoredProperties = activeProperties
    .map((property, index) => ({
      property,
      score: getPropertyRecommendationScore(state, property),
      index,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const matches = scoredProperties.filter((item) => item.score > 0);

  if (matches.length) {
    return matches.slice(0, 6).map((item) => item.property);
  }

  return activeProperties
    .map((property, index) => ({ property, index }))
    .sort(
      (a, b) =>
        Number(hasPropertyImage(b.property)) - Number(hasPropertyImage(a.property)) ||
        a.index - b.index
    )
    .slice(0, 3)
    .map((item) => item.property);
}

function getLeadPropertySummary(property) {
  return {
    id: property.id,
    title: property.title,
    operation: property.operation,
    type: property.type,
    priceText: property.priceText,
    location: property.location,
    city: property.city,
    coverImage: getPropertyCoverImage(property),
    url: property.url,
    source: property.source,
  };
}

function updateInventoryRecommendations(state = null) {
  inventoryRecommendationState = state;
  renderPropertyCards(getRecommendedProperties(state, loadedProperties));

  if (currentLeadPayload) {
    currentLeadPayload.recommendedProperties = getRecommendedProperties(
      state || answers,
      loadedProperties
    ).map(getLeadPropertySummary);
  }
}

function formatPropertyType(type) {
  return sanitizeText(type || "", 60).replaceAll("_", " ");
}

function formatPropertyOperation(operation) {
  const normalized = normalizeInventoryText(operation);
  if (normalized === "venta") {
    return "Venta";
  }

  if (normalized === "renta") {
    return "Renta";
  }

  return sanitizeText(operation || "", 60);
}

function getPropertyTitle(property) {
  return property.title || property.location || property.city || "Propiedad";
}

function getPropertyPriceText(property) {
  if (property.priceText) {
    return property.priceText;
  }

  if (property.price > 0) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(property.price);
  }

  return "Precio por confirmar";
}

function appendPropertyText(parent, tagName, className, text) {
  const cleanText = sanitizeText(text || "", 160);
  if (!cleanText) {
    return;
  }

  parent.appendChild(createNode(tagName, className, cleanText));
}

function createPropertyMetric(label, value, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const metric = createNode("span", "property-metric");
  metric.textContent = `${label}: ${sanitizeText(value, 40)}${suffix}`;
  return metric;
}

function renderPropertyCards(properties) {
  if (!propertyGrid || !inventoryEmpty || !inventoryDisclaimer) {
    return;
  }

  clearNode(propertyGrid);
  const visibleProperties = properties.filter(isActiveProperty);
  inventoryEmpty.hidden = visibleProperties.length > 0;
  inventoryDisclaimer.hidden = visibleProperties.length === 0;

  if (!visibleProperties.length) {
    return;
  }

  visibleProperties.forEach((property) => {
    propertyGrid.appendChild(createPropertyCard(property));
  });
}

function createPropertyCard(property) {
  const card = createNode("article", "property-card");
  card.appendChild(createPropertyMedia(property));

  const body = createNode("div", "property-body");
  const tags = createNode("div", "property-tags");
  const operationLabel = formatPropertyOperation(property.operation);
  const typeLabel = formatPropertyType(property.type);

  appendPropertyText(tags, "span", "property-tag", operationLabel);
  appendPropertyText(tags, "span", "property-tag", typeLabel);
  body.appendChild(tags);

  appendPropertyText(body, "h3", "property-title", getPropertyTitle(property));
  appendPropertyText(body, "p", "property-price", getPropertyPriceText(property));
  appendPropertyText(body, "p", "property-location", property.location || property.city);

  const metrics = createNode("div", "property-metrics");
  [
    createPropertyMetric("Rec", property.bedrooms),
    createPropertyMetric("Baños", property.bathrooms),
    createPropertyMetric("Est", property.parking),
    createPropertyMetric("Const", property.constructionM2, " m2"),
    createPropertyMetric("Terreno", property.landM2, " m2"),
  ]
    .filter(Boolean)
    .forEach((metric) => metrics.appendChild(metric));

  if (metrics.childNodes.length) {
    body.appendChild(metrics);
  }

  if (property.topFeatures.length) {
    const features = createNode("div", "property-features");
    property.topFeatures.slice(0, 3).forEach((feature) => {
      appendPropertyText(features, "span", "property-feature", feature);
    });
    body.appendChild(features);
  }

  body.appendChild(createPropertyActions(property));
  card.appendChild(body);

  return card;
}

function createPropertyMedia(property) {
  const media = createNode("div", "property-media");
  const images = getPropertyImages(property);
  const coverImage = getPropertyCoverImage(property);
  const placeholder = createNode("div", "property-image-placeholder", "Imagen pendiente");

  media.appendChild(placeholder);

  if (coverImage) {
    const image = document.createElement("img");
    image.alt = property.imageAlt || getPropertyTitle(property);
    image.loading = "lazy";
    image.addEventListener("load", () => {
      placeholder.hidden = true;
    });
    image.addEventListener("error", () => {
      image.remove();
      placeholder.hidden = false;
    });
    image.src = coverImage;
    media.appendChild(image);
  }

  if (images.length > 1) {
    const thumbnails = createNode("div", "property-thumbnails");
    images.forEach((imageUrl, index) => {
      const button = createNode("button", "property-thumbnail");
      const thumbnail = document.createElement("img");

      button.type = "button";
      button.setAttribute("aria-label", `Ver imagen ${index + 1} de la propiedad`);
      thumbnail.src = imageUrl;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      thumbnail.addEventListener("error", () => {
        button.remove();
      });
      button.addEventListener("click", () => {
        const mainImage = media.querySelector(".property-main-image");
        if (mainImage) {
          mainImage.src = imageUrl;
          placeholder.hidden = true;
          thumbnails.querySelectorAll(".property-thumbnail").forEach((thumbnailButton) => {
            thumbnailButton.classList.remove("is-active");
          });
          button.classList.add("is-active");
        }
      });

      if (imageUrl === coverImage) {
        button.classList.add("is-active");
      }

      thumbnail.className = "property-thumbnail-image";
      button.appendChild(thumbnail);
      thumbnails.appendChild(button);
    });
    media.appendChild(thumbnails);
  }

  const mainImage = media.querySelector("img");
  if (mainImage) {
    mainImage.classList.add("property-main-image");
  }

  if (property.needsImageReview) {
    media.appendChild(createNode("span", "property-image-review", "Revisar imagen"));
  }

  return media;
}

function createPropertyActions(property) {
  const actions = createNode("div", "property-actions");

  if (property.url) {
    const link = createNode("a", "button button-ghost", "Ver propiedad");
    link.href = property.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    actions.appendChild(link);
  } else {
    const pending = createNode("button", "button button-disabled", "Ficha pendiente");
    pending.type = "button";
    pending.disabled = true;
    actions.appendChild(pending);
  }

  const askButton = createNode("button", "button button-primary", "Preguntar por esta opción");
  askButton.type = "button";
  askButton.addEventListener("click", () => {
    openPropertyWhatsapp(property);
  });
  actions.appendChild(askButton);

  return actions;
}

function openPropertyWhatsapp(property) {
  const name = sanitizeText(getStateLabel(answers, "nombre"), 80) || "una persona interesada";
  const title = sanitizeText(getPropertyTitle(property), 140);
  openWhatsappWithMessage(
    `Hola Ehecatl, soy ${name}. Me interesó una propiedad del inventario: ${title}. ¿Me ayudas a revisarla?`
  );
}

function renderQuestion({ shouldScroll = false, shouldFocus = false } = {}) {
  isFinished = false;
  const flow = getFlow();
  const question = flow[currentIndex];

  if (!question) {
    showFinish();
    return;
  }

  finishScreen.hidden = true;
  form.hidden = false;
  lastStepViewed = question.id;
  formError.hidden = true;
  formError.textContent = "";
  nextButton.textContent = getPrimaryButtonText(question, flow);
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

  if (shouldFocus) {
    titleNode.focus({ preventScroll: true });
  }

  if (shouldScroll) {
    scrollToCurrentQuestion();
  }
}

function renderControl(question) {
  if (question.type === "group") {
    const wrapper = createNode("div", "group-fields");

    getVisibleFields(question).forEach((field) => {
      const fieldBlock = createNode("div", "group-field");
      const fieldLabel = formatCopy(field.label || field.title);
      const fieldHelp = formatCopy(field.help);

      if (fieldLabel && field.type !== "checkbox") {
        fieldBlock.appendChild(createNode("p", "group-label", fieldLabel));
      }

      if (fieldHelp) {
        fieldBlock.appendChild(createNode("p", "group-help", fieldHelp));
      }

      fieldBlock.appendChild(renderFieldControl(field));
      wrapper.appendChild(fieldBlock);
    });

    return wrapper;
  }

  return renderFieldControl(question);
}

function renderFieldControl(question) {
  const saved = answers[question.id];
  const fragment = document.createDocumentFragment();

  if (question.type === "message") {
    return fragment;
  }

  if (question.type === "choice") {
    return renderChoiceList(question, saved);
  }

  if (question.type === "multichoice") {
    return renderMultiChoiceList(question, saved);
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
    return renderCheckbox(question, saved);
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

function renderChoiceList(question, saved) {
  const fieldset = createNode("fieldset", "choices");
  const grid = createNode("div", "choices-grid");
  const currentQuestion = getFlow()[currentIndex];
  const shouldRefreshGroup = groupHasDependentField(currentQuestion, question.id);

  question.options.forEach((option) => {
    const item = optionToObject(option);
    const label = createNode("label", "choice-control");
    const input = document.createElement("input");
    const text = createNode("span", "", item.label);

    input.type = "radio";
    input.name = question.id;
    input.value = item.value;
    input.checked = saved?.value === item.value;
    input.addEventListener("change", () => {
      if (!shouldRefreshGroup) {
        return;
      }

      storeDraftAnswersForQuestion(currentQuestion);
      renderQuestion({ shouldScroll: false, shouldFocus: false });
    });

    label.append(input, text);
    grid.appendChild(label);
  });

  fieldset.appendChild(grid);
  return fieldset;
}

function renderMultiChoiceList(question, saved) {
  const maxSelections = question.max || MAX_MULTI_SELECT;
  const selectedValues = Array.isArray(saved?.value) ? saved.value : [];
  const fieldset = createNode("fieldset", "choices multi-choice");
  const counter = createNode(
    "p",
    "multi-counter",
    `${selectedValues.length}/${maxSelections} seleccionadas`
  );
  const grid = createNode("div", "choices-grid");

  question.options.forEach((option) => {
    const item = optionToObject(option);
    const label = createNode("label", "choice-control");
    const input = document.createElement("input");
    const text = createNode("span", "", item.label);

    input.type = "checkbox";
    input.name = question.id;
    input.value = item.value;
    input.checked = selectedValues.includes(item.value);
    input.addEventListener("change", () => {
      const checkedCount = fieldset.querySelectorAll(`input[name="${question.id}"]:checked`).length;
      if (checkedCount > maxSelections) {
        input.checked = false;
        showError("Para recomendarte mejor, elige solo tus 3 prioridades más importantes.");
      }

      const currentCount = fieldset.querySelectorAll(`input[name="${question.id}"]:checked`).length;
      counter.textContent = `${currentCount}/${maxSelections} seleccionadas`;
    });

    label.append(input, text);
    grid.appendChild(label);
  });

  fieldset.append(counter, grid);
  return fieldset;
}

function renderCheckbox(question, saved) {
  const checked = saved?.value === true;
  const label = createNode("label", "checkbox-control");
  const input = document.createElement("input");
  const text = document.createElement("span");

  input.type = "checkbox";
  input.name = question.id;
  input.checked = checked;

  if (question.id === "consentimiento") {
    text.append(document.createTextNode("He leído y acepto el "));
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

function scrollToCurrentQuestion() {
  if (!hasUserInteracted) {
    return;
  }

  window.requestAnimationFrame(() => {
    const headerOffset = document.querySelector(".site-header")?.offsetHeight || 0;
    const targetTop =
      questionMount.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

    window.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: "smooth",
    });
  });
}

function getScrollBehavior() {
  return "scrollBehavior" in document.documentElement.style ? "auto" : "auto";
}

function getHashTarget(hash) {
  let id = "";
  try {
    id = decodeURIComponent(String(hash || "").replace(/^#/, ""));
  } catch {
    id = "";
  }

  return id ? document.getElementById(id) : null;
}

function handleInitialScrollPosition() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const hash = window.location.hash;
  window.requestAnimationFrame(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
      return;
    }

    const target = getHashTarget(hash);
    if (target) {
      target.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
  });
}

function validateSafeText(value, question) {
  const maxLength = getMaxLengthForQuestion(question);
  const cleaned = question.type === "textarea" ? sanitizeOpenText(value, maxLength) : sanitizeText(value, maxLength);

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

  if (!cleaned) {
    return { isValid: true, value: "" };
  }

  if (question.id === "nombre") {
    const nameError = getNameValidationError(cleaned);
    if (nameError) {
      return {
        isValid: false,
        message: nameError,
      };
    }
  }

  if (question.id === "ciudad") {
    if (!isValidCity(cleaned)) {
      return {
        isValid: false,
        message: "Escribe la ciudad sin símbolos especiales.",
      };
    }
  }

  if (GENERAL_LOCATION_FIELD_IDS.has(question.id)) {
    if (!isValidGeneralLocation(cleaned)) {
      return {
        isValid: false,
        message: "Escribe solo una zona, colonia o referencia general sin símbolos especiales.",
      };
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
  return getFlow().findIndex(hasMissingRequiredAnswer);
}

function hasMissingRequiredAnswer(question) {
  if (question.type === "message") {
    return false;
  }

  if (question.type === "group") {
    return getVisibleFields(question).some(hasMissingRequiredAnswer);
  }

  if (!question.required) {
    return false;
  }

  const answer = answers[question.id];
  if (question.type === "checkbox") {
    return answer?.value !== true;
  }

  if (question.type === "multichoice") {
    return !Array.isArray(answer?.value) || answer.value.length === 0;
  }

  return !answer || !String(answer.value || "").trim();
}

function canSubmit() {
  if (isLikelyBot()) {
    return false;
  }

  const firstMissingIndex = getFirstMissingRequiredIndex();
  if (firstMissingIndex >= 0) {
    currentIndex = firstMissingIndex;
    renderQuestion({ shouldScroll: true, shouldFocus: true });
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

function storeDraftAnswersForQuestion(question) {
  if (!question) {
    return;
  }

  if (question.type === "group") {
    getVisibleFields(question).forEach(storeDraftAnswerForField);
    return;
  }

  storeDraftAnswerForField(question);
}

function storeDraftAnswerForField(question) {
  if (question.type === "choice") {
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    if (!checked) {
      return;
    }

    const selected = question.options.map(optionToObject).find((item) => item.value === checked.value);
    if (selected) {
      answers[question.id] = selected;
      syncInternalFlags(question, selected);
    }
    return;
  }

  if (question.type === "multichoice") {
    const values = [...form.querySelectorAll(`input[name="${question.id}"]:checked`)].map(
      (input) => input.value
    );
    const labels = getSelectedLabels(question, values);
    const answer = {
      value: values,
      label: labels.join(", ") || "No proporcionado",
    };

    answers[question.id] = answer;
    syncInternalFlags(question, answer);
    return;
  }

  if (question.type === "checkbox") {
    const checkbox = form.querySelector(`input[name="${question.id}"]`);
    if (!checkbox) {
      return;
    }

    answers[question.id] = {
      value: checkbox.checked,
      label: checkbox.checked ? "Aceptado" : "No aceptado",
    };
    syncInternalFlags(question, answers[question.id]);
    return;
  }

  const field = form.querySelector(`[name="${question.id}"]`);
  if (!field) {
    return;
  }

  const value =
    question.inputType === "tel"
      ? normalizePhone(field.value)
      : sanitizeText(field.value, getMaxLengthForQuestion(question));

  answers[question.id] = {
    value,
    label: value || "No proporcionado",
  };
  syncInternalFlags(question, answers[question.id]);
}

function validateAndStore(question) {
  markFormStarted();

  if (isLikelyBot()) {
    return false;
  }

  if (question.type === "message") {
    return true;
  }

  if (question.type === "group") {
    const visibleFields = getVisibleFields(question);
    question.fields
      .filter((field) => !visibleFields.includes(field))
      .forEach(clearAnswerForField);

    return visibleFields.every(validateFieldAndStore);
  }

  return validateFieldAndStore(question);
}

function validateFieldAndStore(question) {
  currentLeadPayload = null;
  currentLeadSubmission = null;

  if (question.type === "choice") {
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    if (!checked) {
      showError("Elige la opción que más se acerque a tu caso para poder orientarte mejor.");
      return false;
    }

    const selected = question.options.map(optionToObject).find((item) => item.value === checked.value);
    const previousObjective = answers.objetivo?.value;
    const previousValue = answers[question.id]?.value;

    answers[question.id] = selected;
    syncInternalFlags(question, selected);

    if (question.id === "objetivo" && previousObjective && previousObjective !== selected.value) {
      clearRouteAnswers();
    }

    if (PRIMARY_TYPE_FIELDS.has(question.id) && previousValue && previousValue !== selected.value) {
      clearAnswersByPrefix(question.id.replace(/_tipo$/, ""), question.id);
    }

    return true;
  }

  if (question.type === "multichoice") {
    const maxSelections = question.max || MAX_MULTI_SELECT;
    const checked = [...form.querySelectorAll(`input[name="${question.id}"]:checked`)];

    if (question.required && checked.length === 0) {
      showError("Elige al menos una prioridad para poder orientarte mejor.");
      return false;
    }

    if (checked.length > maxSelections) {
      showError("Para recomendarte mejor, elige solo tus 3 prioridades más importantes.");
      return false;
    }

    const values = checked.map((input) => input.value);
    const labels = getSelectedLabels(question, values);
    const answer = {
      value: values,
      label: labels.join(", ") || "No proporcionado",
    };

    answers[question.id] = answer;
    syncInternalFlags(question, answer);
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
    syncInternalFlags(question, answers[question.id]);
    return true;
  }

  const field = form.querySelector(`[name="${question.id}"]`);
  const rawValue = field.value;

  if (question.inputType === "tel") {
    if (!isValidPhone(rawValue)) {
      showError("Escribe tu WhatsApp únicamente con números, de 10 a 15 dígitos.");
      field.focus();
      return false;
    }

    const digits = normalizePhone(rawValue);
    answers[question.id] = {
      value: digits,
      label: digits,
    };
    syncInternalFlags(question, answers[question.id]);
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

  syncInternalFlags(question, answers[question.id]);
  return true;
}

function syncInternalFlags(question, answer) {
  const value = answer?.value;

  if (question.statePath) {
    setNestedState(question.statePath, Array.isArray(value) ? value : []);
  }

  if (question.id === "vender_precio_base" || question.id === "valuacion_precio_base") {
    if (UNCLEAR_PRICE_BASIS.has(value)) {
      answers.precio_requiere_validacion = {
        value: true,
        label: "Sí",
        internal: true,
      };
    } else {
      delete answers.precio_requiere_validacion;
    }
  }

  if (question.id === "poner_renta_precio_base") {
    if (UNCLEAR_PRICE_BASIS.has(value)) {
      answers.renta_requiere_validacion = {
        value: true,
        label: "Sí",
        internal: true,
      };
    } else {
      delete answers.renta_requiere_validacion;
    }
  }

  if (LAND_STATUS_FIELDS.has(question.id)) {
    if (HIGH_RISK_LAND_STATUS.has(value)) {
      answers.riesgo_revision = {
        value: "alto",
        label: "Alto",
        internal: true,
      };
      answers.requiere_revision_profesional = {
        value: true,
        label: "Sí",
        internal: true,
      };
      answers.checks_recomendados = {
        value: LAND_REVIEW_CHECKS,
        label: LAND_REVIEW_CHECKS.join(", "),
        internal: true,
      };
    } else {
      deleteLandRiskFlags();
    }
  }
}

function clearAnswerForField(question) {
  delete answers[question.id];
  if (question.statePath) {
    setNestedState(question.statePath, []);
  }

  if (LAND_STATUS_FIELDS.has(question.id)) {
    deleteLandRiskFlags();
  }

  if (question.id === "vender_precio_base" || question.id === "valuacion_precio_base") {
    delete answers.precio_requiere_validacion;
  }

  if (question.id === "poner_renta_precio_base") {
    delete answers.renta_requiere_validacion;
  }
}

function deleteLandRiskFlags() {
  delete answers.riesgo_revision;
  delete answers.requiere_revision_profesional;
  delete answers.checks_recomendados;
}

function deleteInternalRouteFlags() {
  delete answers.precio_requiere_validacion;
  delete answers.renta_requiere_validacion;
  deleteLandRiskFlags();
}

function clearAnswersByPrefix(prefix, keepId) {
  Object.keys(answers).forEach((id) => {
    if (id !== keepId && id.startsWith(`${prefix}_`)) {
      delete answers[id];
    }
  });

  deleteInternalRouteFlags();
  resetRouteState();
}

function clearRouteAnswers() {
  allRouteQuestionIds.forEach((id) => {
    delete answers[id];
  });
  resetRouteState();
  currentLeadPayload = null;
  currentLeadSubmission = null;
}

async function showFinish() {
  const firstMissingIndex = getFirstMissingRequiredIndex();
  if (firstMissingIndex >= 0) {
    currentIndex = firstMissingIndex;
    renderQuestion({ shouldScroll: true, shouldFocus: true });
    showError("Revisa esta respuesta para poder continuar con seguridad.");
    return;
  }

  if (!(await prepareLeadPayload())) {
    currentIndex = Math.max(0, getFlow().length - 1);
    renderQuestion({ shouldScroll: true, shouldFocus: true });
    showError("Revisa tus datos de contacto y consentimiento antes de continuar.");
    return;
  }

  updateInventoryRecommendations(answers);
  isFinished = true;
  form.hidden = true;
  finishScreen.hidden = false;
  finishTitle.textContent = `Gracias, ${getFirstName()}. Ya tengo una idea más clara de lo que necesitas.`;
  finishMessage.textContent = FINISH_DEFAULT_MESSAGE;
  progressBar.style.width = "100%";
  progressLabel.textContent = "Solicitud completa";
  progressPercent.textContent = "100%";
  if (hasUserInteracted) {
    finishScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function buildWhatsappUrl(message) {
  const phone = WHATSAPP_DESTINO.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function buildWhatsappMessage(state = answers) {
  const name = sanitizeText(getStateLabel(state, "nombre") || "", 80) || "gracias";
  const objective = getStateValue(state, "objetivo");
  const etapa = getStateValue(state, "etapa");
  const venderTiempo = getStateValue(state, "vender_tiempo");
  const wantsToMoveSoon = etapa === "avanzar_pronto" || venderTiempo === "urgente";

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
    terreno: `Hola Ehecatl, soy ${name}. Acabo de responder tu asesoría sobre un terreno y me gustaría que me ayudes a ordenar el caso.`,
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hasUserInteracted = true;
  markFormStarted();
  const flow = getFlow();
  const question = flow[currentIndex];

  if (!validateAndStore(question)) {
    return;
  }

  lastStepCompleted = question.id;
  currentIndex += 1;

  if (currentIndex >= getFlow().length) {
    await showFinish();
    return;
  }

  renderQuestion({ shouldScroll: true, shouldFocus: true });
});

form.addEventListener("focusin", markFormStarted);
form.addEventListener("input", markFormStarted);

backButton.addEventListener("click", () => {
  hasUserInteracted = true;
  currentIndex = Math.max(0, currentIndex - 1);
  renderQuestion({ shouldScroll: true, shouldFocus: true });
});

sendWhatsappButton.addEventListener("click", async () => {
  hasUserInteracted = true;
  const now = Date.now();
  if (now < whatsappUnlockAt || !canSubmit()) {
    return;
  }

  if (!currentLeadPayload && !(await prepareLeadPayload())) {
    showError("Revisa tus datos de contacto y consentimiento antes de abrir WhatsApp.");
    return;
  }

  whatsappUnlockAt = now + WHATSAPP_SEND_LOCK_MS;
  sendWhatsappButton.disabled = true;
  sendWhatsappButton.textContent = "Abriendo WhatsApp...";
  finishMessage.textContent = FINISH_DEFAULT_MESSAGE;
  openWhatsappWithMessage(currentLeadPayload.shortWhatsAppMessage || buildWhatsappMessage());
  window.setTimeout(() => {
    sendWhatsappButton.disabled = false;
    sendWhatsappButton.textContent = "Enviar por WhatsApp";
  }, WHATSAPP_SEND_LOCK_MS);
});

document.querySelectorAll("[data-whatsapp-quick]").forEach((button) => {
  button.addEventListener("click", () => {
    hasUserInteracted = true;
    openQuickWhatsapp();
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = getHashTarget(anchor.hash);
    if (!target) {
      return;
    }

    hasUserInteracted = true;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", anchor.hash);
  });
});

renderQuestion();
loadProperties();
handleInitialScrollPosition();
