import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../shared/entities/funcionario_entity';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario-service';
import { Subscription } from 'rxjs';
import { Funcionarios } from '../../../shared/models/enums/funcionarios.enum'

@Component({
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.html',
})
export class CriarFuncionario implements OnInit, OnDestroy {
  funcionarios: Funcionario[] = [];
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly router: Router
  ) {}

  funcionario = { id: 0, nome: '', email: '', data_nasc: '', senha: '' };
  formVisivel = false;
  editando = false;

  carregarFuncionarios(){
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
    if (this.editando) {
      this.funcionarioService.atualizar(this.funcionario).subscribe(response => {
        console.log(response);
      })
    } else {
      console.log(this.funcionario)
      this.funcionarioService.inserir(this.funcionario).subscribe(response => {
        console.log(response);
      })
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
      this.funcionarioService.remover(funcionario.id).subscribe(response => {
        console.log(response);
      })
    }
  }

  formatarData(dataNasc: string) {
    const data = new Date(dataNasc)
    return data.toLocaleDateString("en-GB")
  }

}
