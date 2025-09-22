import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-modais-confirmacao',
  imports: [],
  templateUrl: './modais-confirmacao.html',
  styleUrl: './modais-confirmacao.css'
})
export class ModaisConfirmacao {
  @Input() tipoModalSolicitacao?: string; 
  @Input() valor?: number;
  @Output() fechar = new EventEmitter<void>();

  titulo: string="";
  texto: string="";
  botaoTexto: string="OK";


  ngOnInit():void{

    switch(this.tipoModalSolicitacao) {

      case "aprovarServico":
      this.titulo="Orçamento aprovado"
      this.texto="Serviço aprovado no valor de R$ "+this.valor+",00 !"
      break;

      case "rejeitarServico":
        this.titulo="Orçamento Rejeitado"
        this.texto="Serviço rejeitado com sucesso!"
      break;


      case "resgatarServico":
        this.titulo="Resgate concluído"
        this.texto="Solicitação de manutenção resgatada com sucesso!"
      break;


      case "solicitacaoCriada":
        this.titulo="Solicitação criada"
        this.texto="Solicitação de manutenção criada com sucesso!"
      break;

      }

  }

  fecharModal(){
    this.fechar.emit();
  }

}
