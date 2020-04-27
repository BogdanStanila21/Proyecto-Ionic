let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors')
let mysql = require("mysql");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: null,
        database: "appmovil"   //DDBB 
    });

//conectando la ddbb
connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Conexion correcta.');
    }
});

//----------------------------------------Api usuario-------------------------------------

app.get("/usuario", (req, res) => {
    let usuario = new Array('' + req.query.usuario_id + '')
    let sql;
    if (usuario == 'undefined') {
        sql = "SELECT * FROM usuario"
    } else {
        sql = "SELECT * FROM usuario WHERE usuario_id=?"
    }
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
            console.log("GET de usuario query")
        }
    })
})

app.get("/usuario/:usuario_id", (req, res) => {
    let usuario = new Array('' + req.params.usuario_id + '')
    let sql;
    sql = "SELECT * FROM usuario WHERE usuario_id=?"
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
            console.log("GET de usuario params")
        }
    })
})

app.post("/usuario", (req, res) => {
    let valoraciones = 0
    let usuario = new Array(req.body.nombre, req.body.nick, req.body.email, req.body.lugar, valoraciones, req.body.contrasenya);
    let sql;
    sql = "INSERT INTO usuario (nombre, nick, email, lugar, valoraciones, contrasenya) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("POST de usuario");
        }
    })
})

app.put("/usuario", (req, res) => {
    let usuario = new Array(req.body.nombre, req.body.nick, req.body.email, req.body.lugar, req.body.contrasenya, req.body.usuario_id);
    let sql;
    sql = "UPDATE usuario SET nombre=?, nick=?, email=?, lugar=?, contrasenya=? WHERE usuario_id=?";
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("PUT de usuario");
        }
    })
})

//Api para valoraciones
app.put("/usuario/valoraciones", (req, res) => {
    let usuario = new Array('' + req.body.usuario_id + '')
    connection.query("SELECT valoraciones FROM usuario WHERE usuario_id=?", usuario, (err, result) => {
        if (err) {
            console.log("Error select:"+err)
        } else {
            let valoraciones = ((parseFloat(result[0].valoraciones) + parseInt(req.body.valoraciones))/2).toFixed(2)
            let valoracion = new Array(valoraciones, req.body.usuario_id);
            let sql;
            sql = "UPDATE usuario SET valoraciones=? WHERE usuario_id=?";
            connection.query(sql, valoracion, (err, result) => {
                if (err) {
                    console.log("Error update:"+err);
                } else {
                    res.send(result);
                    console.log("PUT de valoraciones");
                }
            })
        }
    })

})

app.delete("/usuario", (req, res) => {
    let usuario = new Array('' + req.body.usuario_id + '');
    let sql;
    sql = "DELETE FROM usuario WHERE usuario_id=?";
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
            console.log("DELETE de usuario")
        }
    })
})






app.listen(3000)