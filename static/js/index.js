const listaTareasPendientes = [];

const formTarea = document.getElementById("form-tarea");
const tituloTareaInput = document.getElementById("titulo-tarea-input");
const descripcionTareaInput = document.getElementById("descripcion-tarea-input");
const btnAgregarTarea = document.getElementById("agregar-tarea-btn");
const formModal = document.getElementById("agregar-tarea-modal");
const tareasPendientesTable = document.getElementById("tareas-pendientes-table");

// Editar tarea
const editarTituloInput = document.getElementById("titulo-tarea-input-editar")
const editarDescripcionINput = document.getElementById("descripcion-tarea-input-editar")
const formEditarTarea = document.getElementById("form-editar-tarea")

var tareaEnEdicionId = null


formTarea.onsubmit = function (event) {
    event.preventDefault();
    if (tituloTareaInput.value != "" && descripcionTareaInput.value != "") {
        let tarea = new Tarea(
            tituloTareaInput.value,
            false,
            descripcionTareaInput.value
        );
        console.log(tareaExiste(tarea))
        if (tareaExiste(tarea)) {
            mostrarMensaje(
                "Ya existe una tarea con ese nombre o descripción",
                "error",
                "error",
                "warning"
            );
            return false;
        }
        listaTareasPendientes.unshift(tarea);

        renderizarTareasPendientes();

        mostrarMensaje(
            "Tarea registrada con éxito",
            "success",
            "Éxito",
            "warning"
        );
        Swal.getConfirmButton().addEventListener("click", (event) => {
            $("#agregar-tarea-modal").modal("hide");
        });

        tituloTareaInput.value = ""
        descripcionTareaInput.value = ""
    }
    return false;
};

formEditarTarea.onsubmit = function(event){
    event.preventDefault()
    if (editarTituloInput.value != "" && editarDescripcionINput.value != ""){
        listaTareasPendientes.forEach(tarea => {
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
                renderizarTareasPendientes()
                $("#editar-tarea-modal").modal("hide");

            }
        })
    }
    return false
}

function renderizarTareasPendientes() {
    let body = tareasPendientesTable.querySelector("tbody");
    body.innerHTML = "";

    listaTareasPendientes.forEach((tarea, index) => {
        // console.log(tarea);
        body.innerHTML += `
        <tr draggable="true" ondragstart="dragit(event)" ondragover="dragover(event)">
            <th scope="row">${tarea.id}</th>
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="editar(this)" data-tarea="${tarea.id}">Editar</button></td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="enProgreso(this)" data-tarea="${tarea.id}">En proceso</button></td>
            <td><button style="background-color:red; border-color:red" class="btn btn-success" id="tarea-${tarea.id}" onclick="eliminarTareaPendiente(this)"data-tarea_pendiente="${tarea.id}">Eliminar tarea</button></td>
        </tr>`;
    });
}



function editar(tareaNode){

    tareaEnEdicionId = tareaNode.dataset.tarea
    let tarea = listaTareasPendientes.find(tarea => tarea.id == tareaEnEdicionId)
    console.log("tarea encontrada: ", tarea)
    $("#editar-tarea-modal").modal("show");
    editarTituloInput.value = tarea.titulo
    editarDescripcionINput.value = tarea.descripcion
}

function tareaExiste(tarea) {
    let test = false;
    listaTareasPendientes.forEach((item) => {
        console.log(tarea, item)
        if (
            tarea.titulo == item.titulo ||
            tarea.descripcion == item.descripcion
        ) {
            console.log(tarea.nombre == item.nombre, tarea.descripcion == item.descripcion)
            test = true;
        }
    });
    return test;
}

function mostrarMensaje(text, icon, tittle, type) {
    Swal.fire({
        title: tittle,
        text: text,
        type: type,
        icon: icon,
        confirmButtonText: "OK",
        confirmButtonColor: "#691C32",
    });
}

function moverAPendiente(button) {
    listaTareasProceso.forEach(
        (tarea, index) => {
            if (tarea.id == button.dataset.tarea_pendiente) {
                confirmarMovPendiente(tarea, index)
            }
        }
    );
}

function confirmarMovPendiente(tarea, index) {
    Swal.fire({
        title: "¿Estás seguro que deseas mover la tarea a pendiente?",
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
            listaTareasPendientes.unshift(tarea);
            listaTareasProceso.splice(index, 1);
            renderizarTareasProceso();
            renderizarTareasPendientes();
            termiarTemporizador();
            restablecerTemporizador();

            Swal.fire("Tarea marcada como pendiente correctamente", "", "success");
            
        } else if (result.isDenied) {
            Swal.fire("Tarea conservada!", "", "info");
        }
    });
    return confirmacion;
}

function eliminarTareaProceso(button) {
    listaTareasProceso.forEach(
        (tarea, index) => {
            if (tarea.id == button.dataset.tarea_pendiente) {
                Swal.fire({
                    title: "¿Estás seguro que desea eliminar la tarea?",
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
                        listaTareasProceso.splice(index, 1);
                        renderizarTareasProceso();
                        renderizarTareasPendientes();
                        termiarTemporizador();
                        restablecerTemporizador();
            
                        Swal.fire("Tarea eliminada correctamente", "", "success");
                        
                    } else if (result.isDenied) {
                        Swal.fire("Tarea conservada!", "", "info");
                    }
                });
                return confirmacion;
            }
        }
    );
}

function eliminarTareaPendiente(button) {
    listaTareasPendientes.forEach(
        (tarea, index) => {
            if (tarea.id == button.dataset.tarea_pendiente) {
                Swal.fire({
                    title: "¿Estás seguro que desea eliminar la tarea?",
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
                        listaTareasPendientes.splice(index, 1);
                        renderizarTareasProceso();
                        renderizarTareasPendientes();
                        termiarTemporizador();
                        restablecerTemporizador();
            
                        Swal.fire("Tarea eliminada correctamente", "", "success");
                        
                    } else if (result.isDenied) {
                        Swal.fire("Tarea conservada!", "", "info");
                    }
                });
                return confirmacion;
            }
        }
    );
}

// function terminar(button) {
//     listaTareasProceso.forEach((tarea, index) => {
//         if (tarea.id == button.dataset.tarea_terminada) {
//             preguntarPorConfirmacion(tarea, index)

//         }
//     });
// }
