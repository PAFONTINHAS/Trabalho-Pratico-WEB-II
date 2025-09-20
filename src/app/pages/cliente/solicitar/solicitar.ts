import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { clientes } from '../../../../assets/mock/clientes_mock';
import { Status } from '../../../shared/models/enums/status.enum';
import { Equipamento } from '../../../shared/entities/equipamento_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { EquipamentoService } from '../../../services/equipamento-service/equipamento-service';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Categoria } from '../../../shared/models/enums/categoria.enum';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar{

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router
  ) {}

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

      this.solicitacaoService.inserir(this.solicitacao);
      this.solicitacaoService.listarTodos();
    }
    
}

