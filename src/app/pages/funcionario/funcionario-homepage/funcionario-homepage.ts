import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-funcionario-homepage',
   imports: [RouterLink],
  templateUrl: './funcionario-homepage.html',
  styleUrl: './funcionario-homepage.css'
})
export class FuncionarioHomepage {

  nome = 'André'

  solicitacoes = [
    { 
      id: 0, 
      dispositivo: 'Notebook Lenovo',         
      descricao: 'Tela quebrada', 
      dataSolicitacao: '10/08/2025 - 15:48', 
      status:'ABERTA'  
    },
    { 
      id: 1, 
      dispositivo: 'Smartphone Samsung',      
      descricao: 'Botão de ligar pifou', 
      dataSolicitacao: '07/08/2025 - 15:48', 
      status:'ABERTA'  
    },
    { 
      id: 2, 
      dispositivo: 'Taable Apple iPad',       
      descricao: 'Problema na bateria', 
      dataSolicitacao: '05/08/2025 - 15:48', 
      status:'ABERTA'  
    },
    { 
      id: 3, 
      dispositivo: 'Notebook Dell Inspiron',  
      descricao: 'Teclado não funciona', 
      dataSolicitacao: '03/08/2025 - 15:48', 
      status:'ABERTA'  
    },
    { 
      id: 4, 
      dispositivo: 'Smartphone Xiaomi Redmi', 
      descricao: 'Tela quebrada', 
      dataSolicitacao: '01/08/2025 - 15:48', 
      status:'ABERTA'  
    }
  ]
  

}
