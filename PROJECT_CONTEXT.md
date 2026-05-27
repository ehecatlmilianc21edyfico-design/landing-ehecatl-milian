# PROJECT_CONTEXT.md

# PerfiladorEMC21

## 1. Que es el proyecto

PerfiladorEMC21 es una landing page estatica con formulario conversacional para Ehecatl Milian, asesor inmobiliario vinculado con Century 21 Edyfico.

El objetivo no es capturar datos como encuesta fria. El objetivo es orientar primero, entender la intencion del prospecto y despues perfilar lo minimo necesario para dar seguimiento por WhatsApp y, en una fase posterior, CRM.

## 2. URL publica actual

- Landing publicada: `https://ehecatlmilianc21edyfico-design.github.io/landing-ehecatl-milian/`
- Seccion de asesoria: `https://ehecatlmilianc21edyfico-design.github.io/landing-ehecatl-milian/#asesoria`

## 3. Dominio adquirido

- Dominio: `ehecatlinmuebles.com`
- Pendiente: conectarlo a GitHub Pages y activar HTTPS.

## 4. Filosofia del proyecto

Regla central: primero fidelizar, despues perfilar.

La experiencia debe sentirse como una asesoria inicial con Ehecatl Milian: humana, rapida, clara, profesional y sin presion. El formulario debe ordenar la intencion del prospecto antes de pedir demasiados datos.

Prioridad actual: filtro por intencion. La ruta promedio deseada es de 5 a 7 pantallas. El limite de 12 pantallas es absoluto, no una meta.

## 5. Reglas que no se deben romper

- Primero fidelizar, despues perfilar.
- El perfilador debe sentirse rapido, no pesado.
- Prioridad actual: filtro por intencion.
- Ruta promedio deseada: 5 a 7 pantallas.
- 12 pasos queda como limite absoluto, no como meta.
- WhatsApp corto, nunca mandar todas las respuestas.
- Datos completos solo para CRM.
- No guardar datos personales en `localStorage`.
- No guardar datos personales en `sessionStorage`.
- No usar cookies para datos personales.
- No poner tokens, API keys ni secretos en frontend.
- No usar `console.log` con datos personales.
- No conectar Airtable directo desde frontend.
- CRM debe ir por Make o backend seguro.
- Aviso visible debe decir solo: "He leido y acepto el Aviso de Privacidad."
- Nombre completo legal del responsable solo dentro de `aviso-privacidad.html`.
- El nombre del usuario no debe aceptar titulos como Sr., Sra., Dr., Lic., Don, Dona, etc.
- Preparar proteccion anti-saturacion antes del CRM.
- Lead sospechoso, muy rapido, con nombre basura o telefono no verificado no debe disparar alerta urgente.
- Score interno no se muestra al usuario.
- Estado de credito/precalificacion debe afectar score.
- Inventario propio debe usar `data/properties.json`.
- Propiedades deben soportar minimo 1 imagen y maximo 3.
- Fachada como imagen principal cuando exista.
- No inventar propiedades, precios ni caracteristicas.

## 6. Estructura actual del proyecto

```text
.
├── index.html
├── style.css
├── script.js
├── aviso-privacidad.html
├── README.md
├── SECURITY.md
├── assets/
│   ├── century21-logo.png
│   └── hero-real-estate.png
├── data/
│   ├── properties.json
│   └── properties.sample.json
└── docs/
    └── INVENTARIO.md
```

## 7. Archivos principales

- `index.html`: estructura de la landing, hero, seccion de asesoria, honeypot, cierre del formulario e inventario.
- `style.css`: estilos mobile first, paleta Century 21 sobria, tarjetas, formulario, inventario y estados visuales.
- `script.js`: flujo conversacional, rutas condicionales, validaciones, seguridad frontend, WhatsApp corto, scoring, leadPayload e inventario.
- `aviso-privacidad.html`: aviso de privacidad integral.
- `README.md`: instrucciones basicas de edicion, publicacion, seguridad y CRM desactivado.
- `SECURITY.md`: nivel actual de seguridad, limitaciones y siguiente nivel recomendado.
- `data/properties.json`: inventario local real. Actualmente debe permanecer sin propiedades inventadas.
- `data/properties.sample.json`: plantilla del formato de inventario.
- `docs/INVENTARIO.md`: documentacion para cargar propiedades manualmente.

## 8. Estado del formulario

El formulario es conversacional, mobile first, con una pregunta o grupo compacto por pantalla. Tiene barra de progreso, regreso, validaciones y rutas condicionales.

Estado actual:

- Nombre al inicio.
- Objetivo inmobiliario.
- Etapa y prioridad agrupadas.
- Rutas para comprar, vender, rentar, poner en renta, invertir, valuacion y orientacion.
- Limite `MAX_VISIBLE_STEPS = 12`.
- Selecciones de necesidades con maximo 3.
- Contacto y consentimiento al final.
- Scroll corregido para avanzar entre pantallas largas y cortas.
- La URL base debe cargar arriba y `#asesoria` debe llevar a la seccion correcta.

Pendiente de mejora:

- Reducir la ruta promedio real hacia 5 a 7 pantallas cuando sea posible.
- Validar que todas las rutas mantengan filtro por intencion antes que perfilamiento pesado.
- Validar nombre sin titulos honorificos o profesionales.

