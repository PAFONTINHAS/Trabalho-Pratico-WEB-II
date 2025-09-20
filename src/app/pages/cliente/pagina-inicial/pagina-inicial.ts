import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarOrcamento } from '../visualizar-orcamento/visualizar-orcamento';
import { Status } from '../../../shared/models/enums/status.enum';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';


@Component({
  selector: 'app-pagina-inicial',
  imports: [VisualizarOrcamento, CommonModule],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial implements OnInit{


  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService ){}

  ngOnInit() : void{
    this.solicitacaoService.inicializarMock();
    this.solicitacoes = this.solicitacaoService.listarTodos();
  }


  mostrarModalSolicitacao: boolean = false;
  mostrarModalAberto: boolean = false;
  
  solicitacaoSelecionado: any = {};
  
  statusAberto: Status = Status.Aberta;



  statusClasses(status: String) {
    
    switch (status){
      case 'ABERTA': 
       return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true};
      case 'ORÇADA':
        return {'cursor-default bg-yellow-700/20 px-2 py-1 border-1 border-yellow-800 rounded-lg text-yellow-800': true};
      case 'APROVADA':
        return {'cursor-default bg-yellow-100 px-2 py-1 border-1 border-yellow-400 rounded-lg text-yellow-500': true};
      case 'REJEITADA':
        return {'cursor-default bg-red-100 px-2 py-1 border-1 border-red-400 rounded-lg text-red-600': true};
      case 'REDIRECIONADA':
        return {'cursor-default bg-purple-100 px-2 py-1 border-1 border-purple-400 rounded-lg text-purple-600': true};
      case 'ARRUMADA':
        return {'cursor-default bg-blue-100 px-2 py-1 border-1 border-blue-400 rounded-lg text-blue-600': true};
      case 'PAGA':
        return {'cursor-default bg-orange-100 px-2 py-1 border-1 border-orange-400 rounded-lg text-orange-600': true};
      case 'FINALIZADA':
        return {'cursor-default bg-green-100 px-2 py-1 border-1 border-green-400 rounded-lg text-green-600': true};
      default:
        return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true}
    }
  }

  abrirModalOrcamento(solicitacao: any): void {
    this.solicitacaoSelecionado = solicitacao; // Salva o orçamento selecionado
    this.mostrarModalSolicitacao = true;
  }
  
  fecharModalOrcamento(): void {
    this.mostrarModalSolicitacao = false;
    this.solicitacaoSelecionado= null; 
  }

  abrirModalAberta(solicitacao: any): void{

  }

  fecharModalAberta() : void{

  }
}