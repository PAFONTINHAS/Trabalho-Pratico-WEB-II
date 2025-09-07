import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracao',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './administracao.html'
})
export class Administracao {
  
  constructor(private router: Router) {}

  gerenciarFuncionarios() {
    this.router.navigate(['/funcionario/administracao/funcionarios']);
  }

  gerenciarCategorias() {
    this.router.navigate(['/funcionario/administracao/categorias']);
  }

  gerarRelatorios() {
    this.router.navigate(['/funcionario/administracao/relatorios']);
  }
}