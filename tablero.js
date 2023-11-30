class Tablero {
    constructor() {
        this.piezas = Array.from({ length: 15 }, (_, index) => index + 1);
        this.piezas.push(null); // Representa la pieza vacía
        this.inicializar();
        this.movimientos = 0;
    }

    inicializar() {
        // Revolver piezas 
        for (let i = this.piezas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.piezas[i], this.piezas[j]] = [this.piezas[j], this.piezas[i]];
        }
    }

    moverPieza(indice) {
        const piezaVacia = this.piezas.indexOf(null);
        if (this.esVecino(indice, piezaVacia)) {
            [this.piezas[indice], this.piezas[piezaVacia]] = [this.piezas[piezaVacia], this.piezas[indice]];
            this.movimientos++;
            return true; // Movimiento válido
        }
        return false; // Movimiento no válido
    }

    esVecino(indice1, indice2) {
        const fila1 = Math.floor(indice1 / 4);
        const columna1 = indice1 % 4;
        const fila2 = Math.floor(indice2 / 4);
        const columna2 = indice2 % 4;

        return Math.abs(fila1 - fila2) + Math.abs(columna1 - columna2) === 1;
    }

    iniciarTiempo() {
        this.tiempoInicio = Date.now();
        this.tiempoIntervalo = setInterval(() => {
            this.actualizarInfo();
        }, 1000); 
    }

    detenerTiempo() {
        clearInterval(this.tiempoIntervalo);
        this.tiempoIntervalo = null;
    }

    actualizarInfo() {
        const movimientosDiv = document.getElementById('movimientos');
        const tiempoDiv = document.getElementById('tiempo');
      
        movimientosDiv.innerText = `Movimientos: ${this.movimientos}`;
        tiempoDiv.innerText = `Tiempo: ${this.calcularTiempoTranscurrido()}s`;
      }
      

    calcularTiempoTranscurrido() {
        if (this.tiempoInicio === 0) {
            return 0;
        }
        const tiempoActual = Date.now();
        const tiempoTranscurrido = Math.floor((tiempoActual - this.tiempoInicio) / 1000);
        return tiempoTranscurrido;
    }
    setEstado(nuevoEstado) {
        this.piezas = nuevoEstado.flat();
        this.movimientos = 0;
        this.detenerTiempo();  // Puedes reiniciar el tiempo si lo deseas
      }
      
}
