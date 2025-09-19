import { Routes } from '@angular/router';

// Componentes acessíveis a todos
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { RedefinirSenha } from './pages/redefinir-senha/redefinir-senha';

// Componentes do Cliente
import { Solicitar } from './pages/cliente/solicitar/solicitar';
import { PaginaInicial } from './pages/cliente/pagina-inicial/pagina-inicial';
import { EditarSolicitacao } from './pages/cliente/editar-solicitacao/editar-solicitacao';
import { DeletarSolicitacao } from './pages/cliente/deletar-solicitacao/deletar-solicitacao';

// Componentes de Administração
import { Relatorios } from './pages/funcionario/relatorios/relatorios';
import { CriarFuncionario } from './pages/funcionario/criar-funcionario/criar-funcionario';
import { CategoriaComponent } from './pages/funcionario/crud-categoria/crud-categoria';
// Componentes do Funcionário
import { Administracao } from './pages/funcionario/administracao/administracao';
import { Manutencao } from './pages/funcionario/efetuar-manutencao/efetuar-manutencao';
import { DefinirOrcamento} from './pages/funcionario/definir-orcamento/definir-orcamento';
import { FuncionarioHomepage } from './pages/funcionario/funcionario-homepage/funcionario-homepage';
import { FinalizarManutencao } from './pages/funcionario/finalizar-manutencao/finalizar-manutencao';
import { VisualizarSolicitacao } from './pages/funcionario/visualizar-solicitacao/visualizar-solicitacao';
//import { DefinirOrcamento} from './pages/funcionario/definir-orcamento/definir-orcamento';
import { VisualizarSolicitacoes } from './pages/funcionario/visualizar-solicitacoes/visualizar-solicitacoes';
import { ConfirmarOrcamento } from './pages/funcionario/confirmar-orcamento/confirmar-orcamento';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'redefinir-senha', component: RedefinirSenha },

  {
    path: 'cliente',
    children: [
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
      { path: 'solicitar', component: Solicitar },
      { path: 'pagina-inicial', component: PaginaInicial },
      { path: 'editar-solicitacao', component: EditarSolicitacao},
      { path: 'deletar-solicitacao', component: DeletarSolicitacao},

    ]
  },

  {
    path: 'funcionario',
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: FuncionarioHomepage },
      { path: 'finalizar-manutencao', component: FinalizarManutencao },
      { path: 'visualizar-solicitacao', component: VisualizarSolicitacao },
      { path: 'orcamento', component: VisualizarSolicitacao},
      //{ path: 'orcamento', component: DefinirOrcamento },
      { path: 'efetuar-manutencao', component: Manutencao },
      { path: 'administracao', component: Administracao },
      { path: 'confirmar-orcamento', component: ConfirmarOrcamento },

      // CRUD Funcionários
      { path: 'criar-funcionario', component: CriarFuncionario },
      { path: 'relatorios', component: Relatorios},
      { path: 'solicitacoes', component: VisualizarSolicitacoes},
      

      // CRUD Equipamentos
      { path: 'crud-equipamento', component: CategoriaComponent },

    ]
  }
];
