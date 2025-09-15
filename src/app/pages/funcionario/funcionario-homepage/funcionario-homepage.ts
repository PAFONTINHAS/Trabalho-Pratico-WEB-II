import { Component } from '@angular/core';
import { VisualizarSolicitacao } from '../visualizar-solicitacao/visualizar-solicitacao';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-funcionario-homepage',
   imports: [VisualizarSolicitacao, NgClass],
  templateUrl: './funcionario-homepage.html',
})
export class FuncionarioHomepage {
  mostrarModalSolicitacao = false;
  solicitacaoSelecionada: any;

  nome = 'André'

  solicitacoes = [
    { 
      id: 0, 
      equipamento: 'Notebook Lenovo', 
      cliente: 'Amauri Correia',        
      descricao: 'Tela quebrada', 
      dataSolicitacao: '10/08/2025 - 15:48',
      categoria: 'Notebook', 
      status:'ABERTA',
      valor: 'R$ 300,00'
    },
    { 
      id: 1, 
      equipamento: 'Smartphone Samsung',
      cliente: 'Amauri Correia',      
      descricao: 'Botão de ligar pifou', 
      dataSolicitacao: '07/08/2025 - 15:48', 
      categoria: 'Celular',
      status:'ORÇADA',
      valor: 'R$ 300,00'
    },
    { 
      id: 2, 
      equipamento: 'Tablet Apple iPad', 
      cliente: 'Amauri Correia',      
      descricao: 'Problema na bateria', 
      dataSolicitacao: '05/08/2025 - 15:48', 
      categoria: 'Tablet',
      status:'REJEITADA',
      valor: 'R$ 300,00'
    },
    { 
      id: 3, 
      equipamento: 'Notebook Dell Inspiron', 
      cliente: 'Amauri Correia', 
      descricao: 'Teclado não funciona', 
      dataSolicitacao: '03/08/2025 - 15:48', 
      categoria: 'Notebook',
      status:'APROVADA',
      valor: 'R$ 300,00'
    },
    { 
      id: 4, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'REDIRECIONADA',
      valor: 'R$ 300,00'
    },
    { 
      id: 5, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'ARRUMADA',
      valor: 'R$ 300,00'
    },
    { 
      id: 6, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'PAGA',
      valor: 'R$ 300,00'
    },
    { 
      id: 7, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'FINALIZADA',
      valor: 'R$ 300,00'
    },
  ];

  abrirModal(solicitacao: any): void {
    this.solicitacaoSelecionada = solicitacao; // Salva o orçamento selecionado
    this.mostrarModalSolicitacao = true;
  }

  fecharModal(): void {
    this.mostrarModalSolicitacao = false;
    this.solicitacaoSelecionada = null;
  }
  
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
}
