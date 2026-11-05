// Tarea 4 - Big Data
// Relación entre ventas y productos mediante $lookup.
// Base de datos: ventas_multicanal
// Colecciones: ventas_mercado_libre y productos

use("ventas_multicanal");

db.ventas_mercado_libre.aggregate([
  {
    $lookup: {
      from: "productos",
      localField: "producto_id",
      foreignField: "producto_id",
      as: "detalle_producto"
    }
  },
  {
    $unwind: {
      path: "$detalle_producto",
      preserveNullAndEmptyArrays: false
    }
  },
  {
    $project: {
      _id: 0,
      venta_ml_id: 1,
      fecha_venta: 1,
      estado_venta: 1,
      unidades: 1,
      total_neto: 1,
      producto_id: 1,
      titulo_producto: "$detalle_producto.titulo_producto",
      variante_producto: "$detalle_producto.variante"
    }
  }
]);
