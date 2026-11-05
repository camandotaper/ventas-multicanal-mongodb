// Tarea 4 - Big Data
// Operaciones CRUD sobre un documento académico controlado.
// Base de datos: ventas_multicanal
// Colección: ventas_mercado_libre

use("ventas_multicanal");

// 1. INSERCIÓN
// Se crea un documento temporal para demostrar las operaciones CRUD.
db.ventas_mercado_libre.insertOne({
  venta_ml_id: "ML_PRUEBA_CRUD",
  fecha_venta: "2026-11-05T13:16:00",
  estado_venta: "PENDIENTE",
  descripcion_estado: "Documento controlado para demostrar operaciones CRUD",
  paquete_varios_productos: false,
  pertenece_kit: false,
  unidades: 1,
  ingresos_productos: 100000,
  cargo_venta_impuestos: -18000,
  ingresos_envio: null,
  costos_envio: -8000,
  anulaciones_reembolsos: null,
  total_neto: 74000,
  producto_id: "CST-4000",
  publicacion_id: "PRUEBA_CRUD",
  transportista: "PRUEBA_ACADEMICA",
  devolucion_reclamo: null
});

// 2. CONSULTA
// Se localiza el documento y se muestran únicamente los campos relevantes.
db.ventas_mercado_libre.find(
  { venta_ml_id: "ML_PRUEBA_CRUD" },
  {
    _id: 0,
    venta_ml_id: 1,
    estado_venta: 1,
    unidades: 1,
    ingresos_productos: 1,
    costos_envio: 1,
    total_neto: 1
  }
);

// 3. ACTUALIZACIÓN
// Se modifica el estado y la descripción del documento controlado.
db.ventas_mercado_libre.updateOne(
  { venta_ml_id: "ML_PRUEBA_CRUD" },
  {
    $set: {
      estado_venta: "APROBADA",
      descripcion_estado:
        "Documento controlado actualizado mediante operación CRUD"
    }
  }
);

// Verificación de la actualización.
db.ventas_mercado_libre.find(
  { venta_ml_id: "ML_PRUEBA_CRUD" },
  {
    _id: 0,
    venta_ml_id: 1,
    estado_venta: 1,
    descripcion_estado: 1,
    total_neto: 1
  }
);

// 4. ELIMINACIÓN
// Se elimina exclusivamente el documento temporal utilizado en la prueba.
db.ventas_mercado_libre.deleteOne({
  venta_ml_id: "ML_PRUEBA_CRUD"
});

// Verificación final: el resultado esperado es cero documentos de prueba.
db.ventas_mercado_libre.countDocuments({
  venta_ml_id: "ML_PRUEBA_CRUD"
});
