import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';

@Component({
  selector: 'app-rejeitar-orcamento',
  imports: [ModaisConfirmacao, FormsModule],
  templateUrl: './rejeitar-orcamento.html',
  styleUrl: './rejeitar-orcamento.css'
})
export class RejeitarOrcamento {

  // IMPLEMENTAR O SERVICE AQUI
  constructor(private readonly solicitacaoService: SolicitacaoService){}

  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>();

  
  modalConfirmacaoAberto: 'sim' | 'nao' | 'nenhum' = 'nenhum';

  abrirSubModal(tipo: 'sim' | 'nao'){
    this.modalConfirmacaoAberto = tipo;
  }

  onfecharModal(){

    this.fecharModal.emit();
  }

  rejeitarServico(){

    if(!this.solicitacao) return;

    this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Rejeitada);    

    this.confirmarRejeicaoServico();
  }

  finalizarEFecharTudo(): void{
    this.operacaoConcluida.emit();
  }

  motivo: string = "";
  modalConfirmarRejeicaoServico: boolean = false;

  confirmarRejeicaoServico(){
    this.modalConfirmarRejeicaoServico=true;
  }

}
