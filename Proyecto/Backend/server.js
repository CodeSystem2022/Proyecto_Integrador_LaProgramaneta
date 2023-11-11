const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: "localhost",
    port: 5432,
    database: "pagina",
    user: "postgres",
    password: "admin",
};

const db = pgp(dbConfig);

app.use(bodyParser.json());

// Ruta para agregar un nuevo usuario
app.post("/guardar_datos", (req, res) => {
    const { nombre, contraseña, correo } = req.body;

    db.none("INSERT INTO usuarios (nombre, contraseña, correo) VALUES ($1, $2, $3)", [nombre, contraseña, correo])
        .then(() => {
            res.json({ mensaje: "Usuario guardado exitosamente" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Hubo un error al guardar el usuario" });
        });
});

// Ruta para agregar un nuevo panel
app.post("/agregar_panel", (req, res) => {
    const { nombre, tipo, potencia, precio } = req.body;

    db.none("INSERT INTO paneles (nombre, tipo, potencia, precio) VALUES ($1, $2, $3, $4)", [nombre, tipo, potencia, precio])
        .then(() => {
            res.json({ mensaje: "Panel agregado exitosamente" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Hubo un error al agregar el panel" });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

