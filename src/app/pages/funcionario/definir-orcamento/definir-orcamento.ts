import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { RejeitarOrcamento } from '../rejeitar-orcamento/rejeitar-orcamento';
import { RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
@Component({
  selector: 'app-definir-orcamento',
  standalone: true,
  imports: [CommonModule, ModaisConfirmacao, RejeitarOrcamento, RouterLink],
  templateUrl: './definir-orcamento.html',
  styleUrls: ['./definir-orcamento.css']
})

export class DefinirOrcamento {
  constructor(private solicitacaoService: SolicitacaoService){}
  modalConfirmacaoAberto = false;
  modalRejeitarAberto = false;
  orcamento: string="";
  solicitacao: any;

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
    this.orcamento=input.value; //salva o valor com mascara
  }

  orcamentoMask(value: any) {
    if (!value) return "";
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
    console.log(value)

    return value
  }

  salvarOrcamento(solicitacao:any){
    const valorBackend = this.orcamento.replace(/\./g, '')//remove pontos do milhar
    .replace(',', '.');//troca , decimal por ponto
    solicitacao.valorOrcamento=Number(valorBackend);
    //seta o valor convertido
    this.solicitacaoService.atualizar(solicitacao).subscribe({
      next:() => console.log("Orçamento atualizado"),
      error:(err)=> console.error("erro ao atualizar orç",err)
    });

  }

}

