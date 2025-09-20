import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';

@Component({
  selector: 'app-rejeitar-orcamento',
  imports: [ModaisConfirmacao],
  templateUrl: './rejeitar-orcamento.html',
  styleUrl: './rejeitar-orcamento.css'
})
export class RejeitarOrcamento {
  @Input() tipoModalSolicitacao: any;
  dispositivo: string="";
  descricao: string="";
  valor: string="";

  modalConfirmarRejeicaoServico: boolean=false;

  confirmarRejeicaoServico(){
    this.modalConfirmarRejeicaoServico=true;
  }

}
