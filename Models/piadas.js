class Piada{
    constructor(){
        this.id = 0;
        this.titulo = "";
        this.texto = "";
        this.categoria = "";
    }

    constructor(id,titulo,texto,categoria){
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.categoria = categoria;
    }
    
    constructor(titulo,texto,categoria){
        this.id = 0;
        this.titulo = titulo;
        this.texto = texto;
        this.categoria = categoria;
    }
}