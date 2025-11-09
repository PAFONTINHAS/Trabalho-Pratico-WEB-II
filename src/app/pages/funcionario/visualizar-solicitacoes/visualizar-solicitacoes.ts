import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common'; 
import { VisualizarSolicitacao } from '../visualizar-solicitacao/visualizar-solicitacao';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';

@Component({
  selector: 'app-visualizar-solicitacoes',
  imports: [FormsModule, CommonModule, VisualizarSolicitacao],
  templateUrl: './visualizar-solicitacoes.html'
})
export class VisualizarSolicitacoes implements OnInit{

  constructor(private readonly solicitacaoService: SolicitacaoService){}
  
  solicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];
  filtro = tipoFiltro.todas;

  dataInicioFiltro: string = '';
  dataFimFiltro: string = '';

  carregarSolicitacoes(){
    this.solicitacaoService.listarTodos().subscribe({
      next: (data) =>{
        this.solicitacoes = data;
      },
      error: (e) => {

        console.error('Erro ao carregar solicitações: ', e);

      }
    });
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
    
    this.solicitacoesFiltradas = this.solicitacoes;
  }

 mudarFiltro( valor: string){
    switch (valor){
      case "todas":
        this.filtro = tipoFiltro.todas;
        this.solicitacoesFiltradas = this.solicitacoes;
        break;

      case "hoje":
        this.filtro = tipoFiltro.hoje;
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
          
          const dataDaSolicitacao = this.parsearDataString(s.dataHoraAbertura);
          dataDaSolicitacao.setHours(0, 0, 0, 0);
          
          const resultado = dataDaSolicitacao.getTime() === hoje.getTime();
          
          return resultado;
        });
        break;

      case "entreDatas":
        this.filtro = tipoFiltro.entreDatas;
        this.solicitacoesFiltradas = [];
        break;
    }
  }

  parsearDataString(dataString: string): Date {
    // Se a string de data for nula ou vazia, retorna uma data inválida
    if (!dataString || dataString.trim() === '') {
      return new Date('invalid');
    }

    if (dataString.includes('/')) {
      // Formato: "dd/MM/yyyy - HH:mm"
      const parteData = dataString.split(' - ')[0]; // Pega só "dd/MM/yyyy"
      const [dia, mes, ano] = parteData.split('/').map(Number);
      return new Date(ano, mes - 1, dia);
    }
    
    // Se não tiver barra, asumimos o formato do input: "yyyy-MM-dd"
    if (dataString.includes('-')) {
      const [ano, mes, dia] = dataString.split('-').map(Number);
      return new Date(ano, mes - 1, dia);
    }

    // Se não for nenhum dos formatos esperados, retorna data inválida
    return new Date('invalid');
  }

  filtrarSolicitacoesPorData() {

    if (this.dataInicioFiltro && this.dataFimFiltro) {
      const inicio = this.parsearDataString(this.dataInicioFiltro);
      const fim = this.parsearDataString(this.dataFimFiltro);

      fim.setHours(23, 59, 59, 999);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const dataDaSolicitacao = this.parsearDataString(s.dataHoraAbertura);
        
        const resultado = dataDaSolicitacao >= inicio && dataDaSolicitacao <= fim;
        
        return resultado;
      });
      
    } else {
        console.warn("[ENTRE DATAS] Filtro não executado: uma ou ambas as datas estão vazias.");
    }
  }

  mostrarModalSolicitacao = false;
  solicitacaoSelecionada?: any = null;

  abrirModal(solicitacao: any): void {
    this.solicitacaoSelecionada = solicitacao;
    this.mostrarModalSolicitacao = true;
  }

  fecharModal(): void {
    this.mostrarModalSolicitacao = false;
    this.solicitacaoSelecionada = null;
  }


  
  statusClasses(status: string) {
    switch (status) {
      case 'ABERTA':
        return { 'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true };
      case 'ORÇADA':
        return { 'cursor-default bg-yellow-700/20 px-2 py-1 border-1 border-yellow-800 rounded-lg text-yellow-800': true };
      case 'APROVADA':
        return { 'cursor-default bg-yellow-100 px-2 py-1 border-1 border-yellow-400 rounded-lg text-yellow-500': true };
      case 'REJEITADA':
        return { 'cursor-default bg-red-100 px-2 py-1 border-1 border-red-400 rounded-lg text-red-600': true };
      case 'REDIRECIONADA':
        return { 'cursor-default bg-purple-100 px-2 py-1 border-1 border-purple-400 rounded-lg text-purple-600': true };
      case 'ARRUMADA':
        return { 'cursor-default bg-blue-100 px-2 py-1 border-1 border-blue-400 rounded-lg text-blue-600': true };
      case 'PAGA':
        return { 'cursor-default bg-orange-100 px-2 py-1 border-1 border-orange-400 rounded-lg text-orange-600': true };
      case 'FINALIZADA':
        return { 'cursor-default bg-green-100 px-2 py-1 border-1 border-green-400 rounded-lg text-green-600': true };
      default:
        return { 'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true };
    }
  }
}

export enum tipoFiltro {
  todas,
  hoje,
  entreDatas,
};