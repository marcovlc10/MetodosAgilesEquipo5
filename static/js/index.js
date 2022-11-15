const listaTareasPendientes = [];

const formTarea = document.getElementById("form-tarea");
const tituloTareaInput = document.getElementById("titulo-tarea-input");
const descripcionTareaInput = document.getElementById(
    "descripcion-tarea-input"
);
const btnAgregarTarea = document.getElementById("agregar-tarea-btn");
const formModal = document.getElementById("agregar-tarea-modal");

const tareasPendientesTable = document.getElementById(
    "tareas-pendientes-table"
);

formTarea.onsubmit = function (event) {
    event.preventDefault();
    if (tituloTareaInput.value != "" && descripcionTareaInput.value != "") {
        let tarea = new Tarea(
            tituloTareaInput.value,
            false,
            descripcionTareaInput.value
        );
        console.log(tareaExiste(tarea))
        if (tareaExiste(tarea)){
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

function renderizarTareasPendientes() {
    let body = tareasPendientesTable.querySelector("tbody");
    body.innerHTML = "";

    listaTareasPendientes.forEach((tarea, index) => {
        console.log(tarea);
        body.innerHTML += `
        <tr draggable="true" ondragstart="dragit(event)" ondragover="dragover(event)">
            <th scope="row">${tarea.id}</th>
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td><button class="btn btn-success" id="tarea-${tarea.id}" onclick="enProgreso(this)" data-tarea="${tarea.id}">En proceso</button></td>
        </tr>`;
    });
}

function tareaExiste(tarea) {
    let test = false;
    listaTareasPendientes.forEach((item) => {
        console.log(tarea, item)
        if (
            tarea.titulo == item.titulo ||
            tarea.descripcion == item.descripcion
        ) {
            console.log( tarea.nombre == item.nombre, tarea.descripcion == item.descripcion)
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
