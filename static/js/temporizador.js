let limite = 25 * 60000;
// let ms = 1500000;
let ms = 10000;

// const pomodoroTiempo = 1500000
const pomodoroTiempo = 10000;
// const pomodoroDescanso = 300000
const pomodoroDescanso = 6000;
let tiempoODescansoContador = 1;

let temporizadorId = 0;
const tiempoText = document.getElementById("tiempo");
const btnPausar = document.getElementById("btn-pausar");
const btnRenaudar = document.getElementById("btn-renaudar");
const btnRest = document.getElementById("btn-rest");

function iniciarTemporizador() {
    temporizadorId = setInterval(correrTiempo, 100);
    btnPausar.removeAttribute("disabled");
    btnRest.removeAttribute("disabled");
    btnRenaudar.setAttribute("disabled", "disabled");
}

function correrTiempo() {
    ms -= 100;
    // console.log(ms);
    renderizarTiempo(ms);
    if (ms == 5000) {
        alert("Está a punto de concluir el tiempo");
    }

    if (ms == 0) {
        clearInterval(temporizadorId);

        if (tiempoODescansoContador % 2 == 0) {
            ms = pomodoroTiempo;
        } else {
            ms = pomodoroDescanso;
        }
        tiempoODescansoContador++;

        iniciarTemporizador();
    }
}

function renderizarTiempo(ms) {
    let tiempoConCeros = milisegundosAMinutosYSegundos(ms);
    tiempoText.innerText = tiempoConCeros;
}

function pausarTemporizador() {
    clearInterval(temporizadorId);
    btnPausar.setAttribute("disabled", "disabled");
    btnRenaudar.setAttribute("disabled", "disabled");
    btnRenaudar.removeAttribute("disabled");
    mostrarMensaje("El tiempo ha sido pausado", "infro", "pausa", "warning");
}

function termiarTemporizador() {
    pausarTemporizador();
    ms = pomodoroTiempo;
    btnRenaudar.setAttribute("disabled", "disabled");
}

function restablecerTemporizador(){
    Swal.fire({
        title: "¿Estás seguro que deseas restablecer el temporizador?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No",
        customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            tiempoText.innerText='00:10';
            btnRenaudar.setAttribute("disabled", "disabled");
            ms=10000;

            Swal.fire("Temporizador restablecido", "", "success");
            
        } else if (result.isDenied) {
            Swal.fire("Temporizador conservado", "", "info");
        }
    });
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