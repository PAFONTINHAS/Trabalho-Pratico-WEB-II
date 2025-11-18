import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Categoria } from '../../shared/entities/categoria_entity';


@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8081/api/categorias';

  constructor(private readonly http: HttpClient) {}
  

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
}