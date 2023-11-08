document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("miFormulario");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const campo1 = document.getElementById("campo1").value;
        const campo2 = document.getElementById("campo2").value;

        // Realiza una solicitud AJAX al servidor
        fetch("/guardar_datos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ campo1, campo2 }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Maneja la respuesta del servidor (éxito o error)
                console.log(data);
            });
    });
});
