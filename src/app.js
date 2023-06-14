const express = require('express');
require('express-async-errors');
const { routesMangas, routesPaginas,routesCapitulos,routesLeituras } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/mangas', routesMangas);

app.use('/paginas', routesPaginas);

app.use('/capitulos', routesCapitulos)

app.use('/leitura', routesLeituras)



app.use(errorMiddleware);

module.exports = {
  app,
}