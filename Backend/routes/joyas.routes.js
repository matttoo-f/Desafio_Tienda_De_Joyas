const router = require('express').Router()
const {getJoyas, getJoyasFiltradas} = require('../controllers/joyas.controller.js')

router.get("/joyas", getJoyas)
router.get('/joyas/filtros', getJoyasFiltradas)


module.exports = router