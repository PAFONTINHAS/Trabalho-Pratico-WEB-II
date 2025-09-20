import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipamento } from '../../../shared/entities/equipamento_entity';
import { EquipamentoService } from '../../../services/equipamento-service/equipamento-service';
import { Router, RouterModule } from '@angular/router';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  imports: [CommonModule,FormsModule, RouterModule],
  selector: 'app-equipamento',
  templateUrl: './crud-equipamento.html',
})
export class EquipamentoComponent implements OnInit {

  categorias: Equipamento[] = []
  

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.categorias = this.listarTodos()
  }

  formVisivel = false;
  editando = false;
  equipamento: Equipamento = new Equipamento()

  // abrir
  abrirFormulario() {
    this.formVisivel = true;
    this.editando = false;
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
      this.atualizar()
    } else {
      this.inserir()
    }

    this.cancelar();
  }

  editarForm(categoria: any) {
    this.formVisivel = true;
    this.editando = true;
    this.equipamento = categoria
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
    this.router.navigate(['/funcionario/crud--equipamento']);
  }

  atualizar(): void {
    this.equipamentoService.atualizar(this.equipamento);
  }
}
