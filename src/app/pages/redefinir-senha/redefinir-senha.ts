import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './redefinir-senha.html',
})
export class ResetPasswordComponent {
  email: string = '';

  onSubmit() {
    console.log('E-mail para redefinição:', this.email);
    // Aqui você pode chamar o serviço que envia o e-mail
  }
}

