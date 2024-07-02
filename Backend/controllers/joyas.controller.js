// controllers/joyas.controller.js
const { obtenerJoyas, filtrarJoyas } = require('../models/joyas.model.js');
const findError = require('../utils/utils.js');
const { generateJoyasResponse } = require('../utils/hateoas.js');



// traer Joyas
const getJoyas = async (req, res) => {
    try {
        const limits = Number(req.query.limits) || 5;
        const order_by = req.query.order_by || 'id_ASC';
        const page = Number(req.query.page) || 1;
        const joyas = await obtenerJoyas({ limits, order_by, page });
        const joyasResponse = generateJoyasResponse(joyas);
        res.json(joyasResponse);
    } catch (error) {
        console.error('Error al obtener joyas:', error);
        const errorFound = findError(error.code);
        res.status(errorFound.status).json({ error: errorFound.message });
    }
};

const getJoyasFiltradas = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;
        const joyas = await filtrarJoyas({ precio_max, precio_min, categoria, metal });

        const joyasResponse = generateJoyasResponse(joyas);

        res.json(joyasResponse);
    } catch (error) {
        console.error('Error al filtrar joyas:', error);
        res.status(500).json({ error: 'Error al filtrar joyas.' });
    }
};

module.exports = {
    getJoyas,
    getJoyasFiltradas
};
