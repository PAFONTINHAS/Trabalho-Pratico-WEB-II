import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Categoria } from '../../../shared/entities/categoria_entity';
@Component({
  selector: 'app-relatorios',
  imports: [CommonModule],
  templateUrl: './relatorios.html',
})
export class Relatorios implements OnInit {
  constructor(private readonly categoriaService: CategoriaService) {}
  // categoriaService: CategoriaService = new CategoriaService()

  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
        console.log('Categorias carregadas com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      },

      complete: () => {
        console.log('Requisição de categorias completa');
      },
    });
  }
  
  modalAberto = false;

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }
}
