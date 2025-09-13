import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-funcionario-homepage',
   imports: [RouterLink],
  templateUrl: './funcionario-homepage.html',
})
export class FuncionarioHomepage {

  nome = 'André'

  solicitacoes = [
    { 
      id: 0, 
      equipamento: 'Notebook Lenovo', 
      cliente: 'Amauri Correia',        
      defeito: 'Tela quebrada', 
      dataSolicitacao: '10/08/2025 - 15:48',
      categoria: 'Notebook', 
      status:'ABERTA'  
    },
    { 
      id: 1, 
      equipamento: 'Smartphone Samsung',
      cliente: 'Amauri Correia',      
      defeito: 'Botão de ligar pifou', 
      dataSolicitacao: '07/08/2025 - 15:48', 
      categoria: 'Celular',
      status:'ABERTA'  
    },
    { 
      id: 2, 
      equipamento: 'Tablet Apple iPad', 
      cliente: 'Amauri Correia',      
      defeito: 'Problema na bateria', 
      dataSolicitacao: '05/08/2025 - 15:48', 
      categoria: 'Tablet',
      status:'ABERTA'  
    },
    { 
      id: 3, 
      equipamento: 'Notebook Dell Inspiron', 
      cliente: 'Amauri Correia', 
      defeito: 'Teclado não funciona', 
      dataSolicitacao: '03/08/2025 - 15:48', 
      categoria: 'Notebook',
      status:'ABERTA'  
    },
    { 
      id: 4, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      defeito: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      categoria: 'Impressora',
      status:'ABERTA'  
    }
  ]
  

}
