const mysql  = require("mysql2/promise");
const user = process.env.DB_USUARIO;
const password = process.env.DB_SEGURE;
const host = process.env.DB_ENDERECO;
const host2 = process.env.DB_NUMERO;
const port = process.env.DB_ENTRADA;
const database = process.env.DB_BASE;

const connection = mysql.createPool({
    host     : host|host2,
    user     : user,
    password : password,
    port     : port,
    database: database,   
})

module.exports = connection;