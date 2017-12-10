var express = require("express");
var Sequelize = require("sequelize");
var nodeadmin = require("nodeadmin");
var connection = require("express-myconnection");
var mysql = require("mysql2");

//conectare la baza de date

var sequelize = new Sequelize('locatii_de_interes','root', '', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

sequelize.authenticate().then(function(){
    console.log('Conectare efectuata cu succes!');
});

var Tara = sequelize.define('tara', {
    nume_tara: Sequelize.STRING,
    regiune: Sequelize.STRING,
    limba_oficiala: Sequelize.STRING,
    capitala: Sequelize.STRING,
    moneda_oficiala: Sequelize.STRING
});

var Oras = sequelize.define('oras', {
    nume_oras: Sequelize.STRING,
    id_tara: Sequelize.INTEGER,
    data_calatorie: Sequelize.STRING,
    obiective_turistice: Sequelize.STRING,
    descriere: Sequelize.STRING,
    fotografii: Sequelize.STRING
});

Oras.belongsTo(Tara, {foreignKey: 'id_tara', targetKey: 'id'});

var app = express();
//Create sql connection
app.use(connection( mysql, {
    host: "localhost",
    user: "root",
    password: "root",
    database: "locatii_de_interes"
}, 'request'));

app.use(nodeadmin(app));

app.use(express.static('public'));
app.use('/admin', express.static('admin'));

app.use(express.json());
app.use(express.urlencoded());

//returneaza o lista de tari
app.get('/tara', function(request, response) {
    Tara.findAll().then(function(t){
        response.status(200).send(t);
    });
});

//returneaza o tara, pe baza unui id
app.get('/tara/:id', function(request, response) {
    Tara.findOne({where: {id:request.params.id}}).then(function(t) {
        if(t) {
            response.status(200).send(t);
        } else {
            response.status(404).send();
        }
    });
});

app.post('/tara', function(request, response) {
    Tara.create(request.body).then(function(t) {
        response.status(201).send(t);
    });
});

app.put('/tara/:id', function(request, response) {
    Tara.findById(request.params.id).then(function(t) {
        if(t) {
            t.update(request.body).then(function(t){
                response.status(201).send(t);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/tara/:id', function(request, response) {
    Tara.findById(request.params.id).then(function(t) {
        if(t) {
            t.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/oras', function(request, response) {
    Oras.findAll(
        {
            include: [{
                model: Tara,
                where: { id: Sequelize.col('oras.id_tara') }
            }]
        }

        ).then(
            function(o) {
                response.status(200).send(o);
            }
        );
});  

app.get('/oras/:id', function(request, response) {
    Oras.findById(request.params.id).then(
            function(o) {
                response.status(200).send(o);
            }
        );
});

app.post('/oras', function(request, response) {
    Oras.create(request.body).then(function(o) {
        response.status(201).send(o);
    });
});

app.put('/oras/:id', function(request, response) {
    Oras.findById(request.params.id).then(function(o) {
        if(o) {
            o.update(request.body).then(function(o){
                response.status(201).send(o);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/oras/:id', function(request, response) {
    Oras.findById(request.params.id).then(function(o) {
        if(o) {
            o.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/tara/:id/oras', function(request, response) {
    Oras.findAll({where:{id_tara: request.params.id}}).then(
            function(o) {
                response.status(200).send(o);
            }
        );
});

app.listen(8080);

