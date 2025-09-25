import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VisualizarSolicitacao } from '../visualizar-solicitacao/visualizar-solicitacao';
import { DefinirOrcamento } from '../definir-orcamento/definir-orcamento';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';

@Component({
  selector: 'app-efetuar-manutencao',
  // imports: [RouterLink],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css'
})
export class Manutencao {

  constructor(private solicitacaoService: SolicitacaoService){}

  
  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>();

  onfecharModal(){
    this.fecharModal.emit();
  }

    finalizarEFecharTudo(): void{
    this.operacaoConcluida.emit();
  }

    efetuarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacaoService.atualizarStatus(this.solicitacao, Status.Arrumada);

      this.fecharModal.emit();
    }
  }





}
