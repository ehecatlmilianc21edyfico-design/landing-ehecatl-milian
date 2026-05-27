# CRM PerfiladorEMC21 MARK I

Esta guia documenta la conexion segura:

```text
Landing -> Make Webhook -> Airtable
```

Reglas permanentes:

- No conectar Airtable directo desde el frontend.
- No poner tokens, API keys ni secretos en GitHub Pages.
- No guardar datos personales en `localStorage` ni `sessionStorage`.
- No imprimir datos personales en `console.log`.
- Si Make o Airtable fallan, el usuario debe poder continuar por WhatsApp.

## 1. Configuracion del frontend

La landing usa esta configuracion en `script.js`:

```js
const CRM_CONFIG = {
  enabled: false,
  endpoint: "",
  mode: "make",
};
```

Mientras `enabled` sea `false` o `endpoint` este vacio, `submitLead(leadPayload)` no envia datos y devuelve:

```js
{ ok: true, mode: "disabled" }
```

Cuando Make ya tenga un webhook listo:

```js
const CRM_CONFIG = {
  enabled: true,
  endpoint: "https://hook.us1.make.com/...",
  mode: "make",
};
```

No colocar aqui credenciales de Airtable. Solo se permite la URL del webhook de Make.

## 2. Crear cuenta en Airtable

1. Crear o usar una cuenta de Airtable.
2. Crear una base nueva llamada:

```text
PerfiladorEMC21 CRM
```

3. Crear una tabla llamada:

```text
Leads
```

## 3. Campos sugeridos en Airtable

Crear estos campos en la tabla `Leads`:

- `lead_id`
- `fecha`
- `nombre`
- `whatsapp`
- `correo`
- `ciudad`
- `objetivo`
- `ruta`
- `score`
- `temperatura`
- `urgencia`
- `calidad_lead`
- `bot_risk_score`
- `should_notify_advisor`
- `etapa_pipeline`
- `accion_recomendada`
- `estado_credito`
- `tipo_credito`
- `requiere_orientacion_credito`
- `tipo_propiedad`
- `zona_general`
- `presupuesto`
- `precio_en_mente`
- `renta_estimada`
- `necesidades_top3`
- `notas_comerciales`
- `notas_legales`
- `puntos_a_revisar`
- `medio_preferido`
- `horario_preferido`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `mensaje_whatsapp_corto`
- `estatus_comercial`
- `observaciones`

Tipos recomendados:

- Texto corto: IDs, nombre, telefono, ciudad, objetivo, ruta, temperatura, urgencia.
- Numero: `score`, `bot_risk_score`.
- Checkbox: `should_notify_advisor`, `requiere_orientacion_credito`.
- Texto largo: notas, puntos a revisar, observaciones, mensaje de WhatsApp.
- Fecha/hora: `fecha`.

## 4. Vistas recomendadas

- 🔥 Leads utiles / urgentes
- Contactar hoy
- Cita por agendar
- Curiosos
- Sospechosos
- Probable bot
- Revision legal/comercial
- Compradores con credito
- Compradores por orientar

Filtros sugeridos:

- Leads utiles / urgentes: `should_notify_advisor = true`.
- Contactar hoy: `etapa_pipeline = Contactar hoy`.
- Cita por agendar: `etapa_pipeline = Cita por agendar`.
- Curiosos: `calidad_lead = curious`.
- Sospechosos: `calidad_lead = suspicious`.
- Probable bot: `calidad_lead = probable_bot`.
- Compradores con credito: `requiere_orientacion_credito = false` y `estado_credito` no vacio.
- Compradores por orientar: `requiere_orientacion_credito = true`.

## 5. Crear escenario en Make

1. Crear un escenario nuevo en Make.
2. Agregar modulo `Custom Webhook`.
3. Crear un webhook nuevo para el PerfiladorEMC21.
4. Copiar la URL del webhook.
5. Pegar la URL en `CRM_CONFIG.endpoint` y cambiar `enabled` a `true` solo cuando se vaya a probar.
6. Enviar un lead de prueba desde la landing para que Make detecte la estructura JSON.
7. Agregar modulo `Parse JSON` si Make no infiere correctamente la estructura.
8. Agregar modulo `Airtable -> Create a record`.
9. Conectar Airtable dentro de Make usando las credenciales de Airtable.
10. Mapear campos desde el `leadPayload`.
11. Agregar un `Router` para notificaciones.

## 6. Mapeo sugerido Make -> Airtable

