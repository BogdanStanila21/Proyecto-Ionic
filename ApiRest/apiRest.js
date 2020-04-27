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
connection.connect(function(error){
    if(error){
       console.log(error);
    }else{
       console.log('conexion correcta');
    }
 });

 //----------------------------------- API para favoritos -----------------------------------//


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