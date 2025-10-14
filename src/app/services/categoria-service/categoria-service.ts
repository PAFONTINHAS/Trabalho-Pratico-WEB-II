import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Observable } from 'rxjs';
import { Categoria } from '../../shared/entities/categoria_entity';

// URL base da API (Ajuste a porta se o backend não estiver em 8080)
const API_URL = 'http://localhost:8080/api/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // Removendo a lógica de BehaviorSubject e localStorage.
  // Injetando HttpClient.
  constructor(private http: HttpClient) { }

  // Listar Todas (Read All) - GET /api/categorias
  listarTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(API_URL);
  }

  // Inserir (Create) - POST /api/categorias
  inserir(categoria: Categoria): Observable<Categoria> {
    // O backend irá gerar o ID e retornar a categoria salva.
    return this.http.post<Categoria>(API_URL, categoria);
  }

  // Atualizar (Update) - PUT /api/categorias/{id}
  atualizar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${API_URL}/${categoria.id}`, categoria);
  }

  // Remover (Delete) - DELETE /api/categorias/{id}
  remover(id: number): Observable<void> {
    // A resposta é vazia (204 No Content), então usamos Observable<void>.
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}