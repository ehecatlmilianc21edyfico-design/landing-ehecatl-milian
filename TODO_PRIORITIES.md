# TODO_PRIORITIES.md

# Prioridades exactas

No avanzar a CRM sin antes dejar preparada la capa anti-saturacion y calidad del lead.

## Orden de trabajo recomendado

1. Abrir nueva sesion limpia con `PROJECT_CONTEXT.md`, `ROADMAP.md`, `CURRENT_STATUS.md` y `TODO_PRIORITIES.md`.
2. Conectar dominio `ehecatlinmuebles.com` con GitHub Pages y HTTPS.
3. Revisar filtro por intencion para que la ruta promedio se acerque a 5 a 7 pantallas.
4. Limpiar consentimiento visible: debe decir solo "He leido y acepto el Aviso de Privacidad."
5. Mantener nombre completo legal del responsable solo dentro de `aviso-privacidad.html`.
6. Agregar validacion de nombre sin titulos: Sr., Sra., Dr., Dra., Lic., Ing., Don, Dona, etc.
7. Preparar anti-saturacion y lead quality:
   - detectar llenado demasiado rapido;
   - detectar nombre basura;
   - detectar telefono no verificable;
   - respetar honeypot;
   - no disparar alerta urgente si el lead es sospechoso.
8. Agregar estado de credito/precalificacion sin alargar el flujo.
9. Ajustar score para que credito/precalificacion afecte temperatura, urgencia y accion recomendada.
10. Confirmar `leadPayload` final antes de integrarlo con sistemas externos.
11. Conectar CRM mediante Make o backend seguro.
12. Definir metricas internas minimas sin guardar datos sensibles innecesarios.
13. Solo despues, avanzar a pagina de confianza o Perfilador de Propiedades MARK I.

## Reglas de prioridad

- WhatsApp debe seguir corto.
- Datos completos son para CRM, no para WhatsApp.
- Score interno no se muestra al usuario.
- No usar `localStorage`, `sessionStorage` ni cookies para datos personales.
- No usar `console.log` con datos personales.
- No poner tokens ni API keys en frontend.
- No conectar Airtable directo desde frontend.
- No inventar propiedades, precios ni caracteristicas.
- Inventario propio debe seguir usando `data/properties.json`.
- Fachada como imagen principal cuando exista.
