# Deploy y dominio personalizado

## Estado actual de GitHub Pages

Repositorio:

```text
ehecatlmilianc21edyfico-design/landing-ehecatl-milian
```

Configuracion esperada de GitHub Pages:

```text
Source: Deploy from a branch
Branch: main
Folder: /
Custom domain: ehecatlinmuebles.com
Enforce HTTPS: activado
```

URL actual de GitHub Pages sin dominio personalizado:

```text
https://ehecatlmilianc21edyfico-design.github.io/landing-ehecatl-milian/
```

Revision hecha el 2026-05-27:

```text
GitHub Pages status: built
Build type: legacy
Source branch: main
Source path: /
Custom domain actual en GitHub: ninguno
HTTPS enforced en GitHub: true
```

El archivo `CNAME` debe existir en la raiz del repositorio y contener unicamente:

```text
ehecatlinmuebles.com
```

No debe existir otro `CNAME` con un dominio distinto ni una configuracion de Pages que publique desde otra rama o carpeta.

## Estado DNS observado antes del cambio

El 2026-05-27, la consulta publica de DNS devolvio:

```text
ehecatlinmuebles.com A
76.223.105.230
13.248.243.5

www.ehecatlinmuebles.com CNAME
ehecatlinmuebles.com.
```

Esa configuracion no apunta a GitHub Pages. En GoDaddy debe reemplazarse por los registros de la seccion siguiente.

## Configuracion en GitHub

1. Entrar al repositorio en GitHub.
2. Abrir `Settings`.
3. Abrir `Pages`.
4. En `Build and deployment`, seleccionar:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/`
5. En `Custom domain`, escribir:

```text
ehecatlinmuebles.com
```

6. Guardar.
7. Esperar a que GitHub valide el dominio.
8. Activar `Enforce HTTPS` cuando GitHub lo permita.

## Configuracion DNS requerida en GoDaddy

En la zona DNS de `ehecatlinmuebles.com`, configurar los siguientes registros.

Dominio raiz:

```text
Type: A
Name: @
Value: 185.199.108.153
TTL: default

Type: A
Name: @
Value: 185.199.109.153
TTL: default

Type: A
Name: @
Value: 185.199.110.153
TTL: default

Type: A
Name: @
Value: 185.199.111.153
TTL: default
```

Subdominio `www`:

```text
Type: CNAME
Name: www
Value: ehecatlmilianc21edyfico-design.github.io
TTL: default
```

Eliminar o corregir registros incompatibles:

- Otros registros `A` para `@` que apunten a servidores distintos.
- Registros `AAAA` para `@` si apuntan a otro proveedor.
- Registros `CNAME` para `@`, porque el dominio raiz debe usar los cuatro `A Records`.
- Registros `CNAME` para `www` que apunten a otro destino.
- Redirecciones de dominio en GoDaddy que compitan con GitHub Pages.

No modificar registros de correo si existen, como `MX`, `TXT` de SPF, DKIM o DMARC.

## HTTPS

Despues de guardar el dominio personalizado y configurar DNS:

1. Esperar a que GitHub Pages detecte correctamente el dominio.
2. Volver a `Settings` > `Pages`.
3. Confirmar que no haya errores de DNS.
4. Activar `Enforce HTTPS`.

GitHub puede tardar en emitir el certificado TLS. Durante ese tiempo, el sitio puede responder por HTTP o mostrar advertencias temporales en HTTPS.

## Tiempos aproximados de propagacion

- Cambios DNS visibles en algunos resolvers: 5 a 30 minutos.
- Propagacion comun: 1 a 4 horas.
- Propagacion completa posible: hasta 24 horas.
- Emision y activacion de HTTPS en GitHub Pages: normalmente minutos, pero puede tardar hasta 24 horas despues de que el DNS este correcto.

## Verificacion

Verificar dominio raiz:

```bash
dig +short ehecatlinmuebles.com A
```

Debe devolver:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Verificar `www`:

```bash
dig +short www.ehecatlinmuebles.com CNAME
```

Debe devolver:

```text
ehecatlmilianc21edyfico-design.github.io.
```

Verificar HTTP/HTTPS:

```bash
curl -I https://ehecatlinmuebles.com
curl -I https://www.ehecatlinmuebles.com
```

Resultado esperado:

- `https://ehecatlinmuebles.com` responde con `200` o redireccion valida de GitHub Pages.
- `https://www.ehecatlinmuebles.com` responde correctamente o redirige al dominio canonico.
- El navegador muestra candado HTTPS valido.

Verificar ruta de asesoria:

```text
https://ehecatlinmuebles.com/#asesoria
```

Debe abrir la landing y llevar a la seccion de asesoria.
