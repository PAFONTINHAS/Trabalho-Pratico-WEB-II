import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { Login } from '../../shared/models/login.model';
import { Usuario } from '../../shared/models/usuario.model';

const AUTH_TOKEN_KEY = "auth_token";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  public get usuarioLogado(): Usuario | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY); 

    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      
      return {
        nome: decodedToken.nome, 
        email: decodedToken.sub, 
        perfil: decodedToken.role 
      } as Usuario; 
      
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  login(login: Login): Observable<{ token: string }> {
    const credentials = {
      email: login.login,
      senha: login.senha
    };

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      })
    );
  }
}