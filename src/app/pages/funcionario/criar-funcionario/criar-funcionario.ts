import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-funcionario',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './criar-funcionario.html',
  styleUrl: './criar-funcionario.css'
})

export class CriarFuncionario {
  @ViewChild("formFunci") formFunci!: NgForm
  funcionario: Funcionario = new Funcionario()

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
