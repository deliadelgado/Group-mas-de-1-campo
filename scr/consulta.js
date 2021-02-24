db.equipo.aggregate([
    { $match: {$expr: { $gt: [ "$Presupuesto", 100 ]}}},

    {$group:
        { _id:{ año: {$year: "$Fecha_fundación"}},
        Comunidad_Autonoma: "$ComunidadAutonoma"
    },
        Antigüedad: {$subtract:["$año",2021] }
    },
   { $project: {
       _id: 0,
       año: "$_id.año",
       Comunidad: "$_id.Comunidad_Autonoma",
       Club: "$_id.Club",
       PresupuestoPorAntiguedad: {$divide: ["$Presupuesto","$Antiguedad"]}
   }},
   { $sort:{año: 1, Club: 1}},
   {$match:{ PresupuestoPorAntiguedad:{$gt:8}}}
])

