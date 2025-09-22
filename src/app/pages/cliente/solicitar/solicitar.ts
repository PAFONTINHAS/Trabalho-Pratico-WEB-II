import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { clientes } from '../../../../assets/mock/clientes_mock';
import { Status } from '../../../shared/models/enums/status.enum';
import { RedirectCommand, Router, RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { HistoricoStatus } from '../../../shared/entities/historico_status_entity';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule, ModaisConfirmacao],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar{

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router
  ) {}

  modalSolicitacaoCriada:boolean = false;
  categoriaService: CategoriaService = new CategoriaService()

  categorias = this.categoriaService.listarTodos()

    solicitacao = {
      cliente: clientes[0],
      status: Status.Aberta,
      funcionario: null,
      defeito: "",
      equipamento: "",
      historicoStatus: [],
      categoria: null,
      dataSolicitacao: ""

    };
    
    realizarSolicitacao(){
      
      if(!this.solicitacao.categoria) return;

      const dataSolicitacao: string = converterDataParaString();
      const novaSolicitacao: Solicitacao = this.solicitacao;

      novaSolicitacao.dataSolicitacao = dataSolicitacao;

      this.solicitacaoService.inserir(novaSolicitacao);
      this.solicitacaoService.listarTodos();
      
      this.modalSolicitacaoCriada = true;

    }
}

export function converterDataParaString() : string{
  const dia = zeroAEsquerda( new Date().getDate());
  const mes = zeroAEsquerda( new Date().getMonth());
  const ano = zeroAEsquerda( new Date().getFullYear());

  const horas = zeroAEsquerda( new Date().getHours());
  const minutos = zeroAEsquerda( new Date().getMinutes());

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  
}

export function pegarDataFormatada(opcao: String) : string{

  if(opcao === "data"){

    const dia = zeroAEsquerda( new Date().getDate());
    const mes = zeroAEsquerda( new Date().getMonth());
    const ano = zeroAEsquerda( new Date().getFullYear());

    return `${dia}/${mes}/${ano}`
  }

  if(opcao === "hora"){

    const horas = zeroAEsquerda( new Date().getHours());
    const minutos = zeroAEsquerda( new Date().getMinutes());

    return `${horas}:${minutos}`;

  }
  
  return '';
}

function zeroAEsquerda (numero : number){
  
  return String(numero).padStart(2, '0');

}

