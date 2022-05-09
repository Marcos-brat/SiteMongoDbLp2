var MongoClient = require('mongodb').MongoClient;

//conectando com o servidor MongoDB
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    var dbo = db.db("piadasdb");

    //criando uma coleção de documentos para a databse
    dbo.createCollection("piada", (err, res) => {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    dbo.collection("piada").insertOne(v1, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });    

    dbo.collection("piada").findOne({}, (err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    });
        
    dbo.collection("piada").find({}).toArray((err, res) => {
        if (err) throw err;
        for (v of res)
            console.log(JSON.stringify(v));
        db.close();
    });

    dbo.collection("piada").find(query)
        .toArray((err, res) => {
            if (err) throw err;
            for (v of res)
                console.log(v);
            db.close();
        });

        
});