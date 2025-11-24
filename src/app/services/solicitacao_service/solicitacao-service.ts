import { Injectable } from '@angular/core';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';
import { HistoricoStatus } from '../../shared/entities/historico_status_entity';
import { Status } from '../../shared/models/enums/status.enum';
import { Funcionario } from '../../shared/entities/funcionario_entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/models/usuario.model';
const LS_CHAVE = "solicitacoes"
@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly apiUrl = 'http://localhost:8081/api/solicitacoes';
  constructor(private readonly http: HttpClient){
  }


  listarPorCliente( email: string): Observable<Solicitacao[]> {
    const url = `${this.apiUrl}/cliente/${email}`;
    return this.http.get<Solicitacao[]>(url);
  }

  listarTodosFuncionario( usuario: Usuario): Observable<Solicitacao[]> {
    const url = `${this.apiUrl}/user/${usuario.email}`;
    return this.http.get<Solicitacao[]>(url);
  }

  listarTodos(): Observable<Solicitacao[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Solicitacao[]>(url);
  }

  inserir(solicitacao: Solicitacao,  usuario: Usuario): Observable<Solicitacao> {
    console.log("[SERVICE] FUNÇÃO DE CRIAÇÃO DE SOLICITAÇÃO RECEBIDA DO CLIENTE");
    const url = this.apiUrl + `/${usuario.email}`
    return this.http.post<Solicitacao>(url, solicitacao);
  }
  
  buscarPorId(id: number): Observable<Solicitacao> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Solicitacao>(url);
  }
  
  atualizar(solicitacao: Solicitacao): Observable<Solicitacao> {
    const url = `${this.apiUrl}/${solicitacao.idSolicitacao}`;
    return this.http.put<Solicitacao>(url, solicitacao);
  } 
  
  remover(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  atualizarFuncionario( solicitacao: Solicitacao,  usuario: Usuario): Observable<Solicitacao>{
    const url = `${this.apiUrl}/${solicitacao.idSolicitacao}/user/${usuario.email}`;
    return this.http.put<Solicitacao>(url, solicitacao);
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