## 9. Estado de seguridad

El sitio es estatico en GitHub Pages. No tiene backend ni base de datos propia.

Medidas actuales:

- No se guardan datos personales en `localStorage`, `sessionStorage` ni cookies.
- No debe haber `console.log` con datos personales.
- No hay tokens ni secretos en frontend.
- Honeypot invisible.
- Tiempo minimo de interaccion.
- Bloqueo temporal del boton final para evitar envios repetidos.
- Validacion de nombre, WhatsApp, ciudad, correo opcional, zonas y campos abiertos.
- Sanitizacion de texto.
- Evitar `innerHTML` con datos del usuario.
- `encodeURIComponent` para URL de WhatsApp.
- Meta referrer y Content Security Policy basica.
- Aviso de privacidad enlazado y consentimiento obligatorio.

Pendiente critico antes de CRM:

- Capa anti-saturacion y calidad del lead.
- Reglas para no disparar alertas urgentes con leads sospechosos.
- Si se agrega CAPTCHA real, debe validarse server-side. No implementar CAPTCHA falso solo frontend.

## 10. Estado del WhatsApp corto

El WhatsApp final se arma con `buildWhatsappMessage()` y debe mantenerse corto, humano y contextual.

Regla permanente:

- No enviar lista de preguntas y respuestas.
- No enviar telefono del usuario, correo, zona exacta, documentos, consentimiento, score, urgencia ni notas internas.
- No volver a incluir "Respuestas:".

El numero configurado es:

```js
const WHATSAPP_DESTINO = "5214439484031";
```

## 11. Estado del scoring y leadPayload

`script.js` construye un `leadPayload` en memoria al completar el formulario.

Incluye:

- `leadId`
- fecha de creacion
- URL y UTM
- contacto
- respuestas ordenadas
- preferencias
- intake de propiedad
- priceMindset
- rentMindset
- landDetails
- qualification
- internalReview
- propiedades recomendadas
- metricas basicas
- consentimiento
- shortWhatsAppMessage

El score interno se calcula con `calculateLeadScore(state)` y no se muestra al usuario.

El leadPayload no se guarda localmente y no se imprime completo en consola.

## 12. Estado del inventario

El inventario esta preparado para cargar desde `data/properties.json`.

Estado actual:

- `data/properties.json` existe y puede estar vacio.
- `data/properties.sample.json` define la estructura.
- Cada propiedad soporta `coverImage`, `facadeImage`, `images`, `imageAlt` y `needsImageReview`.
- Maximo 3 imagenes por propiedad.
- La fachada debe ser imagen principal cuando exista.
- Se filtran propiedades `vendida`, `rentada` e `inactiva`.
- Si no hay propiedades, se muestra estado vacio con link al inventario completo de Century 21 Edyfico.

Reglas:

- No hacer scraping todavia.
- No inventar propiedades.
- No inventar precios.
- No inventar caracteristicas.

## 13. Estado del CRM

CRM desactivado.

`submitLead(leadPayload)` existe como placeholder seguro y devuelve modo desactivado. No envia a Make, Airtable ni ningun endpoint real.

Regla:

- No conectar Airtable directo desde frontend.
- Cuando se conecte CRM, debe ser mediante Make, Cloudflare Worker, Netlify Function, Vercel Function u otro backend seguro.
- No poner secretos en GitHub Pages.

## 14. Estado de metricas

Metricas actuales solo en memoria dentro de `leadPayload.metrics`:

- `sessionId`
- `firstPageUrl`
- `referrer`
- `formStartedAt`
- `formCompletedAt`
- `timeToCompleteSeconds`

No hay analytics persistente, eventos por paso ni base historica.

## 15. Pendientes criticos

1. Cerrar documentacion y abrir sesion limpia.
2. Conectar dominio `ehecatlinmuebles.com` a GitHub Pages con HTTPS.
3. Reforzar filtro por intencion para rutas promedio de 5 a 7 pantallas.
4. Limpiar texto visible de consentimiento para que diga solo "He leido y acepto el Aviso de Privacidad."
5. Validar nombre sin titulos: Sr., Sra., Dr., Lic., Don, Dona, etc.
6. Preparar capa anti-saturacion y calidad del lead antes de CRM.
7. Agregar estado de credito/precalificacion y conectarlo al score.
8. Confirmar estructura final de `leadPayload`.
9. Conectar CRM de forma segura.
10. Definir metricas internas minimas.

## 16. Cosas que NO se deben volver a hacer

- No mandar todas las respuestas por WhatsApp.
- No convertir el perfilador en formulario largo.
- No perseguir 12 pasos como objetivo.
- No pedir datos sensibles.
- No pedir documentos en el formulario.
- No guardar datos personales en almacenamiento local.
- No imprimir payloads o respuestas personales en consola.
- No poner llaves de Make, Airtable, Google, Meta, WhatsApp ni otros servicios en frontend.
- No conectar Airtable directo desde navegador.
- No agregar scraping automatico sin fase dedicada.
- No inventar inventario.
- No mostrar score, urgencia o notas internas al usuario.
- No redisenar la landing desde cero si el objetivo es una mejora puntual.
