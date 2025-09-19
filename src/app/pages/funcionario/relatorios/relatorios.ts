import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.css']
})
export class Relatorios {
  modalAberto = false;

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }
}
