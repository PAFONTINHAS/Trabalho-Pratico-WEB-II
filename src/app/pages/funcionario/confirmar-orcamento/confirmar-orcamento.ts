import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalhes-solicitacao',
  imports: [FormsModule],
  templateUrl: './confirmar-orcamento.html',
  styleUrls: ['./confirmar-orcamento.css']
})
export class ConfirmarOrcamento {
  mostrarModal: boolean = false;
  valorOrcamento: number = 300; // exemplo

  abrirModalConfirmacao() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  confirmarOrcamento() {
    console.log("Orçamento confirmado: R$ " + this.valorOrcamento);
    this.mostrarModal = false;
  }
}

