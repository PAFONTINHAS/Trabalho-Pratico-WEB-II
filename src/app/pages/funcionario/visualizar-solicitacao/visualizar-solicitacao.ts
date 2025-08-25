import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo para o pipe 'date' e diretivas como *ngFor
import { FormsModule } from '@angular/forms'; // Módulo para a diretiva [(ngModel)]

// Uma boa prática é definir interfaces para os objetos
interface Solicitacao {
  nome: string;
  dispositivo: string;
  descricao: string;
  data: Date;
  status: string;
}

@Component({
  selector: 'app-visualizar-solicitacao',
  standalone: true, // Indica que o componente é autônomo e gerencia suas próprias dependências
  imports: [CommonModule, FormsModule], // Importa os módulos necessários
  templateUrl: './visualizar-solicitacao.html',
  styleUrl: './visualizar-solicitacao.css'
})
export class VisualizarSolicitacao {

  // Objeto para armazenar os dados do formulário de filtro
  filtro: any = {
    dataInicio: '',
    dataFim: '',
    status: ''
  };

  // Lista completa de solicitações (simulando dados)
  solicitacoes: Solicitacao[] = [
    { nome: 'Cliente A', dispositivo: 'Notebook', descricao: 'Reparo de tela', data: new Date('2024-05-15T10:00:00'), status: 'aberto' },
    { nome: 'Cliente B', dispositivo: 'Smartphone', descricao: 'Troca de bateria', data: new Date('2024-05-18T14:30:00'), status: 'andamento' },
    { nome: 'Cliente C', dispositivo: 'PC', descricao: 'Instalação de software', data: new Date('2024-05-20T09:00:00'), status: 'concluido' },
    { nome: 'Cliente D', dispositivo: 'Tablet', descricao: 'Formatação', data: new Date('2024-05-22T11:45:00'), status: 'aberto' }
  ];

  // A lista que será exibida na tabela. Inicializada com todos os itens.
  solicitacoesFiltradas: Solicitacao[] = this.solicitacoes;

  // Método para aplicar os filtros
  aplicarFiltro(): void {
    // A lógica de filtragem vai aqui. Você pode usar os valores do objeto 'this.filtro'
    // para filtrar a lista 'this.solicitacoes' e atualizar 'this.solicitacoesFiltradas'.
    console.log('Filtro aplicado:', this.filtro);
  }

  // Método para efetuar o orçamento
  efetuarOrcamento(solicitacao: Solicitacao): void {
    console.log('Efetuar Orçamento para:', solicitacao.nome);
    // A lógica para o botão de orçamento vai aqui.
  }
}