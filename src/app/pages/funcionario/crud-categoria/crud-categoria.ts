import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../shared/entities/categoria_entity';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Subscription } from 'rxjs';
import { Categorias } from '../../../shared/models/enums/categoria.enum';


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

  categoria = {
    id: 0,
    nome: ''
  }

  ngOnInit(): void {
    Categorias.forEach(categoria => this.categoriaService.inserirCategoriasBase(categoria))
    this.subscription = this.categoriaService.categorias$.subscribe(data => {
      this.categorias = data;
    });
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
      this.categoriaService.atualizar(this.categoria);
    } else {
      this.categoriaService.inserir(this.categoria);
    }
    this.cancelar();
  }

  editarForm(categoria: Categoria) {
    this.formVisivel = true;
    this.editando = true;
    this.categoria = {...categoria}
  }

  remover($event: any, categoria: Categoria): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a categoria ${categoria.nome}?`)) {
      this.categoriaService.remover(categoria.id!);
    }
  }
}
