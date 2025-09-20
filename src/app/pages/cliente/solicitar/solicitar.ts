import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EquipamentoService } from '../../../services/equipamento-service/equipamento-service';
import { FormsModule } from '@angular/forms';
import { Equipamento } from '../../../shared/entities/equipamento_entity';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { solicitacoes } from '../../../../assets/mock/solicitacoes_mocks';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule, ModaisConfirmacao],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar{

    categorias: Equipamento[] = []
    component: EquipamentoService = new EquipamentoService()
    solicitacao = solicitacoes[0];
    modalSolicitacaoCriada:boolean=false;

    constructor(
      private solicitacaoService: SolicitacaoService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.categorias = this.component.listarTodos()
    }

    inserir(): void {
      // this.solicitacaoService.inserir(this.solicitacao);
      this.router.navigate( ["/cliente"] );
    }

    solicitacaoCriada(){
      this.modalSolicitacaoCriada=true;
    }

}

