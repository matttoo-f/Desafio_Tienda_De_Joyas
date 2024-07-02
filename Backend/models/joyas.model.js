// models/joyas.model.js
const format = require('pg-format');
const pool = require('../database/db_config');

const obtenerJoyas = async ({ limits = 5, order_by = 'id_ASC', page = 1 }) => {
    try {
        const offset = Math.abs((page - 1) * limits);
        const [campo, direccion] = order_by.split("_");
        const formatQuery = format(`SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s`, campo, direccion, limits, offset);
        const { rows: inventario } = await pool.query(formatQuery);
        return inventario;
    } catch (error) {
        console.error('Error al obtener joyas:', error);
        throw error;
    }
};

const filtrarJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
        // Construir la base de la consulta
        let query = `SELECT * FROM inventario WHERE 1=1`;
        const values = [];

        // Añadir condiciones a la consulta
        if (precio_max) {
            query += format(` AND precio <= %L`, precio_max);
        }
        if (precio_min) {
            query += format(` AND precio >= %L`, precio_min);
        }
        if (categoria) {
            query += format(` AND categoria = %L`, categoria);
        }
        if (metal) {
            query += format(` AND metal = %L`, metal);
        }

        // Ejecutar la consulta
        const { rows: inventario } = await pool.query(query, values);
        return inventario;
    } catch (error) {
        console.error('Error al filtrar joyas:', error);
        throw error;
    }
};

module.exports = {
    obtenerJoyas,
    filtrarJoyas
};
