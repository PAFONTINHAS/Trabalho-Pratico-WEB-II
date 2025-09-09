import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [ CommonModule, RouterModule],
  standalone: true,
  templateUrl: './visualizar-solicitacao.html',
  styleUrls: ['./visualizar-solicitacao.css']
})
export class VisualizarSolicitacao {

  modalAberto = false;
  
  abrirModal(){
    this.modalAberto = true;
  }
  
  fecharModal(){
    this.modalAberto = false;
  }

  funcionarios = [
    { id: 0, nome: 'Lucas Silveira',    email: 'lucassilveira@gmail.com' },
    { id: 1, nome: 'Maurício Cistinio', email: 'cistino@outlook.com' },
    { id: 2, nome: 'Marcio Pinheiro',   email: 'marcio.pinheiro@hotmail.com.br' },
    { id: 3, nome: 'Pedro dos Santos',  email: 'santos-pedro@gmail.com' },
    { id: 4, nome: 'Juliano Silveira',  email: 'julianosilveira@gmail.com' }
  ]

  
  
  funcionarioResponsavel = this.funcionarios[0];

  mudarFuncionario(numeroFuncionario: number){

    this.funcionarioResponsavel = this.funcionarios[numeroFuncionario];
    this.modalAberto = false;

  }
}
