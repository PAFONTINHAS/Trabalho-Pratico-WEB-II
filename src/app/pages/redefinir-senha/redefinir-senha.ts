import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.html',
  styleUrl: './redefinir-senha.css'

})
export class RedefinirSenha {
  email: string = '';

  onSubmit() {
    console.log('E-mail para redefinição:', this.email);
  }
}

