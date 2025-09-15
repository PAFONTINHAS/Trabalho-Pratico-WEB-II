import { Routes } from '@angular/router';

// Componentes acessíveis a todos
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

// Componentes do Cliente
import { PaginaInicial } from './pages/cliente/pagina-inicial/pagina-inicial';
import { Solicitar } from './pages/cliente/solicitar/solicitar';

// Componentes do Funcionário
import { FuncionarioHomepage } from './pages/funcionario/funcionario-homepage/funcionario-homepage';
import { FinalizarManutencao } from './pages/funcionario/finalizar-manutencao/finalizar-manutencao';
import { VisualizarSolicitacao } from './pages/funcionario/visualizar-solicitacao/visualizar-solicitacao';
import { DefinirOrcamento} from './pages/funcionario/definir-orcamento/definir-orcamento';
import { Manutencao } from './pages/funcionario/efetuar-manutencao/efetuar-manutencao';
import { Administracao } from './pages/funcionario/administracao/administracao';


// Componentes de Administração
import { EquipamentoComponent } from './pages/funcionario/administracao/crud-equipamento/crud-equipamento';
import { CriarFuncionario } from './pages/funcionario/criar-funcionario/criar-funcionario';
import { EditarFuncionario } from './pages/funcionario/editar-funcionario/editar-funcionario';
import { GerenciarFuncionarios } from './pages/funcionario/gerenciar-funcionarios/gerenciar-funcionarios';
import { Relatorios } from './pages/funcionario/relatorios/relatorios';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },

  {
    path: 'cliente',
    children: [
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
      { path: 'pagina-inicial', component: PaginaInicial },
      { path: 'solicitar', component: Solicitar },
    ]
  },

  {
    path: 'funcionario',
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: FuncionarioHomepage },
      { path: 'finalizar-manutencao', component: FinalizarManutencao },
      { path: 'visualizar-solicitacao', component: VisualizarSolicitacao },
      { path: 'orcamento', component: DefinirOrcamento },
      { path: 'efetuar-manutencao', component: Manutencao },
      { path: 'administracao', component: Administracao },

      // CRUD Funcionários
      { path: 'gerenciar-funcionarios', component: GerenciarFuncionarios },
      { path: 'criar-funcionario', component: CriarFuncionario },
      { path: 'editar-funcionario/:id', component: EditarFuncionario },

      // CRUD Equipamentos
      { path: 'crud-equipamento', component: EquipamentoComponent },

      // Relatórios
      { path: 'relatorios', component: Relatorios }
    ]
  }
];
