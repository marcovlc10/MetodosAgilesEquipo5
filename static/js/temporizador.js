let limite = 25 * 60000;
// let ms = 1500000;
let ms = 10000;

let temporizadorId = 0;
const tiempoText = document.getElementById("tiempo");
const btnPausar = document.getElementById("btn-pausar")

function iniciarTemporizador() {
    temporizadorId = setInterval(correrTiempo, 100);
    btnPausar.removeAttribute("disabled")
}

function correrTiempo() {
    ms -= 100;
    // console.log(ms);
    renderizarTiempo(ms);
    if (ms == 5000) {
        alert("Está a punto de concluir el tiempo")
    }
    
    if(ms == 0){
        clearInterval(temporizadorId);
        ms = 1500000
        iniciarTemporizador()
    }
}

function renderizarTiempo(ms) {
    let tiempoConCeros = milisegundosAMinutosYSegundos(ms);
    tiempoText.innerText = tiempoConCeros;
}

function pausarTemporizador() {
    clearInterval(temporizadorId);
    btnPausar.setAttribute("disabled", "disabled")
    mostrarMensaje("El tiempo ha sido pausado", "infro", "pausa", "warning")
}

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
