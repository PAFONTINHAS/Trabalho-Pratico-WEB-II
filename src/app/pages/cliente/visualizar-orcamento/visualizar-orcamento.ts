import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeletarSolicitacao } from "../deletar-solicitacao/deletar-solicitacao";
import { EditarSolicitacao } from "../editar-solicitacao/editar-solicitacao";
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { ResgatarServico } from '../resgatar-servico/resgatar-servico';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [DeletarSolicitacao, EditarSolicitacao, ModaisConfirmacao, ResgatarServico, RejeitarOrcamento],
  standalone: true,
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {
  @Input() orcamento: any;
  @Output() fecharModal = new EventEmitter<void>();

  modalDeletar: boolean = false;
  modalEditar: boolean = false;
  modalAprovarServico: boolean=false;
  modalRejeitarServico: boolean=false;
  modalResgatarServico: boolean=false;


  onFecharModal(): void {
    this.fecharModal.emit();
  }


  deletarSolicitacao(){
    this.modalDeletar = true;
    this.modalEditar = false;
  }

  editarSolicitacao(){
    this.modalDeletar = false;
    this.modalEditar = true;
  }

  aprovarServico(){
    this.modalAprovarServico=true;
    this.modalRejeitarServico=false;
  }

  rejeitarServico(){
    this.modalAprovarServico=false;
    this.modalRejeitarServico=true;
  }

  resgatarServico(){
    this.modalResgatarServico=true;
  }
}
