import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Status } from '../../../shared/models/enums/status.enum';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { funcionarios } from '../../../../assets/mock/funcionarios_mocks';
import { HistoricoStatus } from '../../../shared/entities/historico_status_entity';
import { Manutencao } from '../efetuar-manutencao/efetuar-manutencao';
import { LoginService } from '../../../services/login-service/login';

@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [ CommonModule, RouterModule, FormsModule, Manutencao],
  standalone: true,
  templateUrl: './visualizar-solicitacao.html',
  styleUrls: ['./visualizar-solicitacao.css']
})
export class VisualizarSolicitacao implements OnInit {
  @Input() solicitacao?: Solicitacao;
  @Output() fecharModal = new EventEmitter<void>();  
  @Output() operacaoConcluida = new EventEmitter<void>(); 

  constructor(private solicitacaoService: SolicitacaoService) {}

  public orcamento: string | null = null;
  public funcionarioResponsavel: any = null;
  public funcionarios = funcionarios;
  public statusEnum = Status;
  public modalAberto = false;

  public modalEfetuarAberto: boolean = false;
  
  public orcamentoSubmitted: boolean = false;

  ngOnInit(): void {
    console.log(this.solicitacao?.cliente)
    if (this.solicitacao) {
      this.orcamento = this.solicitacao.orcamento ? this.solicitacao.orcamento.toString() : null;
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

  abrirModalEfetuar(){
    this.modalEfetuarAberto = true;
  }
  
  mudarFuncionario(numeroFuncionario: number){

    if(!this.solicitacao) return;
    
    const funcionario = funcionarios[numeroFuncionario];

    if(this.solicitacao.funcionario == funcionario) return;

    this.solicitacao.funcionario = funcionario;

    this.solicitacao.status = Status.Redirecionada
    this.solicitacaoService.atualizar(this.solicitacao).subscribe();

    this.modalAberto = false;
  };

  efetuarOrcamento(): void {    
    if (this.solicitacao && this.orcamento !== null) {
      const orcamentoFormatado = Number(this.orcamento.replace("R$ ", "").replace(",", "."))  * 10;

      this.solicitacao.orcamento = orcamentoFormatado;
      this.solicitacao.status = Status.Orcada

      console.log(this.solicitacao)
      this.solicitacaoService.atualizar(this.solicitacao).subscribe(() => console.log("oie"));

      this.operacaoConcluida.emit();
    }
        this.orcamentoSubmitted = true;

  }

  efetuarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacao.status =  Status.Arrumada
      this.solicitacaoService.atualizar(this.solicitacao).subscribe();

      this.operacaoConcluida.emit();
    }
  }

  finalizarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacao.status = Status.Finalizada
      this.solicitacaoService.atualizar(this.solicitacao).subscribe();

      this.operacaoConcluida.emit();
    }
  }


  
  notificarOperacao(): void {
    this.operacaoConcluida.emit();
  }

  handleOrcamento(e: any) {
    let input = e.target
    input.value = this.orcamentoMask(input.value)
    
    if (this.orcamentoSubmitted) {
        this.orcamentoSubmitted = false;
    }
  }

  orcamentoMask(value: any) {
    
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    )

  console.log(result)

   /* value = value.replace(/\D/g, '') 
    value = value.replace(/(\d+)(\d{2})$/, "$1,$2"); 
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); 
    console.log(value)*/

  return 'R$ ' + result
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