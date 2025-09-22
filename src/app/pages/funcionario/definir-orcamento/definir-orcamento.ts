import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';

@Component({
  selector: 'app-definir-orcamento',
  standalone: true,
  imports: [CommonModule, ModaisConfirmacao, RejeitarOrcamento],
  templateUrl: './definir-orcamento.html',
  styleUrls: ['./definir-orcamento.css']
})
export class DefinirOrcamento {
  modalConfirmacaoAberto = false;
  modalRejeitarAberto = false;

  abrirModalConfirmacao() {
    this.modalConfirmacaoAberto = true;
  }

  fecharModalConfirmacao() {
    this.modalConfirmacaoAberto = false;
  }

  abrirModalRejeitar() {
    this.modalRejeitarAberto = true;
  }

  fecharModalRejeitar() {
    this.modalRejeitarAberto = false;
  }
}

