const pgp = require("pg-promise")();

const connectionOptions = {
    host: "localhost", // Cambia esto según la ubicación de tu base de datos
    port: 5432, // Puerto predeterminado de PostgreSQL
    database: "pagina",
    user: "postgres",
    password: "admin",
};

const db = pgp(connectionOptions);

module.exports = db;
