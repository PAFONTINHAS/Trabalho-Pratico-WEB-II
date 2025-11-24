import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Status } from '../../../shared/models/enums/status.enum';
import { LoginService } from '../../../services/login-service/login';
import { ManutencaoEntity } from '../../../shared/entities/manutencao_entity';
import { ManutencaoService } from '../../../services/manutencao-service/manutencao-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-efetuar-manutencao',
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css'
})
export class Manutencao {

  descricao = ""
  orientacoes = ""
  manutencao: ManutencaoEntity = {descricaoManutencao: "", orientacaoCliente: ""}

  constructor(private solicitacaoService: SolicitacaoService, private loginService: LoginService, private manutencaoService: ManutencaoService){}

  
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

      this.manutencao.descricaoManutencao = this.descricao
      this.manutencao.orientacaoCliente = this.orientacoes
      this.solicitacao.status = Status.Arrumada
      const user = this.loginService.usuarioLogado
      if(user) {
        this.solicitacaoService.atualizarFuncionario(this.solicitacao, user).subscribe();
        this.manutencaoService.inserir(this.solicitacao, this.manutencao).subscribe();
      }
      this.fecharModal.emit();
    }
  }

}
