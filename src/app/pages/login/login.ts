import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulário de login válido!', this.loginForm.value);
      this.router.navigate(['/cliente/pagina-inicial'])
    } else {
      console.log('Formulário inválido. Por favor, verifique os campos.');
      this.loginForm.markAllAsTouched();
    }
  }
}
