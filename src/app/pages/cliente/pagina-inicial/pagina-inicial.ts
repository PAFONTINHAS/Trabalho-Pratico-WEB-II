import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarOrcamento } from '../visualizar-orcamento/visualizar-orcamento';

@Component({
  selector: 'app-pagina-inicial',
  imports: [VisualizarOrcamento, CommonModule],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {
  mostrarModalOrcamento: boolean = false;
  orcamentoSelecionado: any = {};

  //Dados fictícios para simular a tabela
  orcamentos = [
    {
      id: 1,
      dispositivo: 'Notebook Lenovo S145',
      descricao: 'Troca de tela',
      data: '10/08/2025 - 15:48',
      estado: 'Orçada',
      valor: 'R$300,00'
    },
    {
      id: 2,
      dispositivo: 'Smartphone Samsung A04',
      descricao: 'Botão de ligar pifou',
      data: '07/08/2025 - 09:12',
      estado: 'Arrumada',
      valor: 'R$200,00'
    },
    {
      id: 3,
      dispositivo: 'Tablet Apple iPad',
      descricao: 'Problema na bateria',
      data: '05/08/2025 - 11:30',
      estado: 'Rejeitada',
      valor: 'R$550,00'
    },
    {
      id: 4,
      dispositivo: 'Notebook Dell Inspiron',
      descricao: 'Problema no teclado',
      data: '03/08/2025 - 14:15',
      estado: 'Aprovada',
      valor: 'R$450,00'
    }
  ];

  abrirModal(orcamento: any): void {
    this.orcamentoSelecionado = orcamento; // Salva o orçamento selecionado
    this.mostrarModalOrcamento = true;
  }
  
  fecharModal(): void {
    this.mostrarModalOrcamento = false;
    this.orcamentoSelecionado = null; 
  }
}