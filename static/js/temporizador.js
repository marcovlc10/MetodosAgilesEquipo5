let limite = 25 * 60000;
let ms = 1500000;

let temporizadorId = 0;
const tiempoText = document.getElementById("tiempo");

function iniciarTemporizador() {
    temporizadorId = setInterval(correrTiempo, 100);
}

function correrTiempo() {
    ms -= 100;
    console.log(ms);
    renderizarTiempo(ms);
    if (ms == 0) {
        clearInterval(temporizadorId);
    }
}

function renderizarTiempo(ms) {
    let tiempoConCeros = milisegundosAMinutosYSegundos(ms);
    tiempoText.innerText = tiempoConCeros;
}

function pausarTemporizador() {
    clearInterval(temporizadorId);
}

function renaudarTemporizador() {}

const agregarCeroSiEsNecesario = (valor) => {
    if (valor < 10) {
        return "0" + valor;
    } else {
        return "" + valor;
    }
};

const milisegundosAMinutosYSegundos = (milisegundos) => {
    const minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    segundos = milisegundos / 1000;
    return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(
        segundos.toFixed(1)
    )}`;
};
