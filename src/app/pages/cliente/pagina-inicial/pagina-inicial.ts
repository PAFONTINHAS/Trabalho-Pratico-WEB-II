import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VisualizarOrcamento } from '../visualizar-orcamento/visualizar-orcamento';


@Component({
  selector: 'app-pagina-inicial',
  imports: [VisualizarOrcamento, RouterLink],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {
  mostrarModalOrcamento: boolean = false;

  abrirModal(): void {
    this.mostrarModalOrcamento = true;
  }

  fecharModal(): void {
    this.mostrarModalOrcamento = false;
  }
}