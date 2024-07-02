require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes/joyas.routes.js')
const morgan = require('morgan');


const {PORT} = process.env


app.use(express.json())
app.use(morgan('combined'));



app.use('/', routes)





app.listen(PORT || 3000, console.log("SERVIDOR ENCENDIDO"))



