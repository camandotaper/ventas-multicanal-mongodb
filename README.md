# Ventas multicanal con MongoDB

Implementación académica en MongoDB para almacenar, consultar y analizar datos anonimizados de Ventas Mercado Libre y Ventas Every.

## Descripción del proyecto

El proyecto corresponde a la Tarea 4 del curso Big Data de la Universidad Nacional Abierta y a Distancia. La solución utiliza MongoDB Atlas y MongoDB Compass para organizar información comercial, logística y de productos mediante un modelo documental.

La base de datos `ventas_multicanal` contiene tres colecciones:

- `ventas_mercado_libre`: 127 documentos comerciales y financieros.
- `ventas_every`: 592 documentos relacionados con la gestión logística.
- `productos`: 45 documentos derivados de los identificadores disponibles en Ventas Mercado Libre.

En total, la base reúne 764 documentos académicos.

## Caso de uso

El caso de uso consiste en almacenar y consultar dos fuentes propias denominadas Ventas Mercado Libre y Ventas Every.

Ventas Mercado Libre contiene información sobre fechas, estados, unidades, ingresos, cargos, costos de envío, valores netos e identificadores de producto. Ventas Every reúne información logística sobre transportadoras, destinos generalizados, estados, costos de envío, recaudos y modalidad contraentrega.

Las fuentes se almacenan en colecciones independientes porque presentan estructuras diferentes y no cuentan con una llave común verificable. La relación documental se realiza únicamente entre `ventas_mercado_libre` y `productos` mediante el campo `producto_id`.

## Preparación de los datos

Antes de la importación se generaron copias académicas para conservar intactos los archivos originales y excluir identificadores directos.

Se eliminaron o sustituyeron datos como:

- nombres de compradores y destinatarios;
- números de identificación;
- teléfonos;
- direcciones exactas;
- guías originales;
- números y enlaces privados de seguimiento.

Los archivos publicados contienen únicamente los campos necesarios para las consultas académicas.

## Estructura del repositorio

```text
ventas-multicanal-mongodb/
├── data/
│   ├── productos.json
│   ├── ventas_every_anonimizadas.json
│   └── ventas_mercado_libre_anonimizadas.json
├── consultas/
│   ├── agregaciones.js
│   ├── filtros_operadores.js
│   ├── operaciones_crud.js
│   └── relacion_lookup.js
└── README.md
```

## Consultas implementadas

### Operaciones CRUD

El archivo `consultas/operaciones_crud.js` contiene la inserción de un documento controlado, su consulta mediante filtro y proyección, la actualización del estado y la descripción, la eliminación del registro de prueba y la verificación final de la operación.

### Filtros y operadores

El archivo `consultas/filtros_operadores.js` consulta novedades logísticas mediante el operador `$in` para seleccionar devoluciones, cancelaciones y registros con error. También utiliza `$gte` para establecer un costo de envío mínimo, una proyección de campos y un ordenamiento descendente.

### Relación entre colecciones

El archivo `consultas/relacion_lookup.js` relaciona `ventas_mercado_libre` con `productos` mediante las etapas `$lookup`, `$unwind` y `$project`. El campo utilizado para establecer la relación es `producto_id`.

### Agregaciones

El archivo `consultas/agregaciones.js` incluye el conteo de documentos por estado logístico, la suma del recaudo por transportadora y el promedio del costo de envío por transportadora.

## Resultados principales

La implementación permitió obtener los siguientes resultados:

- 483 documentos con estado `Entregado`.
- 47 devoluciones.
- 33 cancelaciones.
- 27 registros con error.
- 104 documentos con novedades y costos de envío iguales o superiores a 10.000 COP.
- Recaudo acumulado de 87.947.300 COP para la transportadora codificada como `T1`.
- Costo promedio de envío de 28.171,67 COP para `T3`, calculado sobre seis documentos.

- Conversión y validación de `fecha_venta` y `fecha_creacion` como tipo `Date` de MongoDB.
- Verificación de los campos monetarios como valores enteros y de `contraentrega` como valor booleano.
- El producto `ET310` ocupó la primera posición del análisis comercial, con 24 unidades distribuidas en 23 registros.
Los resultados deben interpretarse teniendo en cuenta la cantidad de documentos correspondiente a cada transportadora.

## Uso de los archivos

Los archivos JSON pueden importarse mediante MongoDB Compass en las siguientes colecciones:

| Archivo | Colección |
|---|---|
| `productos.json` | `productos` |
| `ventas_every_anonimizadas.json` | `ventas_every` |
| `ventas_mercado_libre_anonimizadas.json` | `ventas_mercado_libre` |

La base de datos utilizada se denomina `ventas_multicanal`. Los archivos de la carpeta `consultas` contienen las operaciones ejecutadas durante la actividad.

## Privacidad

Este repositorio no contiene contraseñas, cadenas de conexión, credenciales de MongoDB Atlas ni archivos originales con datos personales. Los conjuntos publicados corresponden a copias académicas preparadas para excluir identificadores directos y reducir la exposición de información personal y operativa.

## Autor

Camilo Andrés Otálora Pérez  
Curso Big Data  
Universidad Nacional Abierta y a Distancia  
2026
