import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';
import { LoginService } from '../../../services/login-service/login';

@Component({
  selector: 'app-efetuar-manutencao',
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css'
})
export class Manutencao {

  constructor(private solicitacaoService: SolicitacaoService, private loginService: LoginService){}

  
  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() operacaoConcluida = new EventEmitter<void>();

  onfecharModal(){
    this.fecharModal.emit();
  }

    finalizarEFecharTudo(): void{
    this.operacaoConcluida.emit();
  }

    efetuarManutencao(): void {
    if (this.solicitacao) {

      this.solicitacao.status = Status.Arrumada
      const user = this.loginService.usuarioLogado
      if(user)
        this.solicitacaoService.atualizarFuncionario(this.solicitacao, user).subscribe();

      this.fecharModal.emit();
    }
  }





}
