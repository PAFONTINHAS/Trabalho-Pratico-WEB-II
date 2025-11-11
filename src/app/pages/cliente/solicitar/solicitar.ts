import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { clientes } from '../../../../assets/mock/clientes_mock';
import { Status } from '../../../shared/models/enums/status.enum';
import { Router, RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Categoria } from '../../../shared/entities/categoria_entity';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule, ModaisConfirmacao],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar implements OnInit{

  categorias: Categoria[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}


  modalSolicitacaoCriada:boolean = false;

  ngOnInit(): void {
    this.carregarCategorias();
      
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
        console.log('Categorias carregadas com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      },

      complete: () => {
        console.log('Requisição de categorias completa');
      },
    });
  }

  
  formSubmitted: boolean = false;

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
    
    validateForm(): boolean {
      this.formSubmitted = true;
      let isValid = true;

      if (!this.solicitacao.equipamento || this.solicitacao.equipamento.trim() === "") {
          isValid = false;
      }
      
      if (!this.solicitacao.categoria) {
          isValid = false;
      }

      if (!this.solicitacao.defeito || this.solicitacao.defeito.trim() === "") {
          isValid = false;
      }

      return isValid;
  }

    realizarSolicitacao(){
      
      if (!this.validateForm()) {
          return;
      }

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
  const mes = zeroAEsquerda( new Date().getMonth() + 1);
  const ano = zeroAEsquerda( new Date().getFullYear());

  const horas = zeroAEsquerda( new Date().getHours());
  const minutos = zeroAEsquerda( new Date().getMinutes());

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  
}

export function pegarDataFormatada(opcao: String) : string{

  if(opcao === "data"){

    const dia = zeroAEsquerda( new Date().getDate());
    const mes = zeroAEsquerda( new Date().getMonth() + 1) ;
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