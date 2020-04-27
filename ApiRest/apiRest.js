let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let cors = require("cors");
let mysql = require("mysql");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "appmovil", //DDBB
});

//conectando la ddbb
connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Conexion correcta.");
  }
});

app.get("/articuloUsuario", (request, response) => {
  let myUser = new Array("" + request.query.usuario_id + "");
  console.log(myUser);
  let sql;
  if (myUser == "undefined") {
    sql = "SELECT * FROM usuario_articulo";
  } else {
    sql = "SELECT * FROM usuario_articulo WHERE usuario_articulo_id =?";
  }
  connection.query(sql, myUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log("GET de user");
    }
  });
});

app.get("/articuloUsuario/:usuario_articulo_id", (request, response) => {
  let myUser = new Array("" + request.params.usuario_articulo_id + "");
  console.log(myUser);
  let sql;
  sql = "SELECT * FROM usuario_articulo WHERE usuario_articulo_id=?";

  connection.query(sql, myUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log("GET de user");
    }
  });
});

app.post("/articuloUsuario", (request, response) => {
  let sql;
  let myUser = new Array(request.body.usuario_id, request.body.articulo_id);
  console.log(myUser);
  sql = "INSERT INTO usuario_articulo (usuario_id,articulo_id) VALUES(?,?)";
  connection.query(sql, myUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log("POST de user");
    }
  });
});

app.put("/articuloUsuario", (request, response) => {
  let sql;
  let myUser = new Array(
    request.body.usuario_articulo_id,
    request.body.usuario_id,
    request.body.articulo_id
  );
  sql =
    "UPDATE usuario_articulo SET usuario_articulo_id=?,usuario_id=?,articulo_id=? WHERE usuario_id=?";
  connection.query(sql, myUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(myUser);
      console.log("PUT de user");
    }
  });
});

app.delete("/articuloUsuario", (request, response) => {
  let sql;
  let myUser = new Array("" + request.body.usuario_articulo_id + "");
  sql = "DELETE FROM usuario_articulo WHERE usuario_articulo_id=?";
  connection.query(sql, myUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log("DELETE de user");
    }
  });
});

app.listen(3000);
