import { Injectable } from '@angular/core';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';
import { solicitacoes as solicitacoesMock} from '../../../assets/mock/solicitacoes_mocks';
import { HistoricoStatus } from '../../shared/entities/historico_status_entity';
import { Status } from '../../shared/models/enums/status.enum';
import { Funcionario } from '../../shared/entities/funcionario_entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const LS_CHAVE = "solicitacoes"

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {

  private readonly apiUrl = 'http://localhost:8081/api/solicitacoes';

  constructor(private readonly http: HttpClient){

  }

  // inicializarMock(): void{
  //   // localStorage.removeItem(LS_CHAVE);

  //   if(!localStorage[LS_CHAVE]){
  //     localStorage[LS_CHAVE] = JSON.stringify(solicitacoesMock)
  //   }
  // }

  listarTodos(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.apiUrl);
  }

  inserir(solicitacao: Solicitacao): Observable<Solicitacao> {

    return this.http.post<Solicitacao>(this.apiUrl, solicitacao);
  }

  buscarPorId(id: number): Observable<Solicitacao> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Solicitacao>(url);
  }

  atualizar(solicitacao: Solicitacao): Observable<Solicitacao> {
    const url = `${this.apiUrl}/${solicitacao.id}`;

    return this.http.put<Solicitacao>(url, solicitacao);
  } 

  remover(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(url);
  }


  atualizarStatus( solicitacao: Solicitacao, status: Status): Observable<Solicitacao>{

    const url = `${this.apiUrl}/${solicitacao.id}/status/${status}`;

    return this.http.put<Solicitacao>(url, status);

  }

  // pegarDataFormatada(opcao: String) : string{
  
  //   if(opcao === "data"){
  
  //     const dia = this.zeroAEsquerda( new Date().getDate());
  //     const mes = this.zeroAEsquerda( new Date().getMonth() + 1);
  //     const ano = this.zeroAEsquerda( new Date().getFullYear());
  
  //     return `${dia}/${mes}/${ano}`
  //   }
  
  //   if(opcao === "hora"){
  
  //     const horas = this.zeroAEsquerda( new Date().getHours());
  //     const minutos = this.zeroAEsquerda( new Date().getMinutes());
  
  //     return `${horas}:${minutos}`;
  
  //   }
    
  //   return '';
  // }

  
  // zeroAEsquerda (numero : number){

  //   return String(numero).padStart(2, '0');

  // }

  
}
