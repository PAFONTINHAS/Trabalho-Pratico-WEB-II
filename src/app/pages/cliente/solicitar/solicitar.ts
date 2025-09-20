import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EquipamentoService } from '../../../services/equipamento-service/equipamento';
import { FormsModule } from '@angular/forms';
import { Equipamento } from '../../../shared/entities/equipamento_entity';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { solicitacoes } from '../../../../assets/mock/solicitacoes_mocks';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar{

    categorias: Equipamento[] = []
    component: EquipamentoService = new EquipamentoService()
    solicitacao = solicitacoes[0];
    
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
    
}

