import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Status } from '../../../shared/models/enums/status.enum';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { funcionarios } from '../../../../assets/mock/funcionarios_mocks';
import { HistoricoStatus } from '../../../shared/entities/historico_status_entity';

@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [ CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './visualizar-solicitacao.html',
  styleUrls: ['./visualizar-solicitacao.css']
})
export class VisualizarSolicitacao implements OnInit {
  @Input() solicitacao?: Solicitacao;
  @Output() fecharModal = new EventEmitter<void>();  
  @Output() operacaoConcluida = new EventEmitter<void>(); 

  constructor(private solicitacaoService: SolicitacaoService) {}

  public orcamento: number | null = null;
  public funcionarioResponsavel: any = null;
  public funcionarios = funcionarios;
  public statusEnum = Status;
  public modalAberto = false;

  ngOnInit(): void {
    if (this.solicitacao) {
      this.orcamento = this.solicitacao.valorOrcamento || null;
      this.funcionarioResponsavel = this.solicitacao.funcionario || this.funcionarios[0];
    }
  }

  onFecharModal(): void {
    this.fecharModal.emit();
  }

  abrirModal(){
    this.modalAberto = true;
  }
  
  fecharMover(){
    this.modalAberto = false;
  }
  
  mudarFuncionario(numeroFuncionario: number){
    this.funcionarioResponsavel = this.funcionarios[numeroFuncionario];
    this.modalAberto = false;
  };

  // Lógica para efetuar orçamento
  efetuarOrcamento(): void {
    if (this.solicitacao && this.orcamento !== null) {
      this.solicitacao.status = Status.Orcada;
      this.solicitacao.valorOrcamento = this.orcamento;
      const dataHora = this.formatarDataHora();
      const novoHistorico: HistoricoStatus = {
        data: dataHora.data,
        hora: dataHora.hora,
        status: Status.Orcada
      };
      this.solicitacao.historicoStatus.push(novoHistorico);
      this.solicitacaoService.atualizar(this.solicitacao);
      this.operacaoConcluida.emit();
    }
  }

  // Lógica para efetuar manutenção
  efetuarManutencao(): void {
    if (this.solicitacao) {
      this.solicitacao.status = Status.Arrumada;
      const dataHora = this.formatarDataHora();
      const novoHistorico: HistoricoStatus = {
        data: dataHora.data,
        hora: dataHora.hora,
        status: Status.Arrumada
      };
      this.solicitacao.historicoStatus.push(novoHistorico);
      this.solicitacaoService.atualizar(this.solicitacao);
      this.operacaoConcluida.emit();
    }
  }

  // Lógica para finalizar manutenção
  finalizarManutencao(): void {
    if (this.solicitacao) {
      this.solicitacao.status = Status.Finalizada;
      const dataHora = this.formatarDataHora();
      const novoHistorico: HistoricoStatus = {
        data: dataHora.data,
        hora: dataHora.hora,
        status: Status.Finalizada
      };
      this.solicitacao.historicoStatus.push(novoHistorico);
      this.solicitacaoService.atualizar(this.solicitacao);
      this.operacaoConcluida.emit();
    }
  }

  formatarDataHora(): { data: string, hora: string } {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    return {
      data: `${dia}/${mes}/${ano}`,
      hora: `${horas}:${minutos}`
    };
  }

  statusClasses(status: Status): object {
    switch (status) {
      case Status.Aberta: 
       return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true};
      case Status.Orcada:
        return {'cursor-default bg-yellow-700/20 px-2 py-1 border-1 border-yellow-800 rounded-lg text-yellow-800': true};
      case Status.Aprovada:
        return {'cursor-default bg-yellow-100 px-2 py-1 border-1 border-yellow-400 rounded-lg text-yellow-500': true};
      case Status.Rejeitada:
        return {'cursor-default bg-red-100 px-2 py-1 border-1 border-red-400 rounded-lg text-red-600': true};
      case Status.Redirecionada:
        return {'cursor-default bg-purple-100 px-2 py-1 border-1 border-purple-400 rounded-lg text-purple-600': true};
      case Status.Arrumada:
        return {'cursor-default bg-blue-100 px-2 py-1 border-1 border-blue-400 rounded-lg text-blue-600': true};
      case Status.Paga:
        return {'cursor-default bg-orange-100 px-2 py-1 border-1 border-orange-400 rounded-lg text-orange-600': true};
      case Status.Finalizada:
        return {'cursor-default bg-green-100 px-2 py-1 border-1 border-green-400 rounded-lg text-green-600': true};
      default:
        return {'cursor-default bg-gray-100 px-2 py-1 border-1 border-gray-400 rounded-lg text-gray-600': true};
    }
  }
}