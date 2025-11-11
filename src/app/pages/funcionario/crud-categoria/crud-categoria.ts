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

  // PROPRIEDADES ADICIONADAS PARA O MODAL
  modalRemocaoAberto: boolean = false;
  categoriaParaRemover: Categoria | null = null;
  // ------------------------------------

  categoria: Categoria = { // Assegure-se de usar a interface correta
    id: 0,
    nome: ''
  }

  /**
   * @description Carrega a lista de todas as categorias existentes a partir do backend 
   * usando o CategoriaService e atualiza a propriedade 'categorias' do componente.
   */
  carregarCategorias(): void {
    // Chama o serviço (agora HTTP) e se inscreve para receber os dados
    this.categoriaService.listarTodos().subscribe({
      next: (data) => {
        this.categorias = data; 
        console.log("Categorias carregadas com SUCESSO. Contagem:", data.length); // <-- NOVO LOG DE SUCESSO
        console.log("Dados:", data);                                          // <-- NOVO LOG DE DADOS
      },
      error: (e) => {
        console.error('Erro ao carregar categorias: ', e);
      }
    });
  }

  /**
   * @description Hook de ciclo de vida do Angular. 
   * É chamado após a inicialização do componente.
   * Inicia o carregamento da lista de categorias.
   */
  ngOnInit(): void {
    // Apenas carrega os dados reais do backend
    this.carregarCategorias();
  }

  /**
   * @description Hook de ciclo de vida do Angular. 
   * É chamado antes da destruição do componente.
   * Cancela quaisquer subscrições ativas para evitar vazamento de memória.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * @description Exibe o formulário para criação de uma nova categoria.
   * Reseta o objeto 'categoria' e define 'editando' como falso.
   */
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.categoria = { id: 0, nome: '' };
  }

  /**
   * @description Oculta o formulário, cancelando a operação de criação ou edição.
   */
  cancelar() {
    this.formVisivel = false;
  }

  /**
   * @description Responsável por salvar uma nova categoria ou atualizar uma existente.
   * Verifica se o campo 'nome' não está vazio. 
   * Se 'editando' for verdadeiro, chama o método de atualização (PUT); caso contrário, chama o de inserção (POST).
   */
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

  /**
   * @description Prepara o formulário para editar uma categoria existente.
   * Define 'formVisivel' como verdadeiro, 'editando' como verdadeiro e preenche o objeto 
   * 'categoria' com os dados da categoria a ser editada.
   * @param categoria O objeto Categoria a ser editado.
   */
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