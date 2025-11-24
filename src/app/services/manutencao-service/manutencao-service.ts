import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManutencaoEntity } from '../../shared/entities/manutencao_entity';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';
import { Manutencao } from '../../pages/funcionario/efetuar-manutencao/efetuar-manutencao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
    private readonly apiUrl = 'http://localhost:8081/api/manutencao';

    constructor(private readonly http: HttpClient){
    }

    inserir(solicitacao: Solicitacao,  manutencao: ManutencaoEntity): Observable<Manutencao> {
        const url = this.apiUrl + `/${solicitacao.idSolicitacao}`
        return this.http.post<Manutencao>(url, manutencao);
    }
}
