import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario-service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gerenciar-funcionarios',
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciar-funcionarios.html',
  styleUrl: './gerenciar-funcionarios.css'
})

export class GerenciarFuncionarios implements OnInit {

  funcionarios: Funcionario[] = []

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarios = this.listarTodos()
        console.log(this.funcionarios)

  }

  listarTodos(): Funcionario[] {
    return this.funcionarioService.listarTodos()
  }

  remover($event: any, funcionario: Funcionario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a pessoa ${funcionario.nome}?`)) {
      this.funcionarioService.remover(funcionario.id!);
      this.funcionarios = this.listarTodos();
    }
  }

}
