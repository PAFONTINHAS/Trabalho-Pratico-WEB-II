import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-visualizar-orcamento',
  imports: [],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {
  @Output() fecharModal = new EventEmitter<void>();

    onFecharModal(): void {
      this.fecharModal.emit();
  }
}
