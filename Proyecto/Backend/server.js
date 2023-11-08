const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const db = pgp("postgres://nombre_de_usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos");

app.use(bodyParser.json());

app.post("/guardar_datos", (req, res) => {
    const { campo1, campo2 } = req.body;

    db.none("INSERT INTO nombre_de_la_tabla (campo1, campo2) VALUES ($1, $2)", [campo1, campo2])
        .then(() => {
            res.json({ mensaje: "Datos guardados exitosamente" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Hubo un error al guardar los datos" });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

