import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../shared/entities/funcionario_entity';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario-service';

@Component({
  selector: 'app-criar-funcionario',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './criar-funcionario.html',
  styleUrl: './criar-funcionario.css'
})

export class CriarFuncionario {
  @ViewChild("formFunci") formFunci!: NgForm

  funcionario = {
    id: 0,
    nome: '' ,
    email: '',
    dataNasc: '' ,
    senha: '' ,
  }

  // funcionario: Funcionario = new Funcionario()

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router) { }

  inserir(): void {
    if (this.formFunci.form.valid) {
      this.funcionarioService.inserir(this.funcionario);
      this.router.navigate( ["/funcionario/gerenciar-funcionarios"] );
    }
  }
  
}
