const express = require("express");
const app = express();
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

app.use(cors());
app.use(express.json());

// definindo a rota raiz
app.get("/", function (req, res) {
    console.log("Serviço iniciado");
});
// definindo a rota ajuda
app.get("/ajuda", function (req, res) {
    res.send("Página de ajuda!");
});

app.post("/inserirPiada", function(req,res){
    const piada = req.body;
    console.log(piada);
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("piadasdb");
        dbo.collection("piadas").insertOne(piada, (err, result)=> {
            if (err) throw err;
            db.close();
            return res.json(result);
        });
    });
});

app.get("/getCategorias", function(req,res){    
    MongoClient.connect(url, (err, db) => { 
        if (err) throw err;
        var dbo = db.db("piadasdb");
        dbo.collection("categorias").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json(result); 
            db.close();
        });
    });
});


    


app.get("/piadaComFiltro/:filtro?", function(req,res){
    const filtro = req.params.filtro;
    const query = filtro ? { titulo: {'$regex': filtro, '$options': 'i'} } : {};
    console.log(query);
    MongoClient.connect(url, (err, db) => { 
        if (err) throw err;
        var dbo = db.db("piadasdb");
        dbo.collection("piadas").aggregate([
            { $match: query },
            { $lookup: {
                from: "categorias",
                localField: "categoriaId",
                foreignField: "_id",
                as: "categoria"
            }},
        ])
        .sort({ _id: -1 })
        .toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.get("/Aleatorio", function(req,res){

    let random = Math.floor(Math.random() * 4);
    
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("piadasdb");
        dbo.collection("piadas").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json(result[random]);
            db.close();

        });
    });
});

// executando o servidor
app.listen(8081, function () {
    console.log("Servidor na porta 8081");
});