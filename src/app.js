const express = require('express');
const routesMangas = require ('./routes/routesMangas')
const routesCapitulos = require ('./routes/routesCapitulos')
const routesPaginas = require ('./routes/routesPaginas');
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express()

app.use(express.json())
app.use('./mangas',routesMangas)
app.use('./capitulos',routesCapitulos)
app.use('./paginas',routesPaginas)
app.use(errorMiddleware)



app.get('/', async(req, res) => {
    res.status(200).send('Olá',)
})






module.exports = {
    app,
}