const WHATSAPP_DESTINO = "5214439484031";

const baseQuestions = [
  {
    id: "nombre",
    type: "text",
    inputType: "text",
    kicker: "Antes de empezar",
    title: "Antes de empezar, ¿cómo te llamas?",
    summaryTitle: "Nombre",
    help: "Así puedo dirigirme a ti de forma más personal durante esta asesoría.",
    required: true,
    placeholder: "Tu nombre",
    autocomplete: "given-name",
  },
  {
    id: "objetivo",
    type: "choice",
    kicker: "Primer contexto",
    title: ({ name }) => `Mucho gusto, ${name}. ¿Qué te gustaría lograr?`,
    summaryTitle: "¿Qué te gustaría lograr?",
    help: "Con esto puedo entender mejor tu situación antes de recomendarte algo.",
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
    title: ({ name }) => `${name}, ¿en qué etapa estás?`,
    summaryTitle: "¿En qué etapa estás?",
    help: "No importa si apenas estás explorando. La idea es orientarte sin presión y con claridad.",
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
    title: "¿Qué te gustaría cuidar más en este proceso?",
    summaryTitle: "¿Qué te gustaría cuidar más en este proceso?",
    help: "Esta parte me ayuda a entender qué es lo más importante para ti, más allá de solo ver precios o propiedades.",
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
    kicker: "Vamos bien",
    title: ({ name }) => `Gracias, ${name}. Ya voy entendiendo mejor tu caso.`,
    help:
      "Ahora te haré unas preguntas más específicas según lo que buscas. La idea es no hacerte perder tiempo con opciones o información que no vaya contigo.",
    cta: "Continuar",
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
      placeholder: "Ej. Narvarte, Del Valle, Coyoacán, cerca de mi trabajo...",
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
      title: "¿En qué zona se encuentra la propiedad?",
      help: "No necesito la dirección exacta todavía; con colonia y ciudad es suficiente para iniciar.",
      required: true,
      placeholder: "Ej. Colonia, municipio o ciudad",
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
      title: "¿En qué zona se encuentra la propiedad?",
      help: "No hace falta dirección exacta; una referencia general basta para empezar.",
      required: true,
      placeholder: "Colonia, ciudad o referencia principal",
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
      title: "¿En qué zona se encuentra la propiedad?",
      help: "La ubicación es clave para comparar con referencias reales de mercado.",
      required: true,
      placeholder: "Colonia, ciudad y referencias útiles",
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
    labelHtml:
      'Acepto que Erick Ehecatl Carro Milian, asesor inmobiliario vinculado con Century 21 Edyfico, me contacte por los medios proporcionados para dar seguimiento a mi solicitud inmobiliaria. He leído y acepto el <a href="aviso-privacidad.html" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>.',
  },
];

const answers = {};
let currentIndex = 0;
let isFinished = false;

const form = document.querySelector("#advisoryForm");
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
  return [...baseQuestions, ...route, ...contactQuestions];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  const help = helpText ? `<p class="question-help">${escapeHtml(helpText)}</p>` : "";
  questionMount.innerHTML = `
    <p class="question-kicker">${escapeHtml(formatCopy(question.kicker) || "Asesoría")}</p>
    <h3 class="question-title" tabindex="-1">${escapeHtml(title)}</h3>
    ${help}
    ${renderControl(question)}
  `;

  updateProgress();

  const focusTarget = questionMount.querySelector(".question-title");
  if (focusTarget) {
    focusTarget.focus({ preventScroll: true });
  }
}

