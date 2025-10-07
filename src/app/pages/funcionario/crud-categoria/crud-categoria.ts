import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../shared/entities/categoria_entity';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Subscription } from 'rxjs';
import { Categorias } from '../../../shared/models/enums/categoria.enum';


@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-categoria',
  templateUrl: './crud-categoria.html',
})
export class CategoriaComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly categoriaService: CategoriaService,
    private router: Router
  ) {}

  formVisivel = false;
  editando = false;

  categoria = {
    id: 0,
    nome: '',
  };

  ngOnInit(): void {
    this.carregarCategorias();
    // Categorias.forEach(categoria => this.categoriaService.inserirCategoriasBase(categoria))
    // this.subscription = this.categoriaService.categorias$.subscribe(data => {
    //   this.categorias = data;
    // });
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

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
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

    const operacao = this.editando
      ? this.categoriaService.atualizar(this.categoria)
      : this.categoriaService.inserir(this.categoria);

    operacao.subscribe({
      next: () => {
        console.log('Operacao Salva com sucesso!');
        this.carregarCategorias();
        this.cancelar();
      },

      error: (erro) => {
        console.error('Erro ao salvar categoria', erro);
      },
    });
  }

  editarForm(categoria: Categoria) {
    this.formVisivel = true;
    this.editando = true;
    this.categoria = { ...categoria };
  }

  remover($event: any, categoria: Categoria): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a categoria ${categoria.nome}?`)) {
      this.categoriaService.remover(categoria.id!).subscribe({
        next: () => {
          console.log('Categoria removida com sucesso!');
          this.categorias = this.categorias.filter(
            (c) => c.id !== categoria.id
          );
        },
        error: (erro) => {
          console.error('Erro ao remover categoria', erro);
        },
      });
    }
  }
}
