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
import { Relatorios } from './pages/funcionario/relatorios/relatorios';
import { CriarFuncionario } from './pages/funcionario/criar-funcionario/criar-funcionario';
import { EditarFuncionario } from './pages/funcionario/editar-funcionario/editar-funcionario';
import { GerenciarFuncionarios } from './pages/funcionario/gerenciar-funcionarios/gerenciar-funcionarios';
import { EquipamentoComponent } from './pages/funcionario/administracao/crud-equipamento/crud-equipamento';


export const routes: Routes = [
   // Rotas públicas de login e cadastro
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },

  {
     // Rotas para a área de cliente
    path: 'cliente',
    children: [
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
      { path: 'pagina-inicial', component: PaginaInicial },
      { path: 'solicitar', component: Solicitar },
    ]
  },

  {
     // Rotas para a área de funcionário
    path: 'funcionario',
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: FuncionarioHomepage },
      { path: 'finalizar-manutencao', component: FinalizarManutencao },
      // { path: 'mover-manutencao', component: MoverManutencao },
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

