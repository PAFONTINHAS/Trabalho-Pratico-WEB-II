import { Injectable } from '@angular/core';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';
import { solicitacoes as solicitacoesMock} from '../../../assets/mock/solicitacoes_mocks';
import { HistoricoStatus } from '../../shared/entities/historico_status_entity';
import { Status } from '../../shared/models/enums/status.enum';
import { Funcionario } from '../../shared/entities/funcionario_entity';
const LS_CHAVE = "solicitacoes"

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {

  inicializarMock(): void{
    // localStorage.removeItem(LS_CHAVE);

    if(!localStorage[LS_CHAVE]){
      localStorage[LS_CHAVE] = JSON.stringify(solicitacoesMock)
    }
  }

  listarTodos(): Solicitacao[] {
    const solicitacoes = localStorage[LS_CHAVE];
    return solicitacoes ? JSON.parse(solicitacoes) : [];
  }

  inserir(solicitacao: Solicitacao): void {
    const solicitacoes = this.listarTodos();
    solicitacao.id = new Date().getTime();
    solicitacoes.push(solicitacao);
    
    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);

    this.atualizarStatus(solicitacao, Status.Aberta);
  }

  buscarPorId(id: number): Solicitacao | undefined {
    const solicitacoes = this.listarTodos();
    return solicitacoes.find(solicitacao => solicitacao.id === id);
  }

  atualizar(solicitacao: Solicitacao): void {
    const solicitacoes = this.listarTodos();
    solicitacoes.forEach( (obj, index, objs) => {
    if (solicitacao.id === obj.id) {
      objs[index] = solicitacao
    }
    });

    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  } 

  remover(id: number): void {
    let solicitacoes = this.listarTodos();
    solicitacoes = solicitacoes.filter(solicitacao => solicitacao.id !== id);

    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  }


  atualizarStatus( solicitacao: Solicitacao, status: Status): void{

    solicitacao.status = status;

    const historico : HistoricoStatus  = {
      data: this.pegarDataFormatada('data'),
      hora: this.pegarDataFormatada('hora'),
      status: status
    }

    solicitacao.historicoStatus.push(historico);

    this.atualizar(solicitacao);

  }


  pegarDataFormatada(opcao: String) : string{
  
    if(opcao === "data"){
  
      const dia = this.zeroAEsquerda( new Date().getDate());
      const mes = this.zeroAEsquerda( new Date().getMonth() + 1);
      const ano = this.zeroAEsquerda( new Date().getFullYear());
  
      return `${dia}/${mes}/${ano}`
    }
  
    if(opcao === "hora"){
  
      const horas = this.zeroAEsquerda( new Date().getHours());
      const minutos = this.zeroAEsquerda( new Date().getMinutes());
  
      return `${horas}:${minutos}`;
  
    }
    
    return '';
  }

  
  zeroAEsquerda (numero : number){

    return String(numero).padStart(2, '0');

  }

  
}
