import { Injectable } from '@angular/core';
import { Solicitacao } from '../../shared/entities/solicitacao_entity';
import { solicitacoes as solicitacoesMock} from '../../../assets/mock/solicitacoes_mocks';

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
}
