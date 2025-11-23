import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoricoStatus } from '../../shared/entities/historico_status_entity';
import { Observable } from 'rxjs';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private readonly apiUrl = 'http://localhost:8081/api/historico';
   constructor(private readonly http: HttpClient){
  }

  listarTodos(solicitacao: Solicitacao): Observable<HistoricoStatus[]> {
    const url = `${this.apiUrl}/solicitacao/${solicitacao.idSolicitacao}`;
    const historico = this.http.get<HistoricoStatus[]>(url);
    return historico
  }

  arrumarFuncionariosHistorico(historico: HistoricoStatus[]) {
    historico.map((h) => {
      if(h.funciOrigem == undefined)
        h.funciOrigem = {id: 0, dataNasc: new Date(), nome: " - ", email: "", senha: "", perfil: "FUNCIONARIO"}
    })
  }

}
