const listaTareasProceso = [];
const tareasProcesoTable = document.getElementById(
    "tareas-en-proceso-table"
);

function enProgreso(button) {
    listaTareasPendientes.forEach((tarea, index)=> {
        if(tarea.id == button.dataset.tarea){
            listaTareasProceso.push(tarea)
            listaTareasPendientes.splice(index, 1)
            renderizarTareasPendientes()
            renderizarTareasProceso()
            return
        }
    })
}

function renderizarTareasProceso() {
    let body = tareasProcesoTable.querySelector("tbody");
    body.innerHTML = "";

    listaTareasProceso.forEach((tarea, index) => {
        body.innerHTML += `
        <tr draggable="true" ondragstart="dragit(event)" ondragover="dragover(event)">
            <th scope="row">${tarea.id}</th>
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="iniciarTemporizador()" data-tarea="${tarea.id}">Iniciar temporizador</button></td>
        </tr>`;
    });
}
