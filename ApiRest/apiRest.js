let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let cors = require("cors");
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
connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Conexión correcta');
    }
});

//////////////////////

//----------------------------------API artículo------------------------------------------------------------//

app.get("/articulos/:id", function (req, res, next) {
    let variable = "SELECT usuario.nick, articulo.articulo_id, articulo.nombre, antiguedad, descripcion, estado, articulo.imagen FROM articulo JOIN usuario_articulo ON (articulo.articulo_id = usuario_articulo.articulo_id) JOIN usuario ON (usuario_articulo.usuario_id = usuario.usuario_id) WHERE usuario_articulo.usuario_id != ?";
    let variable2 = [req.params.id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de artículos");
        }
    }
    );
}
);
//app.get("/articulos", function(req, res, next)
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


app.get("/articulo/:id", function (req, res, next) {
    let variable = "SELECT articulo.articulo_id, articulo.imagen, articulo.nombre, antiguedad, descripcion, estado, usuario.nick, usuario.foto, usuario.valoraciones, usuario.usuario_id FROM articulo JOIN usuario_articulo ON (articulo.articulo_id = usuario_articulo.articulo_id) JOIN usuario ON (usuario_articulo.usuario_id = usuario.usuario_id) WHERE articulo.articulo_id = ?";
    let variable2 = [req.params.id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de artículo");
        }
    }
    );
}
);


//para editar la info de mi articulo subido//

app.get("/articuloinfo/:articulo_id", function(req, res, next)
{
    let var1= "SELECT * FROM articulo WHERE articulo_id = ?";
    let var2= [req.params.articulo_id];
    connection.query(var1, var2, function(err, result)
    {
        if(err){
            console.log(err);
        } else{
            res.send(result);
            console.log("GET DE ARTICULO MODIFICAR")
        };

    })
});

//----------Api para mostrar sólo mis articulos en mi perfil---------//
app.get("/misarticulos/:usuario_id", function (req, res, next) {
    let var1 = "SELECT * FROM articulo JOIN usuario_articulo ON (articulo.articulo_id= usuario_articulo.articulo_id) WHERE usuario_articulo.usuario_id = ?";
    let var2 = [req.params.usuario_id]
    connection.query(var1, var2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            console.log("GET de mis articulos")
        }
    })
});

//get de usuario id para relizar intercambio

app.get("/articulo-usuario/:articulo_id", (req, res) => {
    let var1 = [req.params.articulo_id];
    let var2 = "SELECT usuario_id FROM usuario_articulo WHERE articulo_id=?";

    connection.query(var2, var1, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de articulo_usuario")
        }
    })
})

app.post("/articulo", function (req, res, next) {
    let variable = "INSERT INTO articulo (nombre, antiguedad, descripcion, estado, categoria, imagen) VALUES (?,?,?,?,?,?)";
    let variable2 = [req.body.nombre, req.body.antiguedad, req.body.descripcion, req.body.estado, req.body.categoria, req.body.imagen];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("POST de artículo");
            let idArticulo = result.insertId;
            let arr = [req.body.usuario_id, idArticulo];
            let sentencia = "INSERT INTO usuario_articulo (usuario_id, articulo_id) VALUES (?,?)";
            connection.query(sentencia, arr, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
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
    let variable = "UPDATE articulo SET nombre = ?, antiguedad = ?, descripcion = ?, estado = ?, categoria =?, imagen = ? WHERE articulo_id = ? " ;
    let variable2 = [req.body.nombre, req.body.antiguedad, req.body.descripcion, req.body.estado, req.body.categoria, req.body.imagen, req.body.articulo_id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("PUT de artículo");
        }
    }
    );
}
);

//----------Api para editar mis articulos en mi perfil---------//
app.put("/misarticulos/:usuario_id", function (req, res, next) {
    let variable = "UPDATE articulo SET nombre = ?, antiguedad = ?, descripcion = ?, estado = ?, imagen = ? WHERE articulo_id = " + [req.query.id];
    let variable2 = [req.body.nombre, req.body.antiguedad, req.body.descripcion, req.body.estado, req.body.imagen];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("PUT de artículo");
        }
    }
    );
}
);





