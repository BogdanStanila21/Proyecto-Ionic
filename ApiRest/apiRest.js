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
    }
);    

//conectando la ddbb
connection.connect(function(error){
    if(error){
       console.log(error);
    }else{
       console.log('Conexión correcta');
    }
 });

//////////////////////

//--------------------------API artículo--------------------------

// app.get("/articulos", function(req, res, next)
// {
//     let variable = "SELECT usuario.nick, nombre, antiguedad, descripcion, estado, imagen FROM articulo JOIN usuario_articulo ON (articulo.articulo_id = usuario_articulo.articulo_id) JOIN usuario ON (usuario_articulo.usuario_id = usuario.usuario_id)";
//     let variable2 = [req.params.id];

//     connection.query(variable, variable2, function(err, result)
//         {
//             if(err){
//                 console.log(err);
//             }else{
//                 res.send(result);
//                 console.log("GET de artículos");
//             }
//         }
//     );
// }
// );

app.get("/articulo/:id", function(req, res, next)
    {
        let variable = "SELECT articulo.nombre, antiguedad, descripcion, estado, imagen FROM articulo JOIN usuario_articulo ON (articulo.articulo_id = usuario_articulo.articulo_id) JOIN usuario ON (usuario_articulo.usuario_id = usuario.usuario_id) WHERE usuario.usuario_id = ?";
        let variable2 = [req.params.id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de artículo");
                }
            }
        );
    }
);

app.post("/articulo", function(req, res, next)
{
    let variable = "INSERT INTO articulo (nombre, antiguedad, descripcion, estado, imagen) VALUES (?,?,?,?,?)";
    let variable2 = [req.body.nombre, req.body.antiguedad, req.body.descripcion, req.body.estado, req.body.imagen];

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("POST de artículo");
                let idArticulo = result.insertId;
                let arr = [req.body.usuario_id, idArticulo];
                let sentencia = "INSERT INTO usuario_articulo (usuario_id, articulo_id) VALUES (?,?)";
                    connection.query(sentencia, arr, function(err, result)
                        {
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Sub POST de artículo_usuario");
                            }
                        }
                    );
            }
        }
    );
}
);


app.put("/articulo", function(req, res, next)
{
    let variable = "UPDATE articulo SET nombre = ?, antiguedad = ?, descripcion = ?, estado = ?, imagen = ? WHERE articulo_id = " + [req.query.id];
    let variable2 = [req.body.nombre, req.body.antiguedad, req.body.descripcion, req.body.estado, req.body.imagen];

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("PUT de artículo");
            }
        }
    );
}
);


app.delete("/articulo", function(req, res, next)
{
    let variable = "DELETE FROM articulo WHERE articulo_id = ?"
    let variable2 = [req.body.articulo_id];

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("DELETE de artículo");
            }
        }
    );
}
);

///////////////////////////

// API para el que realiza
app.get("/intercambio/realiza/:id", function(req, res, next)
    {
        let variable = "SELECT intercambio_id, intercambio.estado_intercambio, usuario.nick, articulo.nombre, articulo.antiguedad, articulo.descripcion, articulo.estado, articulo.imagen FROM intercambio JOIN usuario ON (intercambio.usuario_idRealiza = usuario.usuario_id) JOIN articulo ON (intercambio.articulo_idRealiza = articulo.articulo_id) WHERE intercambio.usuario_idRealiza = ?";
        let variable2 = [req.params.id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de intercambio realiza");
                }
            }
        );
    }
);

// API para el que recibe
app.get("/intercambio/recibe/:id", function(req, res, next)
    {
        let variable = "SELECT intercambio_id, usuario.nick, articulo.nombre, articulo.antiguedad, articulo.descripcion, articulo.estado, articulo.imagen FROM intercambio JOIN usuario ON (intercambio.usuario_idRecibe = usuario.usuario_id) JOIN articulo ON (intercambio.articulo_idRecibe = articulo.articulo_id) WHERE intercambio.usuario_idRecibe = ?";
        let variable2 = [req.params.id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de intercambio recibe");
                }
            }
        );
    }
);

app.post("/intercambio", function(req, res, next)
    {
        let variable = "INSERT INTO intercambio (usuario_idRealiza, articulo_idRealiza, usuario_idRecibe, articulo_idRecibe, estado_intercambio) VALUES (?,?,?,?,?)";
        let variable2 = [req.body.usuario_idRealiza, req.body.articulo_idRealiza, req.body.usuario_idRecibe, req.body.articulo_idRecibe, "pendiente"];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("POST de intercambio");
                }
            }
        );
    }
);

app.put("/intercambio", function(req, res, next)
    {
        let variable = "UPDATE intercambio SET estado_intercambio = ? WHERE intercambio_id = ?";
        let variable2 = [req.body.estado_intercambio, req.body.intercambio_id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("PUT de intercambio");
                }
            }
        );
    }
);

app.delete("/intercambio", function(req, res, next)
    {
        let variable = "DELETE FROM intercambio WHERE intercambio_id = ?";
        let variable2 = [req.body.intercambio_id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("DELETE de intercambio");
                }
            }
        );
    }
);


 //API para favoritos


 app.get("/favoritos/:usuario_id", function(req, res, next)
 { let fav=new Array(''+req.params.usuario_id+'')
     connection.query("SELECT articulo.articulo_id, articulo.nombre, articulo.imagen, articulo.descripcion, usuario.nick, usuario.lugar, usuario.valoraciones FROM favoritos JOIN usuario ON (favoritos.usuario_id = usuario.usuario_id) JOIN articulo ON (favoritos.articulo_id = articulo.articulo_id) WHERE favoritos.usuario_id=?",fav, function(err, result)
         {
             if(err){
                 console.log(err);
             }else{
                 res.send(result);
                 console.log("GET de favoritos");
             }
         }
     );
 }
 );
 
 app.post("/favoritos", function(req, res, next)
     {
         let var1 = "INSERT INTO favoritos (usuario_id, articulo_id) VALUES (?,?)";
         let var2 = [req.body.usuario_id, req.body.articulo_id];
 
         connection.query(var1, var2, function(err, result)
             {
                 if(err){
                     console.log(err);
                 }else{
                     res.send(result);
                     console.log("POST de favoritos");
                 }
             }
         );
     }
 );
 
 app.delete("/favoritos", function(req, res, next)
     {
         let nuevo=new Array(''+req.body.favoritos_id+'')
         let borrado = "DELETE FROM favoritos WHERE favoritos_id = ?"
 
         connection.query(variable,fav, function(err, result)
             {
                 if(err){
                     console.log(err);
                 }else{
                     console.log(nuevo)
                     res.send(result);
                     console.log("DELETE de favoritos");
                 }
             }
         );
     }
 );

 app.listen(3000)
