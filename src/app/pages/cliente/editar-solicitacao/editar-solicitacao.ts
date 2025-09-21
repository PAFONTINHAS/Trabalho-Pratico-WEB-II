import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Categoria } from '../../../shared/models/enums/categoria.enum';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
@Component({
  selector: 'app-editar-solicitacao',
  imports: [RouterLink, FormsModule],
  templateUrl: './editar-solicitacao.html',
  styleUrl: './editar-solicitacao.css'
})
export class EditarSolicitacao {

  
  constructor(private solicitacaoService: SolicitacaoService){}
  
  
  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();


  categoriasEnum = Object.values(Categoria);

  novaSolicitacao = this.solicitacao!;

  modalConfirmacaoAberto: 'sim' | 'nao' | 'nenhum' = 'nenhum';

  abrirSubModal(tipo: 'sim' | 'nao'){
    this.modalConfirmacaoAberto = tipo;
  }
  

  onfecharModal(){

    this.fecharModal.emit();
  }

  fecharApenasSubModal() : void{
    this.modalConfirmacaoAberto = 'nenhum';
    this.onfecharModal();
  }


  editarSolicitacao(){

    // alert(JSON.stringify(this.solicitacao));
    this.onfecharModal();
  }

}
