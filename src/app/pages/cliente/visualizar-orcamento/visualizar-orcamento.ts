import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeletarSolicitacao } from "../deletar-solicitacao/deletar-solicitacao";
import { EditarSolicitacao } from "../editar-solicitacao/editar-solicitacao";

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [DeletarSolicitacao, EditarSolicitacao],
  standalone: true,
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento {
  @Input() orcamento: any;
  @Output() fecharModal = new EventEmitter<void>();

  modalDeletar: boolean = false;
  modalEditar: boolean = false;


  onFecharModal(): void {
    this.fecharModal.emit();
  }


  deletarSolicitacao(){
    this.modalDeletar = true;
    this.modalEditar = false;
  }

  editarSolicitacao(){
    this.modalDeletar = false;
    this.modalEditar = true;
  }




}