// Tarea 4 - Big Data
// Consultas de agregación: conteo, suma y promedio.
// Base de datos: ventas_multicanal
// Colección: ventas_every

use("ventas_multicanal");

// 1. CONTEO DE DOCUMENTOS POR ESTADO LOGÍSTICO
db.ventas_every.aggregate([
  {
    $group: {
      _id: "$estado_logistico",
      cantidad_documentos: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      cantidad_documentos: -1
    }
  }
]);

// 2. SUMA DEL RECAUDO POR TRANSPORTADORA
db.ventas_every.aggregate([
  {
    $group: {
      _id: "$transportadora_codigo",
      recaudo_total: {
        $sum: "$recaudo"
      },
      cantidad_documentos: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      recaudo_total: -1
    }
  }
]);

// 3. PROMEDIO DEL COSTO DE ENVÍO POR TRANSPORTADORA
db.ventas_every.aggregate([
  {
    $group: {
      _id: "$transportadora_codigo",
      costo_promedio_envio: {
        $avg: "$costo_envio"
      },
      cantidad_documentos: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      _id: 0,
      transportadora_codigo: "$_id",
      costo_promedio_envio: {
        $round: ["$costo_promedio_envio", 2]
      },
      cantidad_documentos: 1
    }
  },
  {
    $sort: {
      costo_promedio_envio: -1
    }
  }
]);

// 4. VENTAS ACUMULADAS POR PRODUCTO
db.ventas_mercado_libre.aggregate([
  {
    $match: {
      producto_id: {
        $ne: null
      }
    }
  },
  {
    $group: {
      _id: "$producto_id",
      unidades_vendidas: {
        $sum: {
          $ifNull: ["$unidades", 0]
        }
      },
      valor_neto_acumulado: {
        $sum: {
          $ifNull: ["$total_neto", 0]
        }
      },
      cantidad_registros: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      unidades_vendidas: -1,
      valor_neto_acumulado: -1
    }
  },
  {
    $lookup: {
      from: "productos",
      localField: "_id",
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
      producto_id: "$_id",
      titulo_producto: "$detalle_producto.titulo_producto",
      variante_producto: "$detalle_producto.variante",
      unidades_vendidas: 1,
      valor_neto_acumulado: 1,
      cantidad_registros: 1
    }
  }
]);
