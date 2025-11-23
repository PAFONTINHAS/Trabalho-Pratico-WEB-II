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
  erroDelete: boolean = false
  modalRemocaoAberto: boolean = false;
  funcionarioParaRemover: Funcionario | null = null;
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly router: Router,
    private loginService: LoginService,
  ) {}

  funcionario = { id: 0, nome: '', email: '', data_nasc: '', senha: '' };
  formVisivel = false;
  editando = false;
  maxDate: string = "";
  dataFormatada: Date = new Date();

  carregarFuncionarios(){
    this.funcionarioService.listarTodos().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.funcionarios.map((funci) => {
          this.dataFormatada = new Date(funci.data_nasc)
          funci.data_nasc = this.formatarData(this.dataFormatada)
        })
      },

      error: (e) =>{
        console.error('Erro ao carregar funcionários: ', e);
      }

    });
  }

  ngOnInit(): void {
    this.carregarFuncionarios();
    this.maxDate = new Date().toISOString().split('T')[0];
  
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
        this.funcionarioService.atualizar(this.funcionario).subscribe( { 
          next: () => {
            this.carregarFuncionarios() // <-- CORREÇÃO: Adicionado () para chamar a função
          }
        })
      } else {
        this.funcionarioService.inserir(this.funcionario).subscribe(() => {
          this.carregarFuncionarios() // <-- CORREÇÃO: Adicionado () para chamar a função
        })
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
    // Substitui a chamada a 'confirm()' pela abertura do modal customizado
    this.abrirModalRemocao(funcionario); 
  }

  abrirModalRemocao(funcionario: Funcionario): void {
    this.funcionarioParaRemover = funcionario;
    this.modalRemocaoAberto = true;
  }

  fecharModalRemocao(): void {
    this.modalRemocaoAberto = false;
    this.funcionarioParaRemover = null;
  }

  removerFuncionarioConfirmado(): void {
    if (!this.funcionarioParaRemover || !this.funcionarioParaRemover.id) {
      this.fecharModalRemocao();
      return;
    }
    
    const id = this.funcionarioParaRemover.id;
    const user = this.loginService.usuarioLogado;
    
    if (user) {
        this.funcionarioService.remover(id, user).subscribe({
            next: () => {
                this.carregarFuncionarios(); // A correção do recarregamento agora funciona aqui!
                this.fecharModalRemocao();
            },
            error: (e) => {
                console.error('Erro ao remover funcionário', e);
                this.erroDelete = true
                setTimeout(() => {
                  this.erroDelete = false;
                }, 3000);
                this.fecharModalRemocao();
            }
        });
    }
  }

  formatarData(dataNasc: Date) {
    return dataNasc.toISOString().split('T')[0];
  }

}
