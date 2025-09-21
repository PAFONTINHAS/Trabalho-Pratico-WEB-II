import { Injectable } from '@angular/core';
import { Categoria } from '../../shared/entities/categoria_entity';
import { BehaviorSubject, Observable } from 'rxjs';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasSubject: BehaviorSubject<Categoria[]>;
  public categorias$: Observable<Categoria[]>;

  constructor() {
    const categorias = localStorage[LS_CHAVE] ? JSON.parse(localStorage[LS_CHAVE]) : [];
    this.categoriasSubject = new BehaviorSubject<Categoria[]>(categorias);
    this.categorias$ = this.categoriasSubject.asObservable();
  }
  
  private atualizarDados(categorias: Categoria[]) {
    localStorage[LS_CHAVE] = JSON.stringify(categorias);
    this.categoriasSubject.next(categorias); 
  }

  listarTodos(): Categoria[] {
    return this.categoriasSubject.getValue();
  }

  inserir(categoria: Categoria): void {
    const categorias = this.listarTodos();
    categoria.id = new Date().getTime();
    categorias.push(categoria);
    this.atualizarDados(categorias);
  }

  buscarPorId(id: number): Categoria | undefined {
    const categorias = this.listarTodos();
    return categorias.find(categoria => categoria.id === id);
  }

  atualizar(categoria: Categoria): void {
    const categorias = this.listarTodos();
    const index = categorias.findIndex(c => c.id === categoria.id);
    if (index > -1) {
      categorias[index] = categoria;
      this.atualizarDados(categorias);
    }
  }

  remover(id: number): void {
    let categorias = this.listarTodos();
    categorias = categorias.filter(categoria => categoria.id !== id);
    this.atualizarDados(categorias);
  }
}
