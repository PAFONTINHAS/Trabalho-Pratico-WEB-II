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
  private subscription: Subscription = new Subscription(); 

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ){}

  formVisivel = false;
  editando = false;

  // PROPRIEDADES ADICIONADAS PARA O MODAL
  modalRemocaoAberto: boolean = false;
  categoriaParaRemover: Categoria | null = null;
  // ------------------------------------

  categoria: Categoria = { // Assegure-se de usar a interface correta
    id: 0,
    nome: ''
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (data) => {
        this.categorias = data; 
        console.log("Categorias carregadas com SUCESSO. Contagem:", data.length); 
        console.log("Dados:", data);                                          
      },
      error: (e) => {
        console.error('Erro ao carregar categorias: ', e);
      }
    });
  }

  ngOnInit(): void {
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
      this.categoriaService.atualizar(this.categoria).subscribe({
        next: () => {
          this.carregarCategorias(); 
          this.cancelar();
        },
        error: (e) => console.error('Erro ao atualizar categoria', e)
      });
      
    } else {
      // Inserção (POST)
      this.categoriaService.inserir(this.categoria).subscribe({
        next: () => {
          this.carregarCategorias();
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

  /**
   * @description Abre o modal de confirmação de remoção.
   * @param $event O evento de clique.
   * @param categoria O objeto Categoria a ser removido.
   */
  abrirModalRemocao($event: Event, categoria: Categoria): void {
    $event.preventDefault();
    this.categoriaParaRemover = categoria;
    this.modalRemocaoAberto = true;
  }

  /**
   * @description Fecha o modal de confirmação de remoção.
   */
  fecharModalRemocao(): void {
    this.modalRemocaoAberto = false;
    this.categoriaParaRemover = null;
    this.carregarCategorias(); // Recarrega a lista para atualizar a tabela após fechar o modal (mesmo que a remoção falhe)
  }
  
  /**
   * @description Executa a remoção da categoria confirmada pelo modal.
   */
  removerCategoriaConfirmada(): void {
    if (!this.categoriaParaRemover || !this.categoriaParaRemover.id) {
      this.fecharModalRemocao();
      return;
    }
    
    this.categoriaService.remover(this.categoriaParaRemover.id).subscribe({
      next: () => {
        this.carregarCategorias(); 
        this.fecharModalRemocao();
      },
      error: (e) => {
        console.error('Erro ao remover categoria', e);
        this.fecharModalRemocao();
      }
    });
  }
}