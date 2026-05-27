# Analytics interno del PerfiladorEMC21 MARK I.2

Este sistema mide comportamiento de la landing y del perfilador sin enviar datos personales.
El webhook de analytics es independiente del webhook de leads del CRM.

## Configuracion

En `script.js` existe:

```js
const ANALYTICS_CONFIG = {
  enabled: true,
  endpoint: "PENDIENTE_ENDPOINT_ANALYTICS_MAKE",
  mode: "make",
};
```

Mientras `endpoint` no sea una URL HTTPS valida, no se envia nada y la landing funciona normal.
Cuando Make tenga el webhook de metricas, reemplazar el valor por la URL publica del webhook.

## Eventos medidos

- `page_view`: carga de la pagina.
- `hero_cta_clicked`: clic en el boton principal para iniciar la asesoria.
- `form_started`: primera interaccion con el formulario.
- `step_viewed`: cada pantalla/pregunta mostrada.
- `step_completed`: cada pantalla/pregunta completada.
- `form_completed`: formulario finalizado correctamente.
- `form_abandoned`: usuario que inicio, avanzo al menos un paso y salio antes de terminar.
- `whatsapp_final_clicked`: clic en el boton final de WhatsApp.
- `inventory_clicked`: clic en inventario completo o ficha de inventario.
- `lead_sent_to_crm`: lead enviado correctamente al webhook de CRM.
- `lead_submit_failed`: fallo al validar o enviar lead al CRM.

## Datos enviados

Cada evento incluye:

- `eventName`
- `eventId`
- `sessionId`
- `timestamp`
- `pageUrl`
- `referrer`
- `route`
- `stepId`
- `stepTitle`
- `stepIndex`
- `totalSteps`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `deviceInfo`
- `device_type`
- `viewportWidth`
- `viewportHeight`
- `formElapsedSeconds`
- `stepsViewedCount`

`sessionId` es anonimo y se guarda solo en `sessionStorage`.

## Datos que NO se envian

Analytics no envia:

- nombre
- WhatsApp
- telefono
- correo
- ciudad capturada
- respuestas abiertas del usuario
- notas internas comerciales o legales
- leadPayload completo
- mensaje de WhatsApp

Los eventos tampoco se muestran al usuario y no bloquean el formulario si Make falla.

## Webhook de Make para metricas

1. Crear un escenario nuevo en Make.
2. Agregar modulo `Custom Webhook`.
3. Nombrarlo, por ejemplo: `PerfiladorEMC21 Analytics`.
4. Copiar la URL del webhook.
5. Pegarla en `ANALYTICS_CONFIG.endpoint`.
6. Ejecutar `Run once`.
7. Abrir la landing y generar eventos de prueba.
8. Confirmar que Make recibe JSON con `eventName`, `eventId` y `sessionId`.

No reutilizar el webhook de leads. Analytics debe ir a un escenario separado.
Si Make entrega un dominio distinto a `hook.us2.make.com`, agregar ese dominio a `connect-src` en la CSP antes de publicar.

## Airtable sugerido

Crear tabla `AnalyticsEvents` con estos campos:

- `event_id`
- `session_id`
- `event_name`
- `timestamp`
- `page_url`
- `referrer`
- `route`
- `step_id`
- `step_title`
- `step_index`
- `total_steps`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `device_type`
- `viewport_width`
- `viewport_height`

Crear tabla `FormSessions` con estos campos:

- `session_id`
- `first_seen_at`
- `last_seen_at`
- `route`
- `started_form`
- `completed_form`
- `last_step_id`
- `last_step_title`
- `steps_viewed_count`
- `total_steps`
- `completion_rate`
- `abandoned`
- `completed`
- `utm_source`
- `utm_medium`
- `utm_campaign`

## Escenario Make recomendado

1. `Custom Webhook`: recibe evento.
2. `Parse JSON`: opcional si Make no detecta estructura.
3. `Create Record` en `AnalyticsEvents`.
4. Buscar o crear sesion en `FormSessions` por `session_id`.
5. Actualizar `last_seen_at`, `last_step_id`, `last_step_title`, `steps_viewed_count` y `route`.
6. Si `event_name = form_completed`, marcar `completed = true`.
7. Si `event_name = form_abandoned`, marcar `abandoned = true`.

## UTM para campanas

Usar enlaces como:

```text
https://ehecatlinmuebles.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=morelia_rentas_low_cost&utm_content=video_01&utm_term=renta_morelia#asesoria
```

Recomendacion:

- `utm_source`: plataforma, por ejemplo `facebook`, `instagram`, `google`.
- `utm_medium`: tipo de trafico, por ejemplo `cpc`, `organic`, `whatsapp`.
- `utm_campaign`: nombre de campana.
- `utm_content`: anuncio, pieza o variante.
- `utm_term`: palabra clave o segmento.

## Como interpretar metricas

Tasa de inicio:
Comparar `form_started` contra `page_view`. Indica si la landing invita a empezar.

Tasa de finalizacion:
Comparar `form_completed` contra `form_started`. Indica si el perfilador se siente claro y corto.

Abandono por paso:
Agrupar `form_abandoned` por `last_step_id` o `last_step_title`. Los pasos con mas abandono necesitan revision.

Conversion a lead:
Comparar `lead_sent_to_crm` contra `form_started` y `form_completed`. Indica leads reales enviados al CRM.

Clicks a inventario:
Medir `inventory_clicked`. Sirve para saber si el usuario busca ver opciones antes o despues de completar.

Clicks a WhatsApp:
Medir `whatsapp_final_clicked`. Sirve para saber cuantos usuarios quieren continuar conversacion directa despues del formulario.
