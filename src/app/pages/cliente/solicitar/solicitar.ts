import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { clientes } from '../../../../assets/mock/clientes_mock';
import { Status } from '../../../shared/models/enums/status.enum';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Categoria } from '../../../shared/models/enums/categoria.enum';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule, ModaisConfirmacao],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar{

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router
  ) {}

  modalSolicitacaoCriada:boolean = false;

  categoriasEnum = Object.values(Categoria);

    solicitacao = {
      cliente: clientes[0],
      status: Status.Aberta,
      funcionario: null,
      defeito: "",
      equipamento: "",
      historicoStatus: [],
      categoria: null,
      dataSolicitacao: ""

    };


    realizarSolicitacao(){

      if(!this.solicitacao.categoria) return;

      const novaSolicitacao: Solicitacao = this.solicitacao;

      this.solicitacaoService.inserir(novaSolicitacao);
      this.solicitacaoService.listarTodos();

      this.modalSolicitacaoCriada = true;
    }
}

