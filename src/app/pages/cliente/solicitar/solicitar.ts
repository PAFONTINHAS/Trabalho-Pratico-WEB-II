import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EquipamentoService } from '../../../services/equipamento';
import { EquipamentoComponent } from '../../funcionario/crud-equipamento/crud-equipamento';
import { Equipamento } from '../../../shared/models/equipamento.model';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../../services/solicitacao';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar implements OnInit {

    categorias: Equipamento[] = []
    component: EquipamentoService = new EquipamentoService()
    solicitacao: Solicitacao = new Solicitacao()
    
    constructor(
      private solicitacaoService: SolicitacaoService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.categorias = this.component.listarTodos()    
    }

    inserir(): void {
      this.solicitacaoService.inserir(this.solicitacao);
      this.router.navigate( ["/cliente"] );
    }
    
}

