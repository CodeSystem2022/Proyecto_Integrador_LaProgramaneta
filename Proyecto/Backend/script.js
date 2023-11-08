document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("miFormulario");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const contraseña = document.getElementById("contraseña").value;
        const correo = document.getElementById("correo").value;

        // Realiza una solicitud AJAX al servidor para agregar un usuario
        fetch("/agregar_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, contraseña, correo }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Maneja la respuesta del servidor (éxito o error)
                console.log(data);
            });
    });
});
