import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViaCep } from '../../services/via-cep/via-cep';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCep
  ) {
    this.cadastroForm = this.fb.group({
      cpf: [''],
      nome: [''],
      email: [''],
      cep: [''],
      uf: ['PR'], 
      cidade: [''],
      logradouro: [''],
      numero: [''],
      telefone: ['']
    });
  }

  consultaCEP() {
    const cep = this.cadastroForm.get('cep')?.value;

    if (cep && cep.length >= 8) { 
      this.viaCepService.consultarCep(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    if (dados.erro) {
      alert('CEP não encontrado.');
      return;
    }

    this.cadastroForm.patchValue({
      logradouro: dados.logradouro,
      cidade: dados.localidade,
      uf: dados.uf
    });
  }

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
