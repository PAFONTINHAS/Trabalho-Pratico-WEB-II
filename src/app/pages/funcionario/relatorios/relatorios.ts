import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule],
  templateUrl: './relatorios.html'
})
export class Relatorios {
  categoriaService: CategoriaService = new CategoriaService()
  
  categorias = this.categoriaService.listarTodos()

  modalAberto = false;

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }
}
