# Seguridad y privacidad

## Nivel actual

Este proyecto es una landing estática publicada en GitHub Pages. No tiene backend, base de datos propia ni almacenamiento local de datos personales.

El formulario conversacional conserva las respuestas únicamente en memoria mientras la página está abierta. Al finalizar, el usuario decide abrir WhatsApp con un mensaje precargado.

Medidas incluidas:

- No se usa `localStorage`, `sessionStorage` ni cookies para guardar datos personales.
- No se imprimen respuestas del usuario en `console.log`.
- No hay tokens, API keys, secretos ni credenciales en el frontend.
- El formulario usa validaciones frontend para nombre, WhatsApp, ciudad, correo opcional y campos abiertos.
- Los campos abiertos tienen límite de 500 caracteres.
- Las respuestas abiertas se tratan como texto plano y se bloquean entradas con etiquetas HTML o patrones sospechosos.
- El render del formulario evita insertar texto del usuario con `innerHTML`.
- Se usa `encodeURIComponent` para construir el mensaje de WhatsApp.
- Hay honeypot invisible para bots simples.
- Hay tiempo mínimo de interacción antes del envío final.
- El botón final de WhatsApp se bloquea temporalmente después de usarse para evitar disparos repetidos.
- El consentimiento y el enlace al Aviso de Privacidad son obligatorios antes de enviar.
- El sitio incluye meta `referrer` y una Content Security Policy básica compatible con GitHub Pages.

## Limitaciones

- Al ser un sitio estático, las validaciones frontend pueden ser omitidas por un atacante con conocimientos técnicos.
- No se puede impedir por completo que alguien capture o envíe datos falsos.
- No se puede validar un CAPTCHA de forma realmente segura sin backend.
- No se deben guardar datos sensibles en el frontend.
- El mensaje de WhatsApp viaja como texto precargado hacia una plataforma externa; no debe incluir documentos, contraseñas, datos bancarios ni información extremadamente sensible.
- La verificación real del prospecto debe hacerse por WhatsApp, llamada o un medio adecuado.

## Siguiente nivel recomendado

Para una fase 2 con mayor protección:

1. Agregar Cloudflare Turnstile o hCaptcha con validación server-side.
2. Validar el token mediante Cloudflare Worker, Netlify Function, Vercel Function u otro backend.
3. No colocar claves secretas en GitHub Pages ni en el frontend.
4. Agregar rate limiting en el endpoint server-side.
5. Guardar leads en una base protegida solo si realmente es necesario.
6. Evitar almacenar documentos, datos bancarios o información sensible.
7. Revisar permisos, accesos y ciclo de vida de la información si se conecta CRM o Google Sheets.

## Contacto

Para dudas relacionadas con privacidad o datos personales, revisar `aviso-privacidad.html`.
