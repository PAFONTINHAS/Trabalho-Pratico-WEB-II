import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeletarSolicitacao } from "../deletar-solicitacao/deletar-solicitacao";
import { EditarSolicitacao } from "../editar-solicitacao/editar-solicitacao";
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { ResgatarServico } from '../resgatar-servico/resgatar-servico';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [DeletarSolicitacao, EditarSolicitacao],
  standalone: true,
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {

  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>(); 

  modalAberto: 'nenhum' | 'deletar' | 'editar' = 'nenhum';

  abrirModal(tipo: 'deletar' | 'editar'){
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

}
