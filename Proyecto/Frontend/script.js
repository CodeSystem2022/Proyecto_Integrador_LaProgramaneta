const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const separar = "-".repeat(30);

// Crear un objeto para almacenar usuarios
const usuarios = {};

// Crear un objeto para almacenar datos de placas de video
const placasDeVideo = {};

console.log("Bienvenido a Tu Tienda de Paneles Solares");

function registrarUsuario() {
  rl.question("Digite su nombre: ", (nombre) => {
    rl.question("Digite su contraseña: ", (contrasena) => {
      usuarios[nombre] = contrasena;
      console.log("Usuario registrado exitosamente.");
      console.log(separar);
      mostrarMenu();
    });
  });
}

function iniciarSesion() {
  rl.question("Digite su nombre: ", (nombre) => {
    rl.question("Digite su contraseña: ", (contrasena) => {
      if (usuarios[nombre] && usuarios[nombre] === contrasena) {
        console.log("Inicio de sesión exitoso");
        console.log(separar);
        ejecutarMenu();
      } else {
        console.log("Nombre de usuario y/o contraseña incorrectos. Por favor, inténtelo nuevamente.");
        iniciarSesion();
      }
    });
  });
}

function agregarPlacaDeVideo() {
  rl.question("Ingrese el nombre de la placa de video: ", (nombre) => {
    rl.question("Ingrese el consumo en watts de la placa de video: ", (watts) => {
      placasDeVideo[nombre] = parseInt(watts);
      console.log("Placa de video agregada.");
      console.log(separar);
      mostrarMenu();
    });
  });
}

function eliminarPlacaDeVideo() {
  rl.question("Ingrese el nombre de la placa de video a eliminar: ", (nombre) => {
    if (placasDeVideo[nombre]) {
      delete placasDeVideo[nombre];
      console.log("Placa de video eliminada.");
    } else {
      console.log("Placa de video no encontrada.");
    }
    console.log(separar);
    mostrarMenu();
  });
}

function mostrarPlacasDeVideo() {
  console.log("Placas de video registradas:");
  for (const nombre in placasDeVideo) {
    console.log(`${nombre} (${placasDeVideo[nombre]} watts)`);
  }
  console.log(separar);
  mostrarMenu();
}

function mostrarConsumoPlacasDeVideo() {
  console.log("Consumo en watts de cada placa de video:");
  for (const nombre in placasDeVideo) {
    console.log(`${nombre}: ${placasDeVideo[nombre]} watts`);
  }
  console.log(separar);
  mostrarMenu();
}

function mostrarConsumoTotalPlacasDeVideo() {
  let total = 0;
  for (const nombre in placasDeVideo) {
    total += placasDeVideo[nombre];
  }
  console.log(`Consumo total en watts: ${total} watts`);
  console.log(separar);
  mostrarMenu();
}

function panelMasAdecuado() {
  const totalWatts = Object.values(placasDeVideo).reduce((a, b) => a + b, 0);

  const mejoresPaneles = [];
  let mejorDiferencia = Infinity;

  for (const combo of getCombinations(Object.entries(paneles))) {
    const comboWatts = combo.reduce((acc, [, watts]) => acc + watts, 0);
    const diferencia = Math.abs(totalWatts - comboWatts);

    if (diferencia <= 200 && diferencia < mejorDiferencia) {
      mejoresPaneles.length = 0;
      mejoresPaneles.push(...combo.map(([nombre]) => nombre));
      mejorDiferencia = diferencia;
    }
  }

  if (mejoresPaneles.length > 0) {
    console.log("Mejor combinación de paneles solares para el consumo en watts de las placas de video:");
    console.log(`Paneles: ${mejoresPaneles.join(', ')}, Total de watts: ${totalWatts}`);
  } else {
    console.log("No hay combinaciones de paneles solares disponibles dentro del margen de consumo para cubrir el consumo total de las placas de video.");
  }
  console.log(separar);
  mostrarMenu();
}

function mostrarMenu() {
  console.log("Menú:");
  console.log("1. Agregar placa de video");
  console.log("2. Eliminar placa de video");
  console.log("3. Mostrar todas las placas de video");
  console.log("4. Mostrar el consumo en watts de cada placa de video");
  console.log("5. Mostrar el consumo en watts de todas las placas de video");
  console.log("6. Paneles solares más recomendados para el consumo en watts de las placas de video");
  console.log("7. Salir");
  rl.question("Ingrese una opción: ", (opcion) => {
    switch (parseInt(opcion)) {
      case 1:
        agregarPlacaDeVideo();
        break;
      case 2:
        eliminarPlacaDeVideo();
        break;
      case 3:
        mostrarPlacasDeVideo();
        break;
      case 4:
        mostrarConsumoPlacasDeVideo();
        break;
      case 5:
        mostrarConsumoTotalPlacasDeVideo();
        break;
      case 6:
        panelMasAdecuado();
        break;
      case 7:
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        mostrarMenu();
        break;
    }
  });
}

function ejecutarMenu() {
  mostrarMenu();
}

function* getCombinations(arr) {
  const len = arr.length;
  for (let i = 1; i < 1 << len; i++) {
    yield arr.filter((_, j) => i & 1 << j);
  }
}

registrarUsuario();
iniciarSesion();
