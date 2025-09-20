import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarOrcamento } from '../visualizar-orcamento/visualizar-orcamento';
import { Status } from '../../../shared/models/enums/status.enum';

@Component({
  selector: 'app-pagina-inicial',
  imports: [VisualizarOrcamento, CommonModule],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {
  mostrarModalOrcamento: boolean = false;
  mostrarModalAberto: boolean = false;
  orcamentoSelecionado: any = {};
  status: Status = Status.Aberta;

  //Dados fictícios para simular a tabela
  solicitacoes = [
    {
      id: 1,
      dispositivo: 'Notebook Lenovo S145',
      descricao: 'Troca de tela',
      data: '10/08/2025 - 15:48',
      estado: 'Aberta',
      valor: 'R$300,00',
      funcionario: 'Lucas Silveira'
    },
    {
      id: 2,
      dispositivo: 'Smartphone Samsung A04',
      descricao: 'Botão de ligar pifou',
      data: '07/08/2025 - 09:12',
      estado: 'Arrumada',
      valor: 'R$200,00',
      funcionario: 'Lucas Silveira'
    },
    {
      id: 3,
      dispositivo: 'Tablet Apple iPad',
      descricao: 'Problema na bateria',
      data: '05/08/2025 - 11:30',
      estado: 'Rejeitada',
      valor: 'R$550,00',
      funcionario: 'Lucas Silveira'
    },
    {
      id: 4,
      dispositivo: 'Notebook Dell Inspiron',
      descricao: 'Problema no teclado',
      data: '03/08/2025 - 14:15',
      estado: 'Aprovada',
      valor: 'R$450,00',
      funcionario: 'Lucas Silveira'
    }
  ];

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

  abrirModalOrcamento(orcamento: any): void {
    this.orcamentoSelecionado = orcamento; // Salva o orçamento selecionado
    this.mostrarModalOrcamento = true;
  }
  
  fecharModalOrcamento(): void {
    this.mostrarModalOrcamento = false;
    this.orcamentoSelecionado = null; 
  }

  abrirModalAberta(solicitacao: any): void{

  }

  fecharModalAberta() : void{

  }
}