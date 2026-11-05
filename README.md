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
