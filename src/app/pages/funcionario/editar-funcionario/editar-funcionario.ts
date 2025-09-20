import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../shared/entities/funcionario_entity';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario-service';

@Component({
  selector: 'app-editar-funcionario',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './editar-funcionario.html',
  styleUrl: './editar-funcionario.css'
})

export class EditarFuncionario implements OnInit{
  @ViewChild('formFunci') formFunci! : NgForm
  // funcionario : Funcionario = new Funcionario()

  funcionario = {
    id: 0,
    nome: '' ,
    email: '',
    dataNasc: '' ,
    senha: '' ,
  }

  constructor(
    private funciService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.funciService.buscarPorId(id);

    if (res !== undefined)
      this.funcionario = res;
    else
      throw new Error ("Pessoa não encontrada: id = " + id);
  }

  atualizar(): void {
    if (this.formFunci.form.valid) {
      console.log(this.funcionario.nome)
      this.funciService.atualizar(this.funcionario);
      this.router.navigate(['/funcionario/gerenciar-funcionarios']);
    }
  }
}
