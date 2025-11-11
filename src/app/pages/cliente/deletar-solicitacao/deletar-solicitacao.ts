import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
@Component({
  selector: 'app-deletar-solicitacao',
  imports: [],
  templateUrl: './deletar-solicitacao.html',
  styleUrl: './deletar-solicitacao.css'
})

export class DeletarSolicitacao {

  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>();

  constructor(private readonly solicitacaoService: SolicitacaoService){}

  modalConfirmacaoAberto: 'sim' | 'nao' | 'nenhum' = 'nenhum';

  abrirSubModal(tipo: 'sim' | 'nao'){
    this.modalConfirmacaoAberto = tipo;
  }
  
  onfecharModal(): void {
    this.fecharModal.emit();
  }

  fecharApenasSubModal() : void{
    this.modalConfirmacaoAberto = 'nenhum';
    this.onfecharModal();
  }

  finalizarEFecharTudo() : void{
    this.operacaoConcluida.emit();
  }
  
  deletarSolicitacao(){
    if(this.solicitacao?.idSolicitacao === null) return;
    
    const id_solicitacao = this.solicitacao?.idSolicitacao as number;

    console.log(id_solicitacao);

    this.solicitacaoService.remover(id_solicitacao);
    this.abrirSubModal('sim');
  }

}
