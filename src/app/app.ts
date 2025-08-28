import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Solicitar } from "./pages/cliente/solicitar/solicitar";
import { FuncionarioHomepage } from "./pages/funcionario/funcionario-homepage/funcionario-homepage";
import { Login } from "./pages/login/login";
import { PaginaInicial } from "./pages/cliente/pagina-inicial/pagina-inicial";
import { Detalhes } from './pages/cliente/detalhes/detalhes';
import { RejeitarAceitar } from './pages/cliente/rejeitar-aceitar/rejeitar-aceitar';
import { Resgatar } from './pages/cliente/resgatar/resgatar'
import { VisualizarOrcamento } from './pages/cliente/visualizar-orcamento/visualizar-orcamento';
import { Cadastro } from './pages/cadastro/cadastro';
import { Manutencao } from './pages/funcionario/efetuar-manutencao/efetuar-manutencao';
import { FinalizarManutencao } from './pages/funcionario/finalizar-manutencao/finalizar-manutencao';
import { Orcamento } from './pages/funcionario/orcamento/orcamento';
import { MoverManutencao } from "./pages/funcionario/mover-manutencao/mover-manutencao";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Solicitar, FuncionarioHomepage, Login, PaginaInicial, Detalhes,RejeitarAceitar,
    Resgatar, VisualizarOrcamento, Cadastro, Manutencao, FinalizarManutencao, Orcamento, MoverManutencao],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MM-TADS');
}
