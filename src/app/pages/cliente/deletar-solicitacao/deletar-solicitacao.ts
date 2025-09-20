import { Component, Input } from '@angular/core';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
@Component({
  selector: 'app-deletar-solicitacao',
  imports: [],
  templateUrl: './deletar-solicitacao.html',
  styleUrl: './deletar-solicitacao.css'
})

export class DeletarSolicitacao {

  @Input() solicitacao?: Solicitacao;

  constructor(private solicitacaoService: SolicitacaoService){}


  modalAberto: boolean = true;
  modalConfirmacaoAberto: boolean = true;

  deletar: boolean = false;
  naoDeletar: boolean = false;
  
  fecharModal(): void {
    this.modalAberto = false;
  }

  fecharModalConfirmacao() : void{
    this.modalConfirmacaoAberto = false;
  }



}
