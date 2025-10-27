import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {NgxMaskDirective} from 'ngx-mask';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViaCep } from '../../services/via-cep/via-cep';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule], //NgxMaskDirective removido
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  cadastroForm: FormGroup;
  cepError: string | null = null;
  mostrarModal = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCep,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Cadastro.cpfValido]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Cadastro.cepValido]],
      uf: ['PR', [Validators.required]],
      cidade: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.maxLength(6)]],
      telefone: ['', [Validators.required, Cadastro.telefoneValido]]
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  static cpfValido(control: AbstractControl): { [key: string]: boolean } | null {
    const cpf = control.value?.replace(/\D/g, '');
    if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return { cpfInvalido: true };
    }
    let soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };
    return null;
  }

  static telefoneValido(control: AbstractControl): { [key: string]: boolean } | null {
      const telefone = control.value?.replace(/\D/g, '');
      if (telefone && (telefone.length === 10 || telefone.length === 11)) {
        return null;
      }
      return { telefoneInvalido: true };
  }

  static cepValido(control: AbstractControl): { [key: string]: boolean } | null {
    const cep = control.value?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      return null;
    }
    return { cepInvalido: true };
  }

  get cpf() { return this.cadastroForm.get('cpf'); }
  get nome() { return this.cadastroForm.get('nome'); }
  get email() { return this.cadastroForm.get('email'); }
  get cep() { return this.cadastroForm.get('cep'); }
  get uf() { return this.cadastroForm.get('uf'); }
  get cidade() { return this.cadastroForm.get('cidade'); }
  get logradouro() { return this.cadastroForm.get('logradouro'); }
  get numero() { return this.cadastroForm.get('numero'); }
  get telefone() { return this.cadastroForm.get('telefone'); }


  consultaCEP() {
    this.cepError = null;
    if (this.cep?.valid) {
      this.viaCepService.consultarCep(this.cep.value).subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    if (dados.erro) {
      this.cadastroForm.get('cep')?.setErrors({ notFound: true });
      return;
    }
    this.cadastroForm.patchValue({
      logradouro: dados.logradouro,
      cidade: dados.localidade,
      uf: dados.uf
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Formulário válido!', this.cadastroForm.value);
      this.abrirModal();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.cadastroForm.markAllAsTouched();
    }
  }


  handleInput(event: Event, maskFunction: (value: string) => string) {
    const input = event.target as HTMLInputElement;
    input.value = maskFunction(input.value);
  }

  cpfMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }

  cepMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, '').slice(0, 8);
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    return value;
  }

  phoneMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return value;
  }

  numeroMask = (value: string): string => {
    if (!value) return '';
    return value.replace(/\D/g, '').slice(0, 6);
  }
}