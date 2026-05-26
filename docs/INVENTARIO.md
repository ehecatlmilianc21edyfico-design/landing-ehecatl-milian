# Inventario inmobiliario

La landing carga propiedades desde `data/properties.json`. En esta fase no hay scraping automático ni conexión con portales externos.

## Cómo llenar `data/properties.json`

El archivo debe contener un arreglo JSON. Puedes copiar la estructura de `data/properties.sample.json` y reemplazar los datos con propiedades reales verificadas.

Campos disponibles:

- `id`: identificador único interno.
- `title`: título público de la propiedad.
- `operation`: `venta` o `renta`.
- `type`: tipo de propiedad, por ejemplo `casa`, `departamento`, `terreno`, `local_oficina`.
- `price`: precio numérico si se tiene.
- `priceText`: precio listo para mostrar, por ejemplo `$2,500,000 MXN`.
- `location`: zona general, colonia o referencia pública.
- `city`: ciudad.
- `bedrooms`, `bathrooms`, `parking`: números si aplican.
- `constructionM2`, `landM2`: metros cuadrados si aplican.
- `topFeatures`: arreglo de características, por ejemplo `["plusvalía", "seguridad", "terraza"]`.
- `image`: ruta de imagen. Por seguridad, usa imágenes locales del proyecto o deja el campo vacío.
- `url`: liga pública de la ficha original.
- `source`: fuente, por ejemplo `Century 21 Edyfico`.
- `fetchedAt`: fecha de actualización manual.
- `status`: `activa`, `vendida`, `rentada` o `inactiva`.

## Propiedades inactivas

La landing no muestra propiedades con `status`:

- `vendida`
- `rentada`
- `inactiva`

Para ocultar una propiedad, cambia su `status` a uno de esos valores.

## Links e imágenes

Actualiza `url` con la ficha original de la propiedad. Si no hay liga disponible, la tarjeta mostrará `Ficha pendiente`.

Para imágenes, lo más seguro en GitHub Pages es guardar el archivo dentro de `assets/` y colocar una ruta como:

```json
"image": "assets/propiedades/casa-ejemplo.jpg"
```

## Recomendaciones básicas

El formulario usa las respuestas del prospecto para priorizar propiedades por operación, ciudad/zona, tipo y características. Si no hay coincidencias claras, muestra hasta 3 propiedades activas como referencia.

## Fase futura

El scraping automático del inventario de Century 21 Edyfico queda para una fase posterior. No agregues scripts de scraping ni dependencias en esta etapa.
