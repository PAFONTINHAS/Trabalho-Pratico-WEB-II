import { Injectable } from '@angular/core';
import { Funcionario } from '../../shared/entities/funcionario_entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly apiUrl = 'http://localhost:8080/api/funcionarios';

  // private funcionariosSubject: BehaviorSubject<Funcionario[]>;
  // public funcionarios$: Observable<Funcionario[]>;

  constructor(private readonly http: HttpClient) {
    // const funcionarios = localStorage[LS_CHAVE] ? JSON.parse(localStorage[LS_CHAVE]) : [];
    // this.funcionariosSubject = new BehaviorSubject<Funcionario[]>(funcionarios);
    // this.funcionarios$ = this.funcionariosSubject.asObservable();
  }
  
  // private atualizarDados(funcionarios: Funcionario[]) : Observable<Funcionario> {
  //   localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  //   this.funcionariosSubject.next(funcionarios);
  // }

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Funcionario>(url);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {

    const url = `${this.apiUrl}/${funcionario.id}`;

    return this.http.put<Funcionario>(url, funcionario);
  } 
  

  remover(id: number): Observable<void>{
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(url);
  }
  
  // inserirFuncionariosBase(funcionario: Funcionario): void {
  //   const funcionarios = this.listarTodos();
  //   let exists: Boolean = false;
  //   funcionarios.forEach( (obj) => {
  //     if (funcionario.nome === obj.nome) {
  //       exists = true
  //     }
  //   });

  //   if(!exists) {
  //     funcionarios.push(funcionario);
  //     this.atualizarDados(funcionarios);
  //   }

  // }
}
