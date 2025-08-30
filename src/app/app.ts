import { Component, signal }   from '@angular/core';
import { RouterOutlet }        from '@angular/router';
import { Login }               from "./pages/login/login";
import { Cadastro }            from "./pages/cadastro/cadastro";
import { Detalhes }            from './pages/cliente/detalhes/detalhes';
import { Resgatar }            from './pages/cliente/resgatar/resgatar';
import { Solicitar }           from "./pages/cliente/solicitar/solicitar";
import { Orcamento }           from "./pages/funcionario/orcamento/orcamento";
import { Manutencao }          from "./pages/funcionario/efetuar-manutencao/efetuar-manutencao";
import { PaginaInicial }       from "./pages/cliente/pagina-inicial/pagina-inicial";
import { RejeitarAceitar }     from './pages/cliente/rejeitar-aceitar/rejeitar-aceitar';
import { MoverManutencao }     from './pages/funcionario/mover-manutencao/mover-manutencao';
import { VisualizarOrcamento } from './pages/cliente/visualizar-orcamento/visualizar-orcamento';
import { FinalizarManutencao } from "./pages/funcionario/finalizar-manutencao/finalizar-manutencao";
import { FuncionarioHomepage } from "./pages/funcionario/funcionario-homepage/funcionario-homepage";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Solicitar,
    FuncionarioHomepage,
    Login,
    PaginaInicial,
    Detalhes,
    RejeitarAceitar,
    Resgatar,
    VisualizarOrcamento,
    MoverManutencao,
    Orcamento,
    FinalizarManutencao,
    Manutencao,
    Cadastro
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MM-TADS');
}
