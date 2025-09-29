import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  imports: [RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  handlePhone (event: any) {
    console.log("oi")
    let input = event.target
    input.value = this.phoneMask(input.value)
  }

  private phoneMask = (value: string) => {
    if (!value) return ""

    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")

    return value
  }

  handleCpf(e: any) {
    let input = e.target
    input.value = this.cpfMask(input.value)

  }

  private cpfMask = (value: any) => {
    if (!value) return ""

    value = value.replace(/\D/g, '') 
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2') 
    value = value.replace(/(\d{3})(\d)/, '$1-$2')
    value = value.replace(/(-\d{2})\d+?$/, '$1')

    return value
  }

}
