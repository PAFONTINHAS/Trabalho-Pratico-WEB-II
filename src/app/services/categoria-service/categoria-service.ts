import { Injectable } from '@angular/core';
import { Categoria } from '../../shared/entities/categoria_entity';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root'
})

// AGORA O ARQUIVO ESTÁ LIDANDO COM REQUISIÇÕES REST
// COMANDOS ANTIGOS COMENTADOS POR SEGURANÇA (REMOVER NO FINAL)
export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/api/categorias';

  // private categoriasSubject: BehaviorSubject<Categoria[]>;
  // public categorias$: Observable<Categoria[]>;

  constructor(private readonly http: HttpClient) {
    // const categorias = localStorage[LS_CHAVE] ? JSON.parse(localStorage[LS_CHAVE]) : [];
    // this.categoriasSubject = new BehaviorSubject<Categoria[]>(categorias);
    // this.categorias$ = this.categoriasSubject.asObservable();
  }
  
  // private atualizarDados(categorias: Categoria[]) {
  //   // localStorage[LS_CHAVE] = JSON.stringify(categorias);
  //   // this.categoriasSubject.next(categorias); 
  // }

  listarTodos(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.apiUrl);
    // return this.categoriasSubject.getValue();
  }

  inserir(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
    // const categorias = this.listarTodos();
    // categoria.id = new Date().getTime();
    // categorias.push(categoria);
    // this.atualizarDados(categorias);
  }

  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categoria>(url);
    // const categorias = this.listarTodos();
    // return categorias.find(categoria => categoria.id === id);
  }

  atualizar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}/${categoria.id}`;
    return this.http.put<Categoria>(url, categoria);
    // const categorias = this.listarTodos();
    // const index = categorias.findIndex(c => c.id === categoria.id);
    // if (index > -1) {
    //   categorias[index] = categoria;
    //   this.atualizarDados(categorias);
    // }
  }

  remover(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
    // let categorias = this.listarTodos();
    // categorias = categorias.filter(categoria => categoria.id !== id);
    // this.atualizarDados(categorias);
  }

  // inserirCategoriasBase(categoria: Categoria): void {
  //   const categorias = this.listarTodos();
  //   let exists: Boolean = false;
  //   categorias.forEach( (obj) => {
  //     if (categoria.nome === obj.nome) {
  //       exists = true
  //     }
  //   });

  //   if(!exists) {
  //     categorias.push(categoria);
  //     this.atualizarDados(categorias);
  //   }

  // }
}
