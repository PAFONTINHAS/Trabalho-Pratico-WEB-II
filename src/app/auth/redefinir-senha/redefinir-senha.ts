import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, FormsModule, CommonModule], 
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.html',
  styleUrl: './redefinir-senha.css'
})
export class RedefinirSenha {
  email: string = '';
  emailError: string = ''; 
  isSubmitting: boolean = false; 
  submitSuccess: boolean = false;

  validateEmail(): boolean {
    this.emailError = '';

    if (!this.email || this.email.trim() === '') {
      this.emailError = 'Por favor, digite seu e-mail';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Por favor, digite um e-mail válido';
      return false;
    }

    return true;
  }

  
  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.validateEmail()) {
      return;
    }

    this.isSubmitting = true;
    
    console.log('E-mail para redefinição:', this.email);
    
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1500);
  }

  onEmailInput(): void {
    if (this.emailError) {
      this.emailError = '';
    }
  }
}