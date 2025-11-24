import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { Status } from '../../../shared/models/enums/status.enum';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { HistoricoStatus } from '../../../shared/entities/historico_status_entity';
import { Manutencao } from '../efetuar-manutencao/efetuar-manutencao';
import { LoginService } from '../../../services/login-service/login';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario-service';
import { Funcionario } from '../../../shared/entities/funcionario_entity';
import { HistoricoService } from '../../../services/historico_service/historico-service';

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

  constructor(
    private solicitacaoService: SolicitacaoService,
    private loginService: LoginService,
    private funcionarioService: FuncionarioService,
    private historicoService: HistoricoService
  ) {}

  public orcamento: string | null = null;
  public funcionarioResponsavel: any = null;
  public funcionarios: Funcionario[] = [];
  public statusEnum = Status;
  public modalAberto = false;

  public modalEfetuarAberto: boolean = false;

  public historico: HistoricoStatus[] = []

  public orcamentoSubmitted: boolean = false;

  ngOnInit(): void {
    this.funcionarioService.listarTodos().subscribe((data) => {
      this.funcionarios = data.filter((funci) => funci.email !== this.loginService.usuarioLogado?.email)
    })
    if (this.solicitacao) {
      this.orcamento = this.solicitacao.orcamento ? this.solicitacao.orcamento.toString() : null;
      this.funcionarioResponsavel = this.solicitacao.funcionario || this.funcionarios[0];
      this.historicoService.listarTodos(this.solicitacao).subscribe((data) =>  {
        this.historico = this.historicoService.arrumarFuncionariosHistorico(data)
      })
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

    const funcionario = this.funcionarios.find((f) => f.id == numeroFuncionario);

    if(this.solicitacao.funcionario == funcionario) return;

    if(funcionario)
    this.solicitacao.funcionarioDestino = funcionario;
    console.log("DESTINO" + this.solicitacao.funcionarioDestino)
    console.log("ORIGEM" + this.solicitacao.funcionario)

    this.solicitacao.status = Status.Redirecionada
    const user = this.loginService.usuarioLogado
    if(user)
      this.solicitacaoService.atualizarFuncionario(this.solicitacao, user).subscribe(() => {
        this.recarregarHistorico();
        this.operacaoConcluida.emit();
      });

    this.modalAberto = false;
  };

efetuarOrcamento(): void {
  if (this.solicitacao && this.orcamento !== null) {

    // Remove máscara e converte corretamente
    const valorString = this.orcamento
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".");

    const valorNumero = parseFloat(valorString);

    this.solicitacao.orcamento = valorNumero;

    this.solicitacao.status = Status.Orcada;

    const user = this.loginService.usuarioLogado;
    if (user)
      this.solicitacaoService.atualizarFuncionario(this.solicitacao, user)
      .subscribe(() => {
        console.log("Salvo com orçamento:", valorNumero)
        this.recarregarHistorico();
        this.operacaoConcluida.emit();
      });
  }

  this.orcamentoSubmitted = true;
}


  efetuarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacao.status =  Status.Arrumada
      const user = this.loginService.usuarioLogado
      if(user)
        this.solicitacaoService.atualizarFuncionario(this.solicitacao, user).subscribe(() => {
          this.recarregarHistorico();
          this.operacaoConcluida.emit();
        });
    }
  }

  finalizarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacao.status = Status.Finalizada
      const user = this.loginService.usuarioLogado
      if(user)
        this.solicitacaoService.atualizarFuncionario(this.solicitacao, user).subscribe(() => {
          this.recarregarHistorico();
          this.operacaoConcluida.emit();
        });
    }
  }



  notificarOperacao(): void {
    this.operacaoConcluida.emit();
  }

  recarregarHistorico(): void {
    if(this.solicitacao){
      this.historicoService.listarTodos(this.solicitacao).subscribe((data) =>  {
        this.historico = this.historicoService.arrumarFuncionariosHistorico(data)
      })
    }
  }

handleOrcamento(e: any) {
  let input = e.target;

  const masked = this.orcamentoMask(input.value);
  input.value = masked;

  // ESSENCIAL
  this.orcamento = masked;

  if (this.orcamentoSubmitted) {
      this.orcamentoSubmitted = false;
  }
}


orcamentoMask(value: string): string {

  if (!value) return '';

  // Remove tudo que não é número
  const somenteNumeros = value.replace(/\D/g, '');

  // Se não tiver números, limpa
  if (somenteNumeros.length === 0) return '';

  // Converte número → centavos
  const valor = (parseInt(somenteNumeros, 10) / 100).toFixed(2);

  // Retorna formatado BR
  return 'R$ ' + valor.replace('.', ',');
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
