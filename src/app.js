require('dotenv'). config();
const express = require('express');
require('express-async-errors');


const routesMangas = require ('./routes/routesMangas')
const validateMangas = require ('./middlewares/validateMangas')

const routesCapitulos = require ('./routes/routesCapitulos')
const validateCapitulos = require ('./middlewares/validateCapitulos')

const routesPaginas = require ('./routes/routesPaginas')
const validatePaginas = require ('./middlewares/validatePaginas')

const routesLeitura = require ('./routes/routesLeitura')
const validateLeitura = require ('./middlewares/validateLeitura')

const errorMiddleware = require('./middlewares/errorMiddleware');
const variavelTeste = process.env.TESTE;


const app = express()

app.use(express.json())
app.use('./mangas',validateMangas, routesMangas)
app.use('./capitulos',validateCapitulos, routesCapitulos)
app.use('./paginas',validatePaginas, routesPaginas)
app.use('./leitura',validateLeitura, routesLeitura)
app.use(errorMiddleware)



app.get('/', async(req, res) => {
    res.status(200).send('Olá',variavelTeste);
})






module.exports = {
    app,
}