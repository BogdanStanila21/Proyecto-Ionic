import { Articulo } from './articulo';
import { UsuarioModel } from './usuario';

export class IntercambioModel {

    public intercambio_id:number;
    public usuario_idRealiza:number;
    public articulo_idRealiza:number;
    public usuario_idRecibe:number;
    public articulo_idRecibe:number;
    public estado_intercambio:string;
    public usuarioIdValoracion1:number;
    constructor(){}
}

export class IntercambioVerModel {
    public intercambio_id:IntercambioModel[];
    public usuario_idRealiza:UsuarioModel[];
    public articulo_idRealiza:Articulo[];
    public usuario_idRecibe:UsuarioModel[];
    public articulo_idRecibe:Articulo[];

    constructor(){}
}
