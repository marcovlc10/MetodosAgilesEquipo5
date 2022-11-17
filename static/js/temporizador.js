let limite = 25 * 60000;
// let ms = 1500000;
let ms = 10000;

// const pomodoroTiempo = 1500000
const pomodoroTiempo = 10000;
// const pomodoroDescanso = 300000
const pomodoroDescanso = 6000;
let tiempoODescansoContador = 1;
let cuentaDesc = 0;

let temporizadorId = 0;
const tiempoText = document.getElementById("tiempo");
const btnPausar = document.getElementById("btn-pausar");
const btnRenaudar = document.getElementById("btn-renaudar");
const btnRest = document.getElementById("btn-rest");
const contPomodorosText = document.getElementById("contPomodoros");
const contDescansosText = document.getElementById("contDescansos");
const alertaDescansoText = document.getElementById("txtAlertaDescanso");
const btnOmitir = document.getElementById("btn-omitir");
let valorPomodoros;

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
    if (ms == 5000 && alertaDescansoText.hidden == true) {
        alert("Está a punto de concluir el tiempo");
    }

    if (ms == 0) {
        clearInterval(temporizadorId);

        if (tiempoODescansoContador % 2 == 0) {
            alert("Inicio Pomodoro");
            alertaDescansoText.hidden = true;
            btnOmitir.hidden = true;
            // contPomodorosText.innerHTML -= 1;
            if (contDescansosText.innerHTML == 0) {
                contDescansosText.innerHTML = 4;
            }

            ms = pomodoroTiempo;

            if (alertaDescansoText.innerHTML == "DESCANSO LARGO") {
                alert("Descanso largo terminado");
                restablecerContadores();
            }
        } else {     // ***** DESCANSO
            contPomodorosText.innerHTML -= 1;
            alert("Tiempo de descanso");
            alertaDescansoText.innerHTML = "DESCANSO";
            cuentaDesc += 1;
            contDescansosText.innerHTML = cuentaDesc;
            alertaDescansoText.hidden = false;
            btnOmitir.hidden = false;
            btnOmitir.removeAttribute("disabled");

            ms = pomodoroDescanso;

            valorPomodoros = contPomodorosText.innerHTML;
            if (valorPomodoros == 0) {
                ms = 15000;
                alertaDescansoText.innerHTML = "DESCANSO LARGO";
                restablecerContadores();
            }
        }
        tiempoODescansoContador++;
        iniciarTemporizador();
    }
}

function omitirDescanso() {
    Swal.fire({
        title: "¿Estás seguro que deseas omitir el descanso?",
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
            tiempoText.innerText = '00:10';
            btnRenaudar.setAttribute("disabled", "disabled");
            alertaDescansoText.hidden = true;
            btnOmitir.hidden = true;
            ms = pomodoroTiempo;

            Swal.fire("Descanso omitido, siguiente Pomodoro activo", "", "success");
            tiempoODescansoContador--;
            if (valorPomodoros == 0) {
                cuentaDesc = 0;
            } else {
                cuentaDesc -= 1;
            }
            contDescansosText.innerHTML = cuentaDesc;
        } else if (result.isDenied) {
            Swal.fire("Descanso conservado", "", "info");
        }
    });
}

function restablecerContadores() {
    contPomodorosText.innerHTML = "4";
    cuentaDesc = 0;
    contDescansosText.innerHTML = cuentaDesc;
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
    restablecerContadores();
    tiempoText.innerText = '00:10';
    ms = 10000;
    alertaDescansoText.hidden = true;
    btnOmitir.hidden = true;
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

function restablecerTemporizador() {
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
            if (alertaDescansoText.hidden == true) {
                tiempoText.innerText = '00:10';
                btnRenaudar.setAttribute("disabled", "disabled");
                alertaDescansoText.hidden = true;
                btnOmitir.hidden = true;
                ms = 10000;
            } else {
                tiempoText.innerText = '00:06';
                btnRenaudar.setAttribute("disabled", "disabled");
                btnRenaudar.removeAttribute("disabled");
                alertaDescansoText.innerHTML = "DESCANSO";
                ms = pomodoroDescanso;
            }


            Swal.fire("Temporizador restablecido", "", "success");

        } else if (result.isDenied) {
            Swal.fire("Temporizador conservado", "", "info");
        }
    });
}