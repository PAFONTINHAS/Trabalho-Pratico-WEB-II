import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Solicitar } from "./pages/cliente/solicitar/solicitar";
import { FuncionarioHomepage } from "./pages/funcionario/funcionario-homepage/funcionario-homepage";
import { Login } from "./pages/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Solicitar, FuncionarioHomepage, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MM-TADS');
}
