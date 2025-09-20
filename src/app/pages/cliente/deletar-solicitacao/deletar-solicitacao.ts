import { Component } from '@angular/core';

@Component({
  selector: 'app-deletar-solicitacao',
  imports: [],
  templateUrl: './deletar-solicitacao.html',
  styleUrl: './deletar-solicitacao.css'
})

export class DeletarSolicitacao {

  modalAberto: boolean = true;
  deletar: boolean = false;
  naoDeletar: boolean = false;
  
  fecharModal(): void {
    this.modalAberto = false;
  }

  deletarSolicitacao(){
    this.deletar = true;
    this.naoDeletar = false;
  }

  naoDeletarSolicitacao(){
    this.naoDeletar = true;
    this.deletar = false

  }



}