app.delete("/articulo", function (req, res, next) {
    let variable = "DELETE FROM articulo WHERE articulo_id = ?"
    let variable2 = [req.body.articulo_id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("DELETE de artículo");
        }
    }
    );
}
);

///////////////////////////

app.get("/intercambios",(req,res)=>{

    connection.query("SELECT * FROM intercambio", (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//------------------------------- API para el que realiza-------------------------------//
app.get("/intercambio/realiza/:id", function (req, res, next) {
    let datos1peticion = [];
    let variable = "SELECT * FROM intercambio WHERE intercambio.usuario_idRealiza = ?";
    let variable2 = [req.params.id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("GET de intercambio realiza");
            res.send(result);
        }
    }
    );
}
);

// -------------------------------API para el que recibe-------------------------------//
app.get("/intercambio/recibe/:id", function (req, res, next) {
    let variable = "SELECT * FROM intercambio WHERE usuario_idRecibe = ? && estado_intercambio !='rechazada'";
    let variable2 = [req.params.id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de intercambio recibe");
        }
    }
    );
}
);

//para ver los datos del intercambio

app.get("/intercambio/articulo/:articulo_id", (req, res) => {
    connection.query("SELECT * FROM articulo WHERE articulo_id=" + req.params.articulo_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            console.log("Intercambio-articulo")
        };
    })
})

app.get("/intercambio/usuario/:usuario_id", (req, res) => {
    connection.query("SELECT * FROM usuario WHERE usuario_id=" + req.params.usuario_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            console.log("Intercambio-usuario")
        };
    })
})

app.post("/intercambio", function (req, res, next) {
    let variable = "INSERT INTO intercambio (usuario_idRealiza, articulo_idRealiza, usuario_idRecibe, articulo_idRecibe) VALUES (?,?,?,?)";
    let variable2 = [req.body.usuario_idRealiza, req.body.articulo_idRealiza, req.body.usuario_idRecibe, req.body.articulo_idRecibe];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("POST de intercambio");
        }
    }
    );
}
);

app.put("/intercambio", function (req, res, next) {
    let variable = "UPDATE intercambio SET estado_intercambio = ? WHERE intercambio_id = ?";
    let variable2 = [req.body.estado_intercambio, req.body.intercambio_id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(variable2)
            console.log("PUT de intercambio");
        }
    }
    );
}
);

app.put("/intercambio/valoracion",(req,res)=>{
    let variable = "UPDATE intercambio SET usuarioIdValoracion1=? WHERE intercambio_id=?";
    let variable2 = [req.body.usuarioIdValoracion1, req.body.intercambio_id];

    connection.query(variable, variable2, (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log("PUT de intercambio/valoracion");
        }
    })
})

app.delete("/intercambio", function (req, res, next) {
    let variable = "DELETE FROM intercambio WHERE intercambio_id = ?";
    let variable2 = [req.body.intercambio_id];

    connection.query(variable, variable2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("DELETE de intercambio");
        }
    }
    );
}
);


//-------------------------------API para favoritos-------------------------------//


app.get("/favoritos/:usuario_id", function (req, res, next) {
    let fav = new Array('' + req.params.usuario_id + '')
    connection.query("SELECT favoritos_id, articulo.articulo_id, articulo.nombre, articulo.imagen, articulo.descripcion, usuario.nick, usuario.lugar, usuario.valoraciones FROM favoritos JOIN usuario ON (favoritos.usuario_id = usuario.usuario_id) JOIN articulo ON (favoritos.articulo_id = articulo.articulo_id) WHERE favoritos.usuario_id=?", fav, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de favoritos");
        }
    }
    );
}
);

app.get("/misfavoritos/usuario_id", function (req, res, next) {
    let fav = new Array('' + req.params.usuario_id + '')
    connection.query("SELECT * FROM favorios WHERE usuario_id=?", fav, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("GET de favoritos");
        }
    }
    );
}
);

