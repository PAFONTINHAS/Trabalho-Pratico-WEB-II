import { Component, OnInit, Input } from '@angular/core';
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

  modalAberto:boolean = true;

  categoriasEnum = Object.values(Categoria);

  novaSolicitacao = this.solicitacao;

  fecharModal(){

    this.modalAberto = false;

  }

  editarSolicitacao(){

    alert(JSON.stringify(this.solicitacao));

  }

}
