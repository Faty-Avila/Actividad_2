
const puzzleContainer = document.getElementById("puzzle-container");
const startButton = document.querySelector(".start-button");
const movimientosDiv = document.getElementById('movimientos');
const tiempoDiv = document.getElementById('tiempo');
let tablero;

function iniciarJuego() {
    tablero = new Tablero();
    tablero.iniciarTiempo(); // Iniciar el tiempo al inicio del juego
    actualizarTablero();
    actualizarInfo();
}
function actualizarTablero() {
    puzzleContainer.innerHTML = "";

    tablero.piezas.forEach((valor, indice) => {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        if (valor !== null) {
            piece.innerText = valor;
        } else {
            piece.innerText = '';
        }
        piece.addEventListener("click", () => moverYActualizar(indice));

        if (valor === null) {
            piece.classList.add("empty-piece");
        }

        puzzleContainer.appendChild(piece);
    });
}

function moverYActualizar(indice) {
    console.log(indice)
    if (tablero.moverPieza(indice)) {
        actualizarTablero();

        if (tablero.piezas.every((valor, index) => valor === null || valor === index + 1)) {
            alert("¡Felicidades! Has resuelto el rompecabezas.");
            tablero.inicializar();
            actualizarTablero();
        }
    }
}

function detenerJuego() {
    tablero.detenerTiempo();
    startButton.disabled = false;
}

function actualizarInfo() {
    movimientosDiv.innerText = `Movimientos: ${tablero.movimientos}`;
    tiempoDiv.innerText = `Tiempo: ${tablero.calcularTiempoTranscurrido()}s`;
}

startButton.addEventListener("click", function () {
    tablero = new Tablero();
    iniciarJuego();
});