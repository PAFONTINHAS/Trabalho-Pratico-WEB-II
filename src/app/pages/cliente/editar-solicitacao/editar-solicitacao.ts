import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { CategoriaService } from '../../../services/categoria-service/categoria-service'; // Importação do serviço de categoria
import { Categoria } from '../../../shared/entities/categoria_entity'; // Importação do modelo de categoria
import { Categorias } from '../../../shared/models/enums/categoria.enum';

@Component({
  selector: 'app-editar-solicitacao',
  imports: [FormsModule],
  templateUrl: './editar-solicitacao.html',
  styleUrl: './editar-solicitacao.css'
})
export class EditarSolicitacao {

  // APLICAR O SERVICE AO ATUALIZAR A SOLICITAÇÃO
  
  constructor(
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService // <-- NOVO: Serviço de Categoria
  ){}
  
  
  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();

  // Use a lista de categorias para ser preenchida pelo serviço
  categorias: Categoria[] = [];

  // Implemente ngOnInit para carregar os dados
  ngOnInit(): void {
      this.carregarCategorias();
  }

  // Novo método para carregar categorias do backend (igual ao de outras páginas)
  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      }
    });
  }
  
  modalConfirmacaoAberto: 'sim' | 'nao' | 'nenhum' = 'nenhum';

  abrirSubModal(tipo: 'sim' | 'nao'){
    this.modalConfirmacaoAberto = tipo;
  }
  

  onfecharModal(){

    this.fecharModal.emit();
  }

  fecharApenasSubModal() : void{
    this.modalConfirmacaoAberto = 'nenhum';
    this.onfecharModal();
  }


  editarSolicitacao(){

    // alert(JSON.stringify(this.solicitacao));
    this.onfecharModal();
  }

}
