import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resgatar',
  imports: [RouterModule],
  templateUrl: './resgatar.html',
  styleUrl: './resgatar.css'
})
export class Resgatar {
  @Input() orcamento: any;
  @Output() fecharModal = new EventEmitter<void>();

  onFecharModal(): void {
    this.fecharModal.emit();
  }
}
