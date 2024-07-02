// utils.js
const ERRORS = require("../helpers/errors");

const findError = (code) => {
    return ERRORS.find((err) => err.code === code) || { status: 500, message: 'Error desconocido.' };
};

module.exports = findError;
