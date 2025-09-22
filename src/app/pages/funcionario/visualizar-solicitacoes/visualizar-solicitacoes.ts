import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { todasSolicitacoes } from './solicitacoes';
import { CommonModule } from '@angular/common'; 
import { VisualizarSolicitacao } from '../visualizar-solicitacao/visualizar-solicitacao';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';

@Component({
  selector: 'app-visualizar-solicitacoes',
  imports: [RouterLink, FormsModule, CommonModule, VisualizarSolicitacao],
  templateUrl: './visualizar-solicitacoes.html'
})
export class VisualizarSolicitacoes {

  nome = 'André';
  solicitacoes = todasSolicitacoes;
  solicitacoesFiltradas = this.solicitacoes;

  filtro = tipoFiltro.todas;

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

  mudarFiltro( valor: string){
    switch (valor){
      case "todas":

        this.filtro = tipoFiltro.todas;
        this.solicitacoesFiltradas = this.solicitacoes;

        break;
      case "hoje":

        this.filtro = tipoFiltro.hoje;
        const hoje = new Date();
        hoje.setHours(0,0,0,0);
        this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
          const data = s.dataSolicitacao;
          const dataSemHora = new Date(data);
          dataSemHora.setHours(0,0,0,0);
          return dataSemHora.getTime() === hoje.getTime();
        });
        break;

      case "entreDatas":
        this.filtro = tipoFiltro.entreDatas;
        break;
    }
  }

  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }

  dataInicioFiltro: string = '';
  dataFimFiltro: string = '';

  filtrarSolicitacoesPorData (){

    if(this.dataInicioFiltro && this.dataFimFiltro){
      const inicio = new Date(this.dataInicioFiltro);
      const fim = new Date(this.dataFimFiltro);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const data = s.dataSolicitacao;
        return data >= inicio && data <= fim;
      });
    }

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