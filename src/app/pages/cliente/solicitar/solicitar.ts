import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EquipamentoComponent } from '../../funcionario/crud-equipamento/crud-equipamento';
import { EquipamentoService } from '../../../services/equipamento';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar {
    equipamentos :EquipamentoComponent = new EquipamentoComponent(new EquipamentoService)
    categorias = this.equipamentos.categorias
}

