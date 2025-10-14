import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../shared/entities/categoria_entity';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule,FormsModule, RouterModule],
  selector: 'app-categoria',
  templateUrl: './crud-categoria.html',
})
export class CategoriaComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  // A Subscription para o BehaviorSubject não será mais usada, mas a variável pode ser mantida
  // ou removida se não for usada para outras chamadas.
  private subscription: Subscription = new Subscription(); 

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ){}

  formVisivel = false;
  editando = false;

  categoria: Categoria = { // Assegure-se de usar a interface correta
    id: 0,
    nome: ''
  }

  // Função para carregar a lista do backend
  carregarCategorias(): void {
    // Chama o serviço (agora HTTP) e se inscreve para receber os dados
    this.categoriaService.listarTodos().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (e) => {
        console.error('Erro ao carregar categorias:', e);
        // Lógica de feedback de erro aqui
      }
    });
  }

  ngOnInit(): void {
    // Apenas carrega os dados reais do backend
    this.carregarCategorias();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.categoria = { id: 0, nome: '' };
  }

  cancelar() {
    this.formVisivel = false;
  }

  salvar() {
    if (this.categoria.nome.trim() === '') return;
    
    if (this.editando) {
      // Atualização (PUT)
      this.categoriaService.atualizar(this.categoria).subscribe({
        next: () => {
          this.carregarCategorias(); // Sucesso: recarrega a lista
          this.cancelar();
        },
        error: (e) => console.error('Erro ao atualizar categoria', e)
      });
      
    } else {
      // Inserção (POST)
      this.categoriaService.inserir(this.categoria).subscribe({
        next: () => {
          this.carregarCategorias(); // Sucesso: recarrega a lista para mostrar a nova categoria
          this.cancelar();
        },
        error: (e) => console.error('Erro ao inserir categoria', e)
      });
    }
  }

  editarForm(categoria: Categoria) {
    this.formVisivel = true;
    this.editando = true;
    this.categoria = {...categoria}
  }

  remover($event: any, categoria: Categoria): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a categoria ${categoria.nome}?`)) {
      this.categoriaService.remover(categoria.id!).subscribe({
        next: () => {
          this.carregarCategorias(); // Sucesso: recarrega a lista
        },
        error: (e) => console.error('Erro ao remover categoria', e)
      });
    }
  }
}