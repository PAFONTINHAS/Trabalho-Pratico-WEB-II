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
  private subscription: Subscription = new Subscription();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  funcionario = { id: 0, nome: '', email: '', dataNasc: '', senha: '' };
  formVisivel = false;
  editando = false;

  ngOnInit(): void {
    Funcionarios.forEach(funcionario => this.funcionarioService.inserirFuncionariosBase(funcionario))
    this.subscription = this.funcionarioService.funcionarios$.subscribe(data => {
      this.funcionarios = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.funcionario = { id: 0, nome: '', email: '', dataNasc: '', senha: '' };
  }

  cancelar() {
    this.formVisivel = false;
  }

  salvar() {
    if (this.funcionario.nome.trim() === '') return;
    if (this.editando) {
      this.funcionarioService.atualizar(this.funcionario);
    } else {
      this.funcionarioService.inserir(this.funcionario);
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
      this.funcionarioService.remover(funcionario.id!);
    }
  }

}
