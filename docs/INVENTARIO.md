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
- `coverImage`: imagen principal que se muestra en la tarjeta.
- `facadeImage`: imagen de fachada cuando esté disponible.
- `images`: arreglo con mínimo 1 y máximo 3 imágenes.
- `imageAlt`: descripción breve de la imagen principal.
- `url`: liga pública de la ficha original.
- `source`: fuente, por ejemplo `Century 21 Edyfico`.
- `fetchedAt`: fecha de actualización manual.
- `status`: `activa`, `vendida`, `rentada` o `inactiva`.
- `needsImageReview`: `true` cuando no se sabe si la imagen principal corresponde a la fachada o requiere revisión manual.

## Propiedades inactivas

La landing no muestra propiedades con `status`:

- `vendida`
- `rentada`
- `inactiva`

Para ocultar una propiedad, cambia su `status` a uno de esos valores.

## Links

Actualiza `url` con la ficha original de la propiedad. Si no hay liga disponible, la tarjeta mostrará `Ficha pendiente`.

## Imágenes de propiedades

Cada propiedad debe tener mínimo 1 imagen y máximo 3 imágenes en `images`.

La fachada debe ir en `facadeImage` siempre que se tenga. Si existe `facadeImage`, úsala también como `coverImage`, porque la fachada debe ser la imagen principal cuando esté disponible.

Si no se sabe cuál imagen es la fachada, usa la mejor imagen disponible como `coverImage` y marca:

```json
"needsImageReview": true
```

Antes de publicar inventario real, revisa que las imágenes correspondan a la propiedad correcta y que no estén rotas.

Para imágenes, lo más seguro en GitHub Pages es guardar los archivos dentro de `assets/` y colocar rutas locales como:

```json
"coverImage": "assets/propiedades/casa-ejemplo-fachada.jpg",
"facadeImage": "assets/propiedades/casa-ejemplo-fachada.jpg",
"images": [
  "assets/propiedades/casa-ejemplo-fachada.jpg",
  "assets/propiedades/casa-ejemplo-sala.jpg",
  "assets/propiedades/casa-ejemplo-cocina.jpg"
]
```

Si una propiedad no tiene imagen, la landing muestra un placeholder con `Imagen pendiente`. Aun así, antes de usar inventario real conviene completar al menos una imagen por propiedad.

## Recomendaciones básicas

El formulario usa las respuestas del prospecto para priorizar propiedades por operación, ciudad/zona, tipo y características. Si no hay coincidencias claras, muestra hasta 3 propiedades activas como referencia.

## Fase futura

El scraping automático del inventario de Century 21 Edyfico queda para una fase posterior. No agregues scripts de scraping ni dependencias en esta etapa.
