import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EquipamentoService } from '../../../services/equipamento';
import { EquipamentoComponent } from '../../funcionario/crud-equipamento/crud-equipamento';
import { Equipamento } from '../../../shared/models/equipamento.model';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar implements OnInit {

    categorias: Equipamento[] = []
    component: EquipamentoService = new EquipamentoService()
    
      constructor() {}
    
      ngOnInit(): void {
        this.categorias = this.component.listarTodos()    
      }
    
}

