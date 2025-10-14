import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeletarSolicitacao } from "../deletar-solicitacao/deletar-solicitacao";
import { EditarSolicitacao } from "../editar-solicitacao/editar-solicitacao";
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { ResgatarServico } from '../resgatar-servico/resgatar-servico';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [DeletarSolicitacao, EditarSolicitacao, CommonModule, RejeitarOrcamento, ModaisConfirmacao],
  standalone: true,
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {

  constructor(private readonly solicitacaoService: SolicitacaoService){}

  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>(); 

  modalAberto: 'nenhum' | 'deletar' | 'editar' | 'rejeitar' | 'aprovar' = 'nenhum';

  historico ={
    data: '',
    hora: '',
    status: '',

  }

  abrirModal(tipo: 'deletar' | 'editar' | 'rejeitar' | 'aprovar'){
    this.modalAberto = tipo;
  }

  fecharSubModal(): void{
    this.modalAberto = 'nenhum';
  }

  onFecharModal(): void {
    this.fecharModal.emit();
    this.modalAberto = 'nenhum';
  }

  notificarOperacao(): void {
    this.operacaoConcluida.emit();
  }

  aprovarServico(){
    
    if(!this.solicitacao) return;

    this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Aprovada);

  }

  rejeitarServico(){

    if(!this.solicitacao) return;

    this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Rejeitada);    
  }

  pagarServico(){

    if(!this.solicitacao) return;

    this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Paga);    

  }

  resgatarServico(){

    if(!this.solicitacao) return;

    this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Aprovada);    

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
        return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true};
    }
  }

}
