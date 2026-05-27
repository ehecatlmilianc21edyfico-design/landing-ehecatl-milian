# ROADMAP.md

# Roadmap PerfiladorEMC21

## Fase inmediata MARK I

### 0A. Cerrar contexto y abrir sesion limpia

Objetivo: dejar documentacion suficiente para continuar sin depender de una conversacion larga.

Estado: en curso con estos archivos de contexto.

### 0B. Conectar dominio `ehecatlinmuebles.com`

Objetivo: apuntar el dominio adquirido a GitHub Pages y activar HTTPS.

Pendiente:

- Configurar DNS.
- Configurar custom domain en GitHub Pages.
- Verificar HTTPS.
- Confirmar que `/#asesoria` funcione correctamente.

### 1. Filtro por intencion

Objetivo: que el perfilador detecte intencion comercial sin sentirse pesado.

Reglas:

- Primero fidelizar, despues perfilar.
- Ruta promedio deseada: 5 a 7 pantallas.
- 12 pasos es limite absoluto, no meta.
- Priorizar preguntas que separen intencion real de curiosidad.

### 2. Aviso de privacidad limpio

Objetivo: mantener cumplimiento sin saturar el formulario.

Pendiente:

- Texto visible del checkbox debe decir solo: "He leido y acepto el Aviso de Privacidad."
- Nombre completo legal del responsable debe quedar solo dentro de `aviso-privacidad.html`.
- El link debe abrir en pestana nueva con `target="_blank"` y `rel="noopener noreferrer"`.

### 3. Validacion de nombre sin titulos

Objetivo: mejorar calidad del lead desde el primer campo.

Pendiente:

- Rechazar titulos como Sr., Sra., Dr., Dra., Lic., Ing., Don, Dona, etc.
- Mantener nombres validos con acentos, guion y apostrofo.
- Mensaje amable y no agresivo.

### 4. Anti-saturacion / lead quality / verificacion preparada

Objetivo: evitar que bots, pruebas o datos basura disparen seguimiento urgente.

Debe quedar antes de conectar CRM.

Pendiente:

- Clasificar lead sospechoso.
- Considerar tiempo de llenado, honeypot, nombre basura, telefono no verificable y patrones repetitivos.
- Evitar alerta urgente si el lead es sospechoso.
- Preparar salida para CRM sin friccion visible para usuarios reales.

### 5. Estado de credito / precalificacion

Objetivo: que la capacidad o preparacion financiera influya en score y accion recomendada.

Pendiente:

- Agregar estado de credito/precalificacion sin alargar demasiado el flujo.
- Reflejarlo en `calculateLeadScore()`.
- Mantener WhatsApp corto.

### 6. Confirmar leadPayload

Objetivo: cerrar estructura interna antes de conectar CRM.

Pendiente:

- Revisar campos requeridos por Make/Airtable.
- Confirmar nombres estables de campos.
- Confirmar que no contiene datos innecesariamente sensibles.
- Confirmar que score y notas internas no se muestran al usuario.

### 7. Conectar CRM

Objetivo: enviar leads de forma segura.

Reglas:

- No conectar Airtable directo desde frontend.
- Usar Make, Cloudflare Worker, Netlify Function, Vercel Function u otro backend seguro.
- No poner tokens ni API keys en GitHub Pages.
- Aplicar anti-saturacion antes de disparar alertas.

### 8. Metricas internas minimas

Objetivo: medir funcionamiento sin invadir privacidad.

Pendiente:

- Definir eventos minimos.
- Evitar guardar datos sensibles innecesarios.
- Medir inicio, finalizacion, abandono aproximado, fuente UTM y ruta.

## Si sobra tiempo en MARK I

### 9. Pagina de confianza

Objetivo: reforzar credibilidad de Ehecatl Milian y Century 21 Edyfico.

Ideas:

- Proceso de acompanamiento.
- Preguntas frecuentes.
- Que esperar despues de enviar el formulario.
- Senales de confianza institucionales.

### 10. Bases del Perfilador de Propiedades MARK I

Objetivo: preparar intake para propietarios sin construir aun el sistema completo.

Enfoque:

- Captacion ordenada.
- Riesgo documental.
- Precio/renta a validar.
- Cita o llamada de revision.

## Fases futuras

### MARK II

- Propiedades sugeridas con mayor calidad.
- Inventario propio alimentado manualmente o por proceso controlado.
- Match entre lead e inventario.
- Perfilador de Propiedades completo.

### MARK III

- Pagina de confianza premium.
- FAQ amplia.
- Animaciones sobrias.
- Iconografia refinada.
- Match inverso: propiedades que sugieren prospectos ideales.
