let id = 0
class Tarea {
    constructor(titulo, completada, descripcion) {
        this.id = id++
        this.titulo = titulo;
        this.completada = completada;
        this.descripcion = descripcion;
    }
}
