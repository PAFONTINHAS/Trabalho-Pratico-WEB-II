import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipamentoService } from '../../../services/equipamento';
import { Equipamento } from '../../../shared/models/equipamento.model';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  imports: [CommonModule,FormsModule ],
  selector: 'app-equipamento',
  templateUrl: './crud-equipamento.html',
})
export class EquipamentoComponent {

  ngOnInit(): void {
    this.categorias = this.listarTodos()
  }

  categorias: Equipamento[] = []

  constructor(
    private equipamentoService: EquipamentoService,
  ){}

  formVisivel = false;
  editando = false;
  equipamento: Equipamento = new Equipamento()

  // abrir 
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
    this.equipamento = { id: 0, nome: '' };
  }

  // cancelar
  cancelar() {
    this.formVisivel = false;
    this.equipamento = { id: 0, nome: '' };
  }

  // salvar 
  salvarCategoria() {
    if (this.equipamento.nome.trim() === '') return;

    if (this.editando) {
     // this.atualizar(categoria)
    } else {
      this.inserir()
    }

    this.cancelar();
  }

  editarCategoria(categoria: any) {
    this.formVisivel = true;
    this.editando = true;
    this.atualizar(categoria)
  }

  listarTodos(): Equipamento[] {
    return this.equipamentoService.listarTodos()
  }

  remover($event: any, equipamento: Equipamento): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o equipamento ${equipamento.nome}?`)) {
      this.equipamentoService.remover(equipamento.id!);
      this.categorias = this.listarTodos();
    }
  }

  inserir(): void {
      this.equipamentoService.inserir(this.equipamento);
  }

  atualizar(equipamento: any): void {
    console.log(equipamento)
    this.equipamentoService.atualizar(equipamento);
    //this.router.navigate(['/funcionario/gerenciar-funcionarios']);
    
  }
}
