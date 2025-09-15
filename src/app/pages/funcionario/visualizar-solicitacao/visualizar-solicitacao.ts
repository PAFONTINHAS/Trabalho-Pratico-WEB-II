import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() solicitacao: any;
  @Output() fecharModal = new EventEmitter<void>();  

  onFecharModal(): void {
    this.fecharModal.emit();
  }

  modalAberto = false;
  
  abrirModal(){
    this.modalAberto = true;
  }
  
  fecharMover(){
    this.modalAberto = false;
  }

  funcionarios = [
    { id: 0, nome: 'Lucas Silveira',    email: 'lucassilveira@gmail.com' },
    { id: 1, nome: 'Maurício Cistinio', email: 'cistino@outlook.com' },
    { id: 2, nome: 'Marcio Pinheiro',   email: 'marcio.pinheiro@hotmail.com.br' },
    { id: 3, nome: 'Pedro dos Santos',  email: 'santos-pedro@gmail.com' },
    { id: 4, nome: 'Juliano Silveira',  email: 'julianosilveira@gmail.com' }
  ];
  
  funcionarioResponsavel = this.funcionarios[0];

  mudarFuncionario(numeroFuncionario: number){

    this.funcionarioResponsavel = this.funcionarios[numeroFuncionario];
    this.modalAberto = false;

  };

  statusClasses() {
    switch (this.solicitacao.status){
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


  