function renderControl(question) {
  const saved = answers[question.id];

  if (question.type === "message") {
    return "";
  }

  if (question.type === "choice") {
    const options = question.options
      .map((option) => {
        const item = optionToObject(option);
        const checked = saved?.value === item.value ? "checked" : "";
        return `
          <label class="choice-control">
            <input type="radio" name="${escapeHtml(question.id)}" value="${escapeHtml(item.value)}" ${checked}>
            <span>${escapeHtml(item.label)}</span>
          </label>
        `;
      })
      .join("");

    return `
      <fieldset class="choices">
        <div class="choices-grid">${options}</div>
      </fieldset>
    `;
  }

  if (question.type === "textarea") {
    return `
      <textarea
        class="field-control"
        name="${escapeHtml(question.id)}"
        placeholder="${escapeHtml(question.placeholder || "")}"
        ${question.required ? "required" : ""}
      >${escapeHtml(saved?.value || "")}</textarea>
    `;
  }

  if (question.type === "checkbox") {
    const checked = saved?.value === true ? "checked" : "";
    const label = question.labelHtml || escapeHtml(question.label || "");
    return `
      <label class="checkbox-control">
        <input type="checkbox" name="${escapeHtml(question.id)}" ${checked}>
        <span>${label}</span>
      </label>
    `;
  }

  return `
    <input
      class="field-control"
      type="${escapeHtml(question.inputType || "text")}"
      name="${escapeHtml(question.id)}"
      value="${escapeHtml(saved?.value || "")}"
      placeholder="${escapeHtml(question.placeholder || "")}"
      autocomplete="${escapeHtml(question.autocomplete || "off")}"
      ${question.inputType === "tel" ? 'inputmode="tel"' : ""}
      ${question.required ? "required" : ""}
    >
  `;
}

function updateProgress() {
  const flow = getFlow();
  const percent = flow.length ? Math.round((currentIndex / flow.length) * 100) : 100;
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `Paso ${Math.min(currentIndex + 1, flow.length)} de ${flow.length}`;
  progressPercent.textContent = `${percent}%`;
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function validateAndStore(question) {
  if (question.type === "message") {
    return true;
  }

  if (question.type === "choice") {
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    if (!checked) {
      showError("Selecciona una opción para continuar.");
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
      showError("Necesito tu consentimiento para poder dar seguimiento.");
      return false;
    }

    answers[question.id] = {
      value: checked,
      label: checked ? "Aceptado" : "No aceptado",
    };
    return true;
  }

  const field = form.querySelector(`[name="${question.id}"]`);
  const value = field.value.trim();

  if (question.required && !value) {
    const message =
      question.id === "nombre"
        ? "Dime tu nombre para poder dirigirme a ti durante la asesoría."
        : "Completa este dato para continuar.";
    showError(message);
    field.focus();
    return false;
  }

  if (question.inputType === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError("Escribe un correo electrónico válido o deja el campo vacío.");
    field.focus();
    return false;
  }

  if (question.inputType === "tel") {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      showError("Escribe un número de WhatsApp válido.");
      field.focus();
      return false;
    }
  }

  answers[question.id] = {
    value,
    label: value || "No proporcionado",
  };

  return true;
}

function clearRouteAnswers() {
  allRouteQuestionIds.forEach((id) => {
    delete answers[id];
  });
}

function showFinish() {
  isFinished = true;
  form.hidden = true;
  finishScreen.hidden = false;
  finishTitle.textContent = `Gracias, ${getFirstName()}. Ya tengo una idea más clara de lo que necesitas.`;
  finishMessage.textContent =
    "Revisaré tus respuestas y me pondré en contacto contigo para orientarte según tu objetivo inmobiliario.";
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
  const flow = getFlow().filter((question) => question.type !== "message");
  const name = answers.nombre?.label || "";
  const intro = name
    ? `Hola Ehecatl, soy ${name}. Quiero dar seguimiento a mi solicitud inmobiliaria.`
    : "Hola Ehecatl, quiero dar seguimiento a mi solicitud inmobiliaria.";

  const lines = [
    intro,
    "",
    "Respuestas:",
    ...flow.map((question) => {
      const answer = answers[question.id];
      const label = answer?.label || "Sin respuesta";
      return `- ${getQuestionLabel(question)}: ${label}`;
    }),
  ];

  return lines.join("\n");
}

function openWhatsappWithMessage(message) {
  window.open(buildWhatsappUrl(message), "_blank", "noopener");
}

function openQuickWhatsapp() {
  openWhatsappWithMessage(
    "Hola Ehecatl, me gustaría recibir asesoría inmobiliaria inicial."
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
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

backButton.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  renderQuestion();
});

sendWhatsappButton.addEventListener("click", () => {
  openWhatsappWithMessage(buildWhatsappMessage());
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
