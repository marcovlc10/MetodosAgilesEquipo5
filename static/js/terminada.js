const listaTareasTerminadas = [];
// let fecha = new Date();
// let fechaActual;

const tareasTerminadasTable = document.getElementById(
    "tareas-terminadas-table"
);

function terminar(button) {
    listaTareasProceso.forEach((tarea, index) => {
        if (tarea.id == button.dataset.tarea_terminada) {
            preguntarPorConfirmacion(tarea, index)
            
        }
    });
}

function renderizarTareasTerminadas() {
    let body = tareasTerminadasTable.querySelector("tbody");
    body.innerHTML = "";

    listaTareasTerminadas.forEach((tarea, index) => {
        body.innerHTML += `
        <tr draggable="true" ondragstart="dragit(event)" ondragover="dragover(event)">
            <th scope="row">${tarea.id}</th>
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.fecha}</td>
            <td>${tarea.hora}</td>
        </tr>`;
    });
}

function preguntarPorConfirmacion(tarea, index) {
    Swal.fire({
        title: "¿Estás seguro que deseas marcar la tarea como completada?",
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
            listaTareasTerminadas.unshift(tarea);
            listaTareasProceso.splice(index, 1);
            tarea.fecha=calcularFecha();
            tarea.hora=calcularHora();
            
            // fechaActual=fecha.toLocaleDateString();
            // hora=fecha.toLocaleTimeString('en-US');
            renderizarTareasProceso();
            renderizarTareasTerminadas();
            termiarTemporizador();
            restablecerTemporizador();

            Swal.fire("Tarea terminada!", "", "success");
            
        } else if (result.isDenied) {
            Swal.fire("Tarea conservada!", "", "info");
        }
    });
    return confirmacion;
}

function calcularFecha(){
    let fecha = new Date();
    let f=fecha.toLocaleDateString();
    return f;
}

function calcularHora(){
    let hora = new Date();
    let h=hora.toLocaleTimeString('en-US');
    return h;
}
