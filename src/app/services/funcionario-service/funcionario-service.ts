import { Injectable } from '@angular/core';
import { Funcionario } from '../../shared/entities/funcionario_entity';
import { BehaviorSubject, Observable } from 'rxjs';

const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private funcionariosSubject: BehaviorSubject<Funcionario[]>;
  public funcionarios$: Observable<Funcionario[]>;

  constructor() {
    const funcionarios = localStorage[LS_CHAVE] ? JSON.parse(localStorage[LS_CHAVE]) : [];
    this.funcionariosSubject = new BehaviorSubject<Funcionario[]>(funcionarios);
    this.funcionarios$ = this.funcionariosSubject.asObservable();
  }
  
  private atualizarDados(funcionarios: Funcionario[]) {
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
    this.funcionariosSubject.next(funcionarios);
  }

  listarTodos(): Funcionario[] {
    return this.funcionariosSubject.getValue();
  }

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();
    funcionario.id = new Date().getTime();
    funcionarios.push(funcionario);
    this.atualizarDados(funcionarios);
  }

  buscarPorId(id: number): Funcionario | undefined {
    const funcionarios = this.listarTodos();
    return funcionarios.find(funcionario => funcionario.id === id);
  }

  atualizar(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();
    const index = funcionarios.findIndex(f => f.id === funcionario.id);
    if (index > -1) {
      funcionarios[index] = funcionario;
      this.atualizarDados(funcionarios);
    }
  } 

  remover(id: number): void {
    let funcionarios = this.listarTodos();
    funcionarios = funcionarios.filter(f => f.id !== id);
    this.atualizarDados(funcionarios);
  }
  
  inserirFuncionariosBase(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();
    let exists: Boolean = false;
    funcionarios.forEach( (obj) => {
      if (funcionario.nome === obj.nome) {
        exists = true
      }
    });

    if(!exists) {
      funcionarios.push(funcionario);
      this.atualizarDados(funcionarios);
    }

  }
}
