var app = new Vue({
    el: "#app",
    data: {
        texto:"",
        categorias:[],
        titulo: "", 
        categoria: "",
        URL: "http://localhost:8081",
        filtro: "",
        piadas: [],
        aleatoria:[],
    },

    mounted(){
        this.getCategorias();
    },

    methods: {
        getCategorias(){
            axios.get(`${this.URL}/getCategorias`)
            .then(response => {
                console.log(response.data)
                this.categorias = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },

        inserirPiada: function () {
            let piada = {
                texto: this.texto,
                categoriaId: this.categoria,
                titulo: this.titulo
            }
            console.log(piada);

            axios.post(`${this.URL}/inserirPiada`, piada)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },

        buscarAleatorio() {
            axios.get(`${this.URL}/Aleatorio`)
            .then(response => {
                console.log(response);
                this.aleatoria = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        filtrarPiada(){
            axios.get(`${this.URL}/piadaComFiltro/${this.filtro}`)
            .then(response => {
                console.log(response.data)
                this.piadas = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        }

    }
});
