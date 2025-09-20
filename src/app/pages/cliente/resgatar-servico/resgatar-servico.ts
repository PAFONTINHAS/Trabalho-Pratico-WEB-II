import { Component } from '@angular/core';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';

@Component({
  selector: 'app-resgatar-servico',
  imports: [ModaisConfirmacao],
  templateUrl: './resgatar-servico.html',
  styleUrl: './resgatar-servico.css'
})
export class ResgatarServico {
  modalResgateConcluido: boolean=false;

  resgateConcluido(){
    this.modalResgateConcluido=true;
  }
}
