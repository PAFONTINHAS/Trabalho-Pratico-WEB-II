import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViaCep } from '../../services/via-cep/via-cep';
import { CadastroService, ClienteRegistroDto } from '../../services/cadastro-service/cadastro';
import { cpfValido } from '../../shared/functions/cpf_control';
import { cepValido } from '../../shared/functions/cep_control';
import { telefoneValido } from '../../shared/functions/telefone_valido';
import { cepMask, cpfMask, numeroMask, phoneMask } from '../../shared/functions/mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  cadastroForm: FormGroup;
  cepError: string | null = null;
  mostrarModal = false;

  isLoading: boolean = false; 
  errorMessage: string | null = null; 

  constructor(
    private readonly fb: FormBuilder,
    private readonly viaCepService: ViaCep,
    private readonly router: Router,
    private readonly cadastroService: CadastroService 
  ) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, cpfValido]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, cepValido]],
      uf: ['PR', [Validators.required]],
      cidade: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.maxLength(6)]],
      telefone: ['', [Validators.required, telefoneValido]]
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.router.navigate(['/login']); 
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
    this.errorMessage = null;
    this.isLoading = true;

    if (this.cadastroForm.valid) {
      const formValue = this.cadastroForm.value;

      const payload: ClienteRegistroDto = {
        nome: formValue.nome,
        email: formValue.email,
        cpf: formValue.cpf.replaceAll(/\D/g, ''), 
        telefone: formValue.telefone.replaceAll(/\D/g, ''), 
        endereco: { 
          cep: formValue.cep.replaceAll(/\D/g, ''), 
          logradouro: formValue.logradouro, 
          numero: formValue.numero,
          cidade: formValue.cidade,
          estado: formValue.uf 
        }
      };

      this.cadastroService.registrar(payload).subscribe({
        next: (resposta) => {
          this.isLoading = false;
          console.log('Cadastro realizado com sucesso!', resposta);
          this.abrirModal(); 
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erro ao cadastrar:', err);
          
          if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Não foi possível concluir o cadastro. Tente novamente.';
          }
        }
      });

    } else {
      this.isLoading = false;
      console.log('Formulário inválido. Verifique os campos.');
      this.cadastroForm.markAllAsTouched();
    }
  }

  getErrorMessage(fieldControl: AbstractControl | null, fieldName: string ) : string | null{

    if(!fieldControl || !fieldControl.invalid || !fieldControl.touched){
      return null;
    }

    if(fieldControl?.errors?.['required']){
      return `O ${fieldName} é obrigatório`
    } 

    if(fieldControl?.errors?.[`${fieldName}Invalido`]){
      return `O ${fieldName} é inválido`;
    }

    if(fieldControl?.errors?.['minlength']){
      return `O ${fieldName} deve ter no mínimo 3 caracteres.`;
    }

    if(fieldControl?.errors?.['maxlength']){
      return `O ${fieldName} deve ter no máximo 6 dígitos`;
    }
  
    if(fieldControl?.errors?.['notFound']){
      return  `O ${fieldName} não foi encontrado`;
    }

    
    return 'Campo Inválido';

  }

  handleInput(event: Event, maskFunction: (value: string) => string) {
    const input = event.target as HTMLInputElement;
    input.value = maskFunction(input.value);
  }

  cpfMask = cpfMask;
  cepMask = cepMask;
  phoneMask = phoneMask;
  numeroMask = numeroMask;


}
