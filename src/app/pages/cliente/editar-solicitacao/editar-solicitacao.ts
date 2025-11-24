import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Solicitacao } from '../../../shared/entities/solicitacao_entity';
import { SolicitacaoService } from '../../../services/solicitacao_service/solicitacao-service';
import { CategoriaService } from '../../../services/categoria-service/categoria-service'; 
import { Categoria } from '../../../shared/entities/categoria_entity'; 

@Component({
  selector: 'app-editar-solicitacao',
  imports: [FormsModule],
  templateUrl: './editar-solicitacao.html',
  styleUrl: './editar-solicitacao.css'
})
export class EditarSolicitacao {

  constructor(
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService 
  ){}
  
  
  @Input() solicitacao?: Solicitacao | null;
  @Output() fecharModal = new EventEmitter<void>();

  categorias: Categoria[] = [];

  ngOnInit(): void {
      this.carregarCategorias();
  }

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

  compararCategorias(c1: Categoria, c2: Categoria) : boolean{
    return c1 && c2 ? c1.id === c2.id : c1 == c2;
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

    if(this.solicitacao){
      this.solicitacaoService.atualizar(this.solicitacao).subscribe({
        next: () => {
          console.log('SOlicitação atualizada com sucesso!');
          this.onfecharModal();
        },
        error: (e) =>{
          console.error("Erro ao atualizar a solicitação");
        }
      });
    }
  }

}
