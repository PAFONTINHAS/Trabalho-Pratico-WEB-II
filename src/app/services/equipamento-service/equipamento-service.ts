import { Injectable } from '@angular/core';
import { Equipamento } from '../../shared/entities/equipamento_entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const LS_CHAVE = "equipamentos"

@Injectable({
  providedIn: 'root'
})

export class EquipamentoService {
  private readonly apiUrl = 'http://localhost:8081/api/equipamentos';

  constructor(private readonly http: HttpClient){}
  
  listarTodos(): Observable<Equipamento[]> {

    return this.http.get<Equipamento[]>(this.apiUrl);
  }

  inserir(equipamento: Equipamento): Observable<Equipamento> {
    const url = `${this.apiUrl}/${equipamento.id}`;

    return this.http.post<Equipamento>(url, equipamento);
  }
  
  buscarPorId(id: number): Observable<Equipamento> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Equipamento>(url);
  }

  atualizar(equipamento: Equipamento): Observable<Equipamento> {

    const url = `${this.apiUrl}/${equipamento.id}`;

    return this.http.put<Equipamento>(url, equipamento);

  }

  remover(id: number): Observable<void>{
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(url);
  }
}
