import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { todasSolicitacoes } from './solicitacoes';

@Component({
  selector: 'app-visualizar-solicitacoes',
  imports: [RouterLink, FormsModule],
  templateUrl: './visualizar-solicitacoes.html',
  styleUrl: './visualizar-solicitacoes.css'
})
export class VisualizarSolicitacoes {

  nome = 'André';


  solicitacoes = todasSolicitacoes;

  solicitacoesFiltradas = this.solicitacoes;

  filtro = tipoFiltro.todas;

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



}

export enum tipoFiltro {
  todas,
  hoje,
  entreDatas,
};
