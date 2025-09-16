import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualizar-solicitacoes',
  imports: [RouterLink],
  templateUrl: './visualizar-solicitacoes.html',
  styleUrl: './visualizar-solicitacoes.css'
})
export class VisualizarSolicitacoes {

  nome = 'André'

  solicitacoes = [
    { 
      id: 0, 
      equipamento: 'Notebook Lenovo', 
      cliente: 'Amauri Correia',        
      descricao: 'Tela quebrada', 
      dataSolicitacao: '16/09/2025 - 15:48',
      categoria: 'Notebook', 
      status:'ABERTA',
      valor: 'R$ 300,00'
    },
    { 
      id: 1, 
      equipamento: 'Smartphone Samsung',
      cliente: 'Amauri Correia',      
      descricao: 'Botão de ligar pifou', 
      dataSolicitacao: '16/09/2025 - 15:48', 
      categoria: 'Celular',
      status:'ABERTA',
      valor: 'R$ 300,00'
    },
    { 
      id: 2, 
      equipamento: 'Tablet Apple iPad', 
      cliente: 'Amauri Correia',      
      descricao: 'Problema na bateria', 
      dataSolicitacao: '05/08/2025 - 15:48', 
      categoria: 'Tablet',
      status:'ABERTA',
      valor: 'R$ 300,00'
    },
    { 
      id: 3, 
      equipamento: 'Notebook Dell Inspiron', 
      cliente: 'Amauri Correia', 
      descricao: 'Teclado não funciona', 
      dataSolicitacao: '03/08/2025 - 15:48', 
      categoria: 'Notebook',
      status:'ABERTA',
      valor: 'R$ 300,00'
    },
    { 
      id: 4, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'ABERTA',
      valor: 'R$ 300,00'
    }
  ];


  solicitacoesFiltradas = this.solicitacoes;

  filtro = tipoFiltro.todas;

  mudarFiltro( valor: string){

    switch (valor){
      case "todas": this.filtro = tipoFiltro.todas; 

      this.solicitacoesFiltradas = this.solicitacoes;
      
      break;
      case "hoje": this.filtro = tipoFiltro.hoje; 

      this.solicitacoesFiltradas = this.solicitacoes.filter((solicitacao) => solicitacao.dataSolicitacao.startsWith('16/09/2025'));

      
      break;
      case "entreDatas": this.filtro = tipoFiltro.entreDatas; 

    

      
      break;
    }
  }

  filtrarSolicitacoesPorData (valor : string){

  }

}

export enum tipoFiltro {
  todas,
  hoje,
  entreDatas,
};
