import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {
  @Input() orcamento: any;
  @Output() fecharModal = new EventEmitter<void>();

  onFecharModal(): void {
    this.fecharModal.emit();
  }

}