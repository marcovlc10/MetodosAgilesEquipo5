const listaTareasProceso = [];
const tareasProcesoTable = document.getElementById(
    "tareas-en-proceso-table"
);

formEditarTarea.onsubmit = function(event){
    event.preventDefault()
    if (editarTituloInput.value != "" && editarDescripcionINput.value != ""){
        listaTareasProceso.forEach(tarea => {
            if(tarea.id == tareaEnEdicionId){
                tarea.titulo = editarTituloInput.value
                tarea.descripcion = editarDescripcionINput.value

                if(tareaExiste(tarea)){
                    mostrarMensaje(
                        "Ya existe una tarea con ese nombre o descripción",
                        "error",
                        "error",
                        "warning"
                    );
                    return false;
                }
                renderizarTareasProceso()
                $("#editar-tarea-modal").modal("hide");

            }
        })
    }
    return false
}

function editarTareaEnProceso(tareaNode){

    tareaEnEdicionId = tareaNode.dataset.tarea
    let tarea = listaTareasProceso.find(tarea => tarea.id == tareaEnEdicionId)
    $("#editar-tarea-modal").modal("show");
    editarTituloInput.value = tarea.titulo
    editarDescripcionINput.value = tarea.descripcion
}

function enProgreso(button) {
    listaTareasPendientes.forEach((tarea, index)=> {
        if(tarea.id == button.dataset.tarea){
            listaTareasProceso.unshift(tarea)
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
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="terminar(this)" data-tarea_terminada="${tarea.id}">Terminar tarea</button></td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="moverAPendiente(this)" data-tarea_pendiente="${tarea.id}">Mover a pendientes</button></td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="editarTareaEnProceso(this)" data-tarea="${tarea.id}">Editar</button></td>
            <td><button style="background-color:red; border-color:red" class="btn btn-success" id="tarea-${tarea.id}" onclick="eliminarTareaProceso(this)" data-tarea_pendiente="${tarea.id}">Eliminar tarea</button></td>
        </tr>`;
    });
}


