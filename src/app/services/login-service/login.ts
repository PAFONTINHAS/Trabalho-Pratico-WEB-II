import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Login } from '../../shared/models/login.model';
import { Usuario } from '../../shared/models/usuario.model';
import { USUARIOS_MOCK } from '../../shared/mocks/mock-usuarios';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public get usuarioLogado(): Usuario | null {
    let usuario = localStorage[LS_CHAVE];
    return (usuario ? JSON.parse(usuario) : null);
  }
  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

   login(login: Login): Observable<Usuario> { 
    const usuarioEncontrado = USUARIOS_MOCK.find(
      user => user.email === login.login
    );

    if (!usuarioEncontrado) {
      return throwError(() => 'EMAIL_NAO_ENCONTRADO');
    }

    if (usuarioEncontrado.senha !== login.senha) {
      return throwError(() => 'SENHA_INCORRETA');
    }

    console.log('Usuário autenticado:', usuarioEncontrado);
    return of({ ...usuarioEncontrado });
  }
}
