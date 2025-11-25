import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../shared/models';
import { LoginService } from '../../services/login-service/login';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const usuarioLogado = this.loginService.usuarioLogado;
    if (usuarioLogado) {
      this.redirecionarPorPerfil(usuarioLogado);
    }
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.message = ''; 

    const loginData: Login = this.loginForm.value;

    this.loginService.login(loginData).subscribe({
      next: () => {
        const usu = this.loginService.usuarioLogado;
        if (usu) {
          this.redirecionarPorPerfil(usu);
        }
        this.loading = false;
      },
      error: (err) => {
        const erroMsg = err.error; 

        if (erroMsg === 'LOGIN_INVALIDO') {
          this.message = 'Email ou senha inválidos.';
          
        } else {
          this.message = 'Email ou senha inválidos.';
        }
        this.loading = false;
      }
    });
  }

  private redirecionarPorPerfil(usuario: Usuario): void {
    switch (usuario.perfil) {
      case 'CLIENTE':
        this.router.navigate(['/cliente/pagina-inicial']);
        break;
      case 'FUNCIONARIO':
        this.router.navigate(['/funcionario/homepage']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  get login() {
    return this.loginForm.get('login');
  }

  get senha() {
    return this.loginForm.get('senha');
  }
}