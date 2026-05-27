# CURRENT_STATUS.md

# Estado actual PerfiladorEMC21

## Hecho

- Landing estatica publicada en GitHub Pages.
- Hero, seccion de confianza, formulario conversacional, aviso de privacidad e inventario base.
- Estilo visual Century 21 con negro, dorado ejecutivo, blanco y neutros.
- Formulario mobile first con progreso, regreso y cierre por WhatsApp.
- Rutas condicionales para comprar, vender, rentar, poner en renta, invertir, valuacion y orientacion.
- Limite tecnico `MAX_VISIBLE_STEPS = 12`.
- WhatsApp final corto por objetivo.
- Seguridad frontend basica.
- `leadPayload` en memoria preparado para CRM.
- Scoring interno basico.
- Inventario local preparado con `data/properties.json`.
- Documentacion base en `README.md`, `SECURITY.md` y `docs/INVENTARIO.md`.

## Funcionando

- URL publica: `https://ehecatlmilianc21edyfico-design.github.io/landing-ehecatl-milian/`
- URL directa a asesoria: `https://ehecatlmilianc21edyfico-design.github.io/landing-ehecatl-milian/#asesoria`
- Envio a WhatsApp con mensaje breve.
- Validaciones de campos obligatorios.
- Honeypot invisible.
- Tiempo minimo de interaccion.
- Bloqueo temporal del boton final.
- Sanitizacion de entradas.
- No persistencia local de datos personales.
- Carga de inventario desde `data/properties.json`.
- Estado vacio del inventario cuando no hay propiedades.

## Pendiente de verificar

- Comportamiento final en celular despues de cada cambio publicado.
- Que todas las rutas reales se sientan de 5 a 7 pantallas en promedio.
- Que el aviso visible del checkbox use solo la frase corta requerida.
- Que el nombre del usuario rechace titulos como Sr., Sra., Dr., Lic., Don, Dona, etc.
- Que la conexion futura del dominio preserve `/#asesoria`.
- Que GitHub Pages sirva correctamente cualquier cambio nuevo despues del deploy.

## Pendiente critico

1. Conectar `ehecatlinmuebles.com` a GitHub Pages con HTTPS.
2. Reforzar filtro por intencion antes de seguir agregando profundidad.
3. Preparar anti-saturacion y calidad del lead antes de CRM.
4. Agregar estado de credito/precalificacion y reflejarlo en score.
5. Confirmar estructura final de `leadPayload`.
6. Conectar CRM solo mediante Make o backend seguro.
7. Definir metricas internas minimas.

## Pendiente futuro

- Inventario real con propiedades verificadas.
- Scraping o sincronizacion de inventario en fase separada.
- Pagina de confianza premium.
- Perfilador de Propiedades completo.
- Match mas avanzado entre lead e inventario.
- Match inverso.
- FAQ, iconos y animaciones sobrias.
