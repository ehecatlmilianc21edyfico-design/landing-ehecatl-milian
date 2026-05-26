# Landing page conversacional | Ehecatl Milian

MVP estático para GitHub Pages de Ehecatl Milian, asesor inmobiliario de Century 21 Edyfico.

## Archivos

- `index.html`: estructura de la landing, hero, tarjetas de confianza y contenedor del formulario.
- `aviso-privacidad.html`: página editable para el aviso de privacidad.
- `style.css`: estilos mobile first con identidad negro, dorado, blanco y tonos neutros.
- `script.js`: flujo conversacional, rutas condicionales, validaciones, progreso y envío a WhatsApp.
- `SECURITY.md`: revisión de seguridad, privacidad, límites del sitio estático y fase 2 recomendada.
- `assets/hero-real-estate.png`: imagen hero editable.
- `assets/century21-logo.png`: logo de Century 21 usado en el encabezado.

## Cambiar número de WhatsApp

El número ya está configurado en `script.js`:

```js
const WHATSAPP_DESTINO = "5214439484031";
```

Si necesitas cambiarlo después, usa el número en formato internacional, solo dígitos.

## Cambiar logo

El MVP usa el archivo `assets/century21-logo.png` en el encabezado.

Para usar otro logo:

1. Guarda el nuevo archivo en `assets/logo.png`.
2. En `index.html`, dentro de `<a class="brand">`, reemplaza:

```html
<img class="brand-logo" src="assets/century21-logo.png" alt="Century 21" />
```

por:

```html
<img class="brand-logo" src="assets/logo.png" alt="Century 21 Edyfico" />
```

3. Agrega o ajusta estilos en `style.css`:

```css
.brand-logo {
  width: clamp(112px, 22vw, 154px);
  max-height: 44px;
  object-fit: contain;
}
```

## Editar textos y preguntas

- Hero y tarjetas de confianza: edita los textos directamente en `index.html`.
- Preguntas base, rutas condicionales y datos de contacto: edita los arreglos `baseQuestions`, `routeQuestions` y `contactQuestions` en `script.js`.
- Pantalla final: edita el bloque `#finishScreen` en `index.html`.
- Aviso de privacidad: el texto integral está en `aviso-privacidad.html` y puede editarse por secciones.

Si cambias el valor de una opción del objetivo inicial, revisa que exista una ruta con el mismo nombre dentro de `routeQuestions`.

## Seguridad y privacidad

El sitio es estático y no guarda datos personales en `localStorage`, `sessionStorage`, cookies ni base de datos propia. El envío se hace mediante WhatsApp con mensaje precargado.

Protecciones actuales:

- Validaciones frontend para nombre, WhatsApp, ciudad, correo opcional y campos abiertos.
- Sanitización básica de texto antes de guardar respuestas y armar el mensaje.
- Límite de 500 caracteres en campos abiertos.
- Honeypot invisible para bots simples.
- Tiempo mínimo de interacción antes del envío final.
- Bloqueo temporal del botón final para evitar envíos repetidos.
- Aviso de privacidad enlazado y consentimiento obligatorio.
- Meta `referrer` y Content Security Policy compatible con GitHub Pages.

Consulta `SECURITY.md` para límites y recomendaciones de fase 2.

## Publicar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub.
2. En GitHub, entra a `Settings` > `Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama principal (`main` o `master`) y la carpeta `/(root)`.
5. Guarda los cambios.
6. GitHub mostrará la URL pública cuando termine el despliegue.

## Probar localmente

Puedes abrir `index.html` directamente en el navegador. No requiere build ni dependencias.

Para una prueba con servidor local:

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```
