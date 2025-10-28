import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../shared/entities/funcionario_entity';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario-service';
import { Subscription } from 'rxjs';
import { Funcionarios } from '../../../shared/models/enums/funcionarios.enum'
import { LoginService } from '../../../services/login-service/login';

@Component({
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.html',
})
export class CriarFuncionario implements OnInit, OnDestroy {
  @ViewChild('formFunci') formFunci! : NgForm;
  funcionarios: Funcionario[] = [];
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly router: Router,
    private loginService: LoginService,
  ) {}

  funcionario = { id: 0, nome: '', email: '', data_nasc: '', senha: '' };
  formVisivel = false;
  editando = false;
  minDate: Date = new Date();

  carregarFuncionarios(){
    console.log("oi")
    this.funcionarioService.listarTodos().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.funcionarios.map((funcionario) => {
          funcionario.data_nasc = this.formatarData(funcionario.data_nasc)
        })
      },

      error: (e) =>{
        console.error('Erro ao carregar funcionários: ', e);
      }

    });
  }

  ngOnInit(): void {
    this.carregarFuncionarios();
    this.minDate = new Date()
  
    // Funcionarios.forEach(funcionario => this.funcionarioService.inserirFuncionariosBase(funcionario))
    // this.subscription = this.funcionarioService.funcionarios$.subscribe(data => {
    //   this.funcionarios = data;
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.funcionario = { id: 0, nome: '', email: '', data_nasc: '', senha: '' };
  }

  cancelar() {
    this.formVisivel = false;
  }

  salvar() {
    if (this.funcionario.nome.trim() === '') return;
    if (this.formFunci.form.valid) {
      if (this.editando) {
        this.funcionarioService.atualizar(this.funcionario).subscribe(this.carregarFuncionarios)
      } else {
        console.log(this.funcionario)
        this.funcionarioService.inserir(this.funcionario).subscribe(this.carregarFuncionarios)
      }
    }
    this.cancelar();
  }

  editarForm(funcionario: Funcionario) {
    this.formVisivel = true;
    this.editando = true;
    this.funcionario = { ...funcionario };
  }

  remover($event: any, funcionario: Funcionario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o funcionario ${funcionario.nome}?`)) {
      const user = this.loginService.usuarioLogado
      if(user) {
        this.funcionarioService.remover(funcionario.id, user).subscribe(this.carregarFuncionarios)
      }
      
    }
  }

  formatarData(dataNasc: string) {
    const data = new Date(dataNasc)
    return data.toLocaleDateString("en-GB")
  }

}