- `lead_id` <- `leadId`
- `fecha` <- `createdAt`
- `nombre` <- `contact.nombre`
- `whatsapp` <- `contact.whatsapp`
- `correo` <- `contact.correo`
- `ciudad` <- `contact.ciudad`
- `objetivo` <- `intent.objetivo`
- `ruta` <- `intent.ruta`
- `score` <- `qualification.score`
- `temperatura` <- `qualification.temperatura`
- `urgencia` <- `qualification.urgencia`
- `calidad_lead` <- `leadQuality.calidadLead`
- `bot_risk_score` <- `leadQuality.botRiskScore`
- `should_notify_advisor` <- `leadQuality.shouldNotifyAdvisor`
- `etapa_pipeline` <- `qualification.etapaPipeline`
- `accion_recomendada` <- `qualification.accionRecomendada`
- `estado_credito` <- `financingReadiness.creditStatus`
- `tipo_credito` <- `financingReadiness.creditType`
- `requiere_orientacion_credito` <- `financingReadiness.needsCreditGuidance`
- `tipo_propiedad` <- `propertyContext.tipoPropiedad`
- `zona_general` <- `propertyContext.zonaGeneral`
- `presupuesto` <- `propertyContext.presupuesto`
- `precio_en_mente` <- `propertyContext.precioEnMente`
- `renta_estimada` <- `propertyContext.rentaEstimada`
- `necesidades_top3` <- `propertyContext.necesidadesTop3`
- `notas_comerciales` <- `internalNotes.notasComerciales`
- `notas_legales` <- `internalNotes.notasLegales`
- `puntos_a_revisar` <- `internalNotes.puntosARevisar`
- `medio_preferido` <- `contact.medioPreferido`
- `horario_preferido` <- `contact.horarioPreferido`
- `utm_source` <- `utm.utm_source`
- `utm_medium` <- `utm.utm_medium`
- `utm_campaign` <- `utm.utm_campaign`
- `utm_content` <- `utm.utm_content`
- `utm_term` <- `utm.utm_term`
- `mensaje_whatsapp_corto` <- `whatsapp.shortMessage`
- `estatus_comercial` <- valor inicial en Make, por ejemplo `Nuevo`
- `observaciones` <- campo manual para el asesor

Si Airtable no acepta arrays directamente, convertir listas como `necesidadesTop3`, `notasComerciales`, `notasLegales` y `puntosARevisar` a texto separado por saltos de linea desde Make.

## 7. Notificaciones

Agregar un `Router` despues de crear el registro en Airtable.

Ruta de alerta:

- Condicion: `leadQuality.shouldNotifyAdvisor = true`.
- Accion: mandar email o Telegram al asesor.
- Mensaje sugerido: nombre, objetivo, ciudad, temperatura, urgencia y accion recomendada.

Ruta sin alerta urgente:

- Condicion: `leadQuality.calidadLead = suspicious` o `leadQuality.calidadLead = probable_bot`.
- Accion: guardar en Airtable sin alerta urgente.
- Motivo: estos leads pueden revisarse manualmente, pero no deben saturar al asesor.

`probable_bot` puede guardarse en Airtable para auditoria, pero no debe activar notificacion urgente.

## 8. Probar con lead de prueba

1. Mantener `CRM_CONFIG.enabled = false` y verificar que la landing cierre normal por WhatsApp.
2. Activar temporalmente:

```js
const CRM_CONFIG = {
  enabled: true,
  endpoint: "URL_DEL_WEBHOOK_DE_MAKE",
  mode: "make",
};
```

3. Completar una ruta real del formulario.
4. Confirmar que Make recibe JSON.
5. Confirmar que Airtable crea el registro.
6. Confirmar que el boton de WhatsApp sigue funcionando.
7. Probar un caso sospechoso o `probable_bot` y confirmar que no dispara alerta urgente.
8. Si algo falla en Make, la landing no debe mostrar errores tecnicos al usuario.

## 9. Estado esperado del payload CRM

El `leadPayload` incluye:

```js
crm: {
  submitAttempted: false,
  submitStatus: "disabled",
  submittedAt: "",
  crmMode: "make",
  crmEndpointConfigured: false,
}
```

Cuando el envio a Make funciona:

```js
crm: {
  submitAttempted: true,
  submitStatus: "submitted",
  submittedAt: "fecha ISO",
  crmMode: "make",
  crmEndpointConfigured: true,
}
```

Cuando falla Make o Airtable:

```js
crm: {
  submitAttempted: true,
  submitStatus: "failed",
  submittedAt: "",
  crmMode: "make",
  crmEndpointConfigured: true,
}
```

El usuario no ve estos datos internos.
