import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.html',
  styleUrl: './redefinir-senha.css'

})
export class ResetPasswordComponent {
  email: string = '';

  onSubmit() {
    console.log('E-mail para redefinição:', this.email);
    // Aqui você pode chamar o serviço que envia o e-mail
  }
}

