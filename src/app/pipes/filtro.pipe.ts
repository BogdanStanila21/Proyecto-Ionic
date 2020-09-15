import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(articulo: any[], texto: string, columna:string): any[]{

    texto = texto.toLowerCase()

    if(texto === ''){
      return articulo
    }

    return articulo.filter( item =>{
      return item[columna].toLowerCase().includes(texto);
    })

  }

}
