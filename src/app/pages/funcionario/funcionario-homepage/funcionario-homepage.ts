import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarSolicitacao } from '../visualizar-solicitacao/visualizar-solicitacao';
import { NgClass } from '@angular/common';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';
import { LoginService } from '../../../services/login-service/login';

@Component({
  selector: 'app-funcionario-homepage',
   imports: [VisualizarSolicitacao, NgClass, CommonModule],
  templateUrl: './funcionario-homepage.html',
})
export class FuncionarioHomepage implements OnInit{
  solicitacoes: Solicitacao[] = [];
  statusEnum = Status;
  
  constructor( private readonly solicitacaoService: SolicitacaoService, private loginService: LoginService){}
  
  carregarSolicitacoes(){
    const user = this.loginService.usuarioLogado
    if(user)
    this.solicitacaoService.listarTodosFuncionario(user).subscribe({
      next: (data) =>{
        this.solicitacoes = data;
      },
      
      error: (e) =>{
        console.error('Erro ao carregar solicitações: ', e);
      }
    });
  }
  
  countAbertas(): number {
    return this.solicitacoes.filter(solicitacao => solicitacao.status === Status.Aberta).length;
  }
  
  ngOnInit(): void {
    this.carregarSolicitacoes();
  }
  
  mostrarModalSolicitacao = false;
  solicitacaoSelecionada?: Solicitacao | null = null;
  
  abrirModal(solicitacao: Solicitacao): void {
    this.solicitacaoSelecionada = solicitacao;
    this.mostrarModalSolicitacao = true;
  }
  
  fecharModal(): void {
    this.mostrarModalSolicitacao = false;
    this.solicitacaoSelecionada = null;
  }
  
  statusClasses(status: Status): object {
    switch (status) {
      case Status.Aberta: 
       return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true};
      case Status.Orcada:
        return {'cursor-default bg-yellow-700/20 px-2 py-1 border-1 border-yellow-800 rounded-lg text-yellow-800': true};
      case Status.Aprovada:
        return {'cursor-default bg-yellow-100 px-2 py-1 border-1 border-yellow-400 rounded-lg text-yellow-500': true};
      case Status.Rejeitada:
        return {'cursor-default bg-red-100 px-2 py-1 border-1 border-red-400 rounded-lg text-red-600': true};
      case Status.Redirecionada:
        return {'cursor-default bg-purple-100 px-2 py-1 border-1 border-purple-400 rounded-lg text-purple-600': true};
      case Status.Arrumada:
        return {'cursor-default bg-blue-100 px-2 py-1 border-1 border-blue-400 rounded-lg text-blue-600': true};
      case Status.Paga:
        return {'cursor-default bg-orange-100 px-2 py-1 border-1 border-orange-400 rounded-lg text-orange-600': true};
      case Status.Finalizada:
        return {'cursor-default bg-green-100 px-2 py-1 border-1 border-green-400 rounded-lg text-green-600': true};
      default:
        return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true}
    }
  }
}
