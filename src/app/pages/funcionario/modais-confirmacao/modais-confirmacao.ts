import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modais-confirmacao',
  standalone: true,
  templateUrl: './modais-confirmacao.html',
  styleUrls: ['./modais-confirmacao.css']
})
export class ModaisConfirmacao {
  @Input() tipoModalSolicitacao?: string;
  @Output() fechar = new EventEmitter<void>();

  titulo: string = '';
  texto: string = '';
  botaoTexto: string = 'OK';

  ngOnInit(): void {
    switch (this.tipoModalSolicitacao) {
      case 'aprovarServico':
        this.titulo = 'Serviço aprovado';
        this.texto = 'Serviço aprovado no valor de R$300,00';
        break;
      case 'rejeitarServico':
        this.titulo = 'Orçamento Rejeitado';
        this.texto = 'Serviço rejeitado com sucesso!';
        break;
      case 'resgatarServico':
        this.titulo = 'Resgate concluído';
        this.texto = 'Solicitação de manutenção resgatada com sucesso!';
        break;
      case 'solicitacaoCriada':
        this.titulo = 'Solicitação criada';
        this.texto = 'Solicitação de manutenção criada com sucesso!';
        break;
    }
  }

  fecharModal() {
    this.fechar.emit();
  }
}