app.post("/favoritos", function (req, res, next) {
    let var1 = "INSERT INTO favoritos (usuario_id, articulo_id) VALUES (?,?)";
    let var2 = [req.body.usuario_id, req.body.articulo_id];

    connection.query(var1, var2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("POST de favoritos");
        }
    }
    );
}
);

app.delete("/favoritos", function (req, res, next) {
    let nuevo = new Array('' + req.body.favoritos_id + '')
    let borrado = "DELETE FROM favoritos WHERE favoritos_id = ?"

    connection.query(borrado, nuevo, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(nuevo)
            res.send(result);
            console.log("DELETE de favoritos");
        }
    }
    );
}
);

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
    let usuario = new Array(req.body.nombre, req.body.nick, req.body.email, req.body.lugar, req.body.contrasenya);
    let sql;
    sql = "INSERT INTO usuario (nombre, nick, email, lugar, contrasenya) VALUES (?, ?, ?, ?, ?)";
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
    let usuario = new Array(req.body.nombre, req.body.nick, req.body.email, req.body.lugar, req.body.foto, req.body.contrasenya, req.body.usuario_id);
    let sql;
    sql = "UPDATE usuario SET nombre=?, nick=?, email=?, lugar=?, foto=?, contrasenya=? WHERE usuario_id=?";
    connection.query(sql, usuario, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("PUT de usuario");
        }
    })
})

//--------------------------------------------------Api para valoraciones-------------------------------//
app.put("/usuario/valoraciones", (req, res) => {
    let usuario = new Array('' + req.body.usuario_id + '')
    connection.query("SELECT valoraciones FROM usuario WHERE usuario_id=?", usuario, (err, result) => {
        if (err) {
            console.log("Error select:" + err)
        } else {
            let valoraciones = ((parseFloat(result[0].valoraciones) + parseInt(req.body.valoraciones)) / 2).toFixed(2)
            let valoracion = new Array(valoraciones, req.body.usuario_id);
            let sql;
            sql = "UPDATE usuario SET valoraciones=? WHERE usuario_id=?";
            connection.query(sql, valoracion, (err, result) => {
                if (err) {
                    console.log("Error update:" + err);
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

//--------------------------------------------------Api para chat-------------------------------//

app.get("/chat/:id", (req, res) => {
    let sql = "SELECT * FROM chat WHERE (usuario_recibe=" + req.params.id + ")||((usuario_realiza=" + req.params.id + "))";

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.post("/chat", (req, res) => {
    let variable = [req.body.usuario_realiza, req.body.usuario_recibe, req.body.mensaje];
    let sql = "INSERT INTO chat (usuario_realiza, usuario_recibe, mensaje) VALUES (?, ?, ?)";

    connection.query(sql, variable, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/michat/", (req, res) => {
    let variable = [req.body.usuario_id, req.body.id]
    let sql = "SELECT * FROM chat WHERE ((usuario_recibe=" + req.body.id + ")&&(usuario_realiza=" + req.body.usuario_id + "))||((usuario_recibe=" + req.body.usuario_id + ")&&(usuario_realiza=" + req.body.id + "))";

    connection.query(sql, variable, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//--------------------------------------------------Api para chat-------------------------------//

app.post("/usuario/login", (req, res) => {
    let sql;
    let login = new Array(req.body.email, req.body.contrasenya);
    sql = "SELECT usuario_id, nombre, nick, email, lugar, valoraciones, foto FROM usuario WHERE email=? && contrasenya=?";
    connection.query(sql, login, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result)
        }
    })
})

//para ver los datos del intercambio

app.get("/intercambio/articulo/:articulo_id", (req, res) => {
    connection.query("SELECT * FROM articulo WHERE articulo_id=" + req.params.articulo_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            console.log("Intercambio-articulo")
        };
    })
})

app.get("/intercambio/usuario/:usuario_id", (req, res) => {
    connection.query("SELECT * FROM usuario WHERE usuario_id=" + req.params.usuario_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            console.log("Intercambio-usuario")
        };
    })
})

app.listen(3000);
