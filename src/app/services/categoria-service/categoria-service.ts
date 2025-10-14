import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Observable } from 'rxjs';
import { Categoria } from '../../shared/entities/categoria_entity';


@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8081/api/categorias';

  constructor(private readonly http: HttpClient) {}
  
  // private atualizarDados(categorias: Categoria[]) {
  //   // localStorage[LS_CHAVE] = JSON.stringify(categorias);
  //   // this.categoriasSubject.next(categorias); 
  // }

  // Listar Todas (Read All) - GET /api/categorias
  listarTodos(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // Inserir (Create) - POST /api/categorias
  inserir(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  // Atualizar (Update) - PUT /api/categorias/{id}
  atualizar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}/${categoria.id}`;
    return this.http.put<Categoria>(url, categoria);
  }

  // Remover (Delete) - DELETE /api/categorias/{id}
  remover(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}