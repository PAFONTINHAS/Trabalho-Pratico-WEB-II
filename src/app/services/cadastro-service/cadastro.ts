import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../../shared/models';

export interface ClienteRegistroDto {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  
  private apiUrl = 'http://localhost:8081/api/clientes';

  constructor(private http: HttpClient) { }

  registrar(clienteDto: ClienteRegistroDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, clienteDto);
  }
}
