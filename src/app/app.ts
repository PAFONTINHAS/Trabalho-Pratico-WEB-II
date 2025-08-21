import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Solicitar } from "./pages/cliente/solicitar/solicitar";
import { FuncionarioHomepage } from "./pages/funcionario/funcionario-homepage/funcionario-homepage";
import { Login } from "./pages/login/login";
import { PaginaInicial } from "./pages/cliente/pagina-inicial/pagina-inicial";
import { Detalhes } from './pages/cliente/detalhes/detalhes';
import { RejeitarAceitar } from './pages/cliente/rejeitar-aceitar/rejeitar-aceitar';
import { Resgatar } from './pages/cliente/resgatar/resgatar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Solicitar, FuncionarioHomepage, Login, PaginaInicial, Detalhes, RejeitarAceitar,Resgatar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MM-TADS');
}
