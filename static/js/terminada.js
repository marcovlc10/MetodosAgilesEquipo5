const listaTareasTerminadas = [];
let fecha = new Date();
let fechaActual;
let hora;

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
            <td>${fechaActual}</td>
            <td>${hora}</td>
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
            fechaActual=fecha.toLocaleDateString();
            hora=fecha.toLocaleTimeString('en-US');
            renderizarTareasProceso();
            renderizarTareasTerminadas();
            termiarTemporizador()

            Swal.fire("Tarea terminada!", "", "success");
            
        } else if (result.isDenied) {
            Swal.fire("Tarea conservada!", "", "info");
        }
    });
    return confirmacion;
}
