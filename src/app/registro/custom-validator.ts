import {AbstractControl} from '@angular/forms';

export class passValidation{

    static matchPass(AC:AbstractControl){
        let pass=AC.get('contrasenya').value;
        let pass2=AC.get('contrasenya2').value;
        if(pass!=pass2){
            console.log("false");
            AC.get('contrasenya2').setErrors({matchPass:true})
        }else{
            console.log("true")
            return null
        }
    }
}