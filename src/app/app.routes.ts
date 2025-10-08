import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

// Componentes de autenticação
import { LoginComponent } from './auth/login/login';
import { Cadastro } from './auth/cadastro/cadastro';
import { RedefinirSenha } from './auth/redefinir-senha/redefinir-senha';

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
import { FuncionarioHomepage } from './pages/funcionario/funcionario-homepage/funcionario-homepage';
import { FinalizarManutencao } from './pages/funcionario/finalizar-manutencao/finalizar-manutencao';
import { VisualizarSolicitacao } from './pages/funcionario/visualizar-solicitacao/visualizar-solicitacao';
import { VisualizarSolicitacoes } from './pages/funcionario/visualizar-solicitacoes/visualizar-solicitacoes';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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

    ],
    canActivate: [authGuard],
    data: { perfil: ['CLIENTE'] }
  },

  {
    path: 'funcionario',
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: FuncionarioHomepage },
      { path: 'finalizar-manutencao', component: FinalizarManutencao },
      { path: 'visualizar-solicitacao', component: VisualizarSolicitacao },
      { path: 'orcamento', component: VisualizarSolicitacao},
      { path: 'efetuar-manutencao', component: Manutencao },
      { path: 'administracao', component: Administracao },

      // CRUD Funcionários
      { path: 'criar-funcionario', component: CriarFuncionario },
      { path: 'relatorios', component: Relatorios},
      { path: 'solicitacoes', component: VisualizarSolicitacoes},
      

      // CRUD Equipamentos
      { path: 'crud-equipamento', component: CategoriaComponent },

    ],
    canActivate: [authGuard],
    data: { perfil: ['FUNCIONARIO'] }
  }
];
