import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administracao.html'
})
export class Administracao {
  
  constructor(private router: Router) {}

  gerenciarFuncionarios() {
    this.router.navigate(['/funcionario/criar-funcionario']);
  }

  gerenciarCategorias() {
    this.router.navigate(['/funcionario/crud-equipamento']);
  }

  gerarRelatorios() {
    this.router.navigate(['/funcionario/relatorios']);
  }
}

