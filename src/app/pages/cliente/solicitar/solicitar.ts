import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { clientes } from '../../../../assets/mock/clientes_mock';
import { Status } from '../../../shared/models/enums/status.enum';
import { Router, RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { ModaisConfirmacao } from '../modais-confirmacao/modais-confirmacao';
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { Categoria } from '../../../shared/entities/categoria_entity';
import { LoginService } from '../../../services/login-service/login';

@Component({
    selector: 'app-solicitar',
    imports: [RouterLink, CommonModule, FormsModule, ModaisConfirmacao],
    templateUrl: './solicitar.html',
    styleUrl: './solicitar.css'
})
export class Solicitar implements OnInit{

  categorias: Categoria[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private loginService: LoginService
  ) {}


  modalSolicitacaoCriada:boolean = false;
  
  fecharModalSolicitacao(): void {
    this.modalSolicitacaoCriada = false;
  }

  ngOnInit(): void {
    this.carregarCategorias();
      
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
        console.log('Categorias carregadas com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      },

      complete: () => {
        console.log('Requisição de categorias completa');
      },
    });
  }

  
  formSubmitted: boolean = false;

  solicitacao = {
    cliente: clientes[0],
    status: Status.Aberta,
    funcionario: null,
    descricaoDefeito: "",  // mudou de defeito
    descricaoEquipamento: "",  // mudou de equipamento
    historicoStatus: [],
    categoria: null,
    dataHoraAbertura: "",
    funcionarioDestino: null  // mudou de dataSolicitacao
  };
    
  validateForm(): boolean {
    this.formSubmitted = true;
    let isValid = true;

    if (!this.solicitacao.descricaoEquipamento || this.solicitacao.descricaoEquipamento.trim() === "") {
        isValid = false;
    }
    
    if (!this.solicitacao.categoria) {
        isValid = false;
    }

    if (!this.solicitacao.descricaoDefeito || this.solicitacao.descricaoDefeito.trim() === "") {
        isValid = false;
    }

    return isValid;
  }

  realizarSolicitacao(){
    if (!this.validateForm()) {
        return;
    }

    const dataAtual = new Date().toISOString() ;
    const dataFormatada = dataAtual.replace(",", "");
    const novaSolicitacao: Solicitacao = this.solicitacao;

    novaSolicitacao.dataHoraAbertura = dataFormatada;  // mudou de dataSolicitacao
    
    const usuario = this.loginService.usuarioLogado 

    if(usuario)
      this.solicitacaoService.inserir(novaSolicitacao, usuario).subscribe((data) => console.log(data));
    
    this.solicitacaoService.listarTodos();
    
    this.modalSolicitacaoCriada = true;
  }
}

