let id = 0;
class Tarea {
    constructor(titulo, completada, descripcion, fecha, hora) {
        this.id = id++
        this.titulo = titulo;
        this.completada = completada;
        this.descripcion = descripcion;
        this.fecha=fecha;
        this.hora=hora;
    }
}
