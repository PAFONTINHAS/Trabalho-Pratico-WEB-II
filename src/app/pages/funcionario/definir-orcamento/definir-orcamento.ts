import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-definir-orcamento',
  standalone: true,
  imports: [CommonModule, ModaisConfirmacao, RejeitarOrcamento, RouterLink],
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

  handleOrcamento(e: any) {
    let input = e.target
    input.value = this.orcamentoMask(input.value)
  }

  orcamentoMask(value: any) {
    
    value = value.replace(/\D/g, '') 
    value = value.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
    console.log(value)

    return value
  }

}

