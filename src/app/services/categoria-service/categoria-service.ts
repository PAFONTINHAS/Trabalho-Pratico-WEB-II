import { Injectable } from '@angular/core';
import { Categoria } from '../../shared/entities/categoria_entity';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private readonly http: HttpClient) {}
  
  // private atualizarDados(categorias: Categoria[]) {
  //   // localStorage[LS_CHAVE] = JSON.stringify(categorias);
  //   // this.categoriasSubject.next(categorias); 
  // }

  listarTodos(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.apiUrl);
  }

  inserir(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  atualizar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}/${categoria.id}`;
    return this.http.put<Categoria>(url, categoria);
  }

  remover(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
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
