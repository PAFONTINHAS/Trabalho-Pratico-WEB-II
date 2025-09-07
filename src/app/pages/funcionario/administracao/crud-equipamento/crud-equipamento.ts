import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  imports: [CommonModule,FormsModule ],
  selector: 'app-equipamento',
  templateUrl: './crud-equipamento.html',
})
export class EquipamentoComponent {
  categorias: Categoria[] = [
    { id: 1, nome: 'Notebook' },
    { id: 2, nome: 'Impressora' },
    { id: 3, nome: 'Desktop' },
  ];

  formVisivel = false;
  editando = false;
  categoriaAtual: Categoria = { id: 0, nome: '' };

  // abrir 
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.categoriaAtual = { id: 0, nome: '' };
  }

  // cancelar
  cancelar() {
    this.formVisivel = false;
    this.categoriaAtual = { id: 0, nome: '' };
  }

  // salvar 
  salvarCategoria() {
    if (this.categoriaAtual.nome.trim() === '') return;

    if (this.editando) {
      const index = this.categorias.findIndex(c => c.id === this.categoriaAtual.id);
      if (index !== -1) {
        this.categorias[index] = { ...this.categoriaAtual };
      }
    } else {
      const novoId =
        this.categorias.length > 0
          ? Math.max(...this.categorias.map(c => c.id)) + 1
          : 1;
      this.categorias.push({ id: novoId, nome: this.categoriaAtual.nome });
    }

    this.cancelar();
  }

  // editar
  editarCategoria(categoria: Categoria) {
    this.formVisivel = true;
    this.editando = true;
    this.categoriaAtual = { ...categoria };
  }

  // remover
  removerCategoria(id: number) {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }
}
