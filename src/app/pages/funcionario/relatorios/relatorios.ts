import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importação necessária para usar [(ngModel)] no template
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Categoria } from '../../../shared/entities/categoria_entity';

// IMPORTAÇÕES NECESSÁRIAS PARA O SERVIÇO DE RELATÓRIOS
// import { RelatorioService } from '../../../services/relatorio-service/relatorio.service'; 
// Para chamadas HTTP e manipulação do retorno como Blob (PDF)
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, FormsModule], // Adicionar FormsModule para suporte a formulários
  templateUrl: './relatorios.html',
})
export class Relatorios implements OnInit {
  // Injetar o serviço de relatórios (comentado, assumindo sua futura criação)
  // constructor(private readonly categoriaService: CategoriaService, private readonly relatorioService: RelatorioService) {}
  constructor(private readonly categoriaService: CategoriaService) {}

  categorias: Categoria[] = [];

  dataInicioRelatorio: string = ''; // Propriedade para o filtro de Data Início (RF019)
  dataFimRelatorio: string = '';     // Propriedade para o filtro de Data Final (RF019)
  categoriaSelecionadaId: number | null = null; // Propriedade para o filtro de Categoria (RF020)

  // ... (código existente para carregarCategorias e controle de modal)

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
        console.log('Categorias carregadas com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      },

      complete: () => {
        console.log('Requisição de categorias completa');
      },
    });
  }
  
  modalAberto = false;

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  // RF019 - Função para gerar o Relatório de Receitas por Período em PDF.
  // O Relatório é gerado em PDF, agrupado por dia entre as datas.
  // Se as datas forem vazias, deve retornar a receita total desde o início.
  gerarRelatorioReceitasPorPeriodo(): void {
    // this.abrirModal(); // Abre o modal de "Relatório gerado!"
    // Lógica para chamar o endpoint de backend:
    /*
    this.relatorioService.gerarReceitaPeriodo(this.dataInicioRelatorio, this.dataFimRelatorio).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'relatorio_receitas_periodo.pdf'); // Chama a função para baixar
        this.fecharModal();
      },
      error: (erro) => {
        console.error('Erro ao gerar relatório de receitas por período', erro);
        // Lógica para exibir erro ao usuário (ex: um modal de erro)
        // this.fecharModal();
      }
    });
    */
    // Chamada de demonstração:
    this.abrirModal();
  } // Fim da função gerarRelatorioReceitasPorPeriodo

  // RF020 - Função para gerar o Relatório de Receitas por Categoria em PDF.
  // O Relatório é gerado em PDF, com a receita total agrupada por categoria, "desde sempre".
  gerarRelatorioReceitasPorCategoria(): void {
    // this.abrirModal(); // Abre o modal de "Relatório gerado!"
    // Lógica para chamar o endpoint de backend:
    /*
    this.relatorioService.gerarReceitaCategoria(this.categoriaSelecionadaId).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'relatorio_receitas_categoria.pdf'); // Chama a função para baixar
        this.fecharModal();
      },
      error: (erro) => {
        console.error('Erro ao gerar relatório de receitas por categoria', erro);
        // Lógica para exibir erro ao usuário (ex: um modal de erro)
        // this.fecharModal();
      }
    });
    */
    // Chamada de demonstração:
    this.abrirModal();
  } // Fim da função gerarRelatorioReceitasPorCategoria

  // Função auxiliar para realizar o download do arquivo PDF.
  // O backend deve retornar o arquivo como um Blob (Observable<Blob>).
  /*
  downloadPdf(data: Blob, nomeArquivo: string): void {
    // Cria um URL temporário para o Blob recebido
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Cria um elemento <a> (link) no DOM
    const anchor = document.createElement('a');
    anchor.download = nomeArquivo; // Define o nome do arquivo a ser baixado
    anchor.href = url; // Atribui o URL temporário ao link
    
    // Simula o clique no link para iniciar o download
    anchor.click();
    
    // Libera o URL temporário após o download
    window.URL.revokeObjectURL(url);
  }
  */ // Fim da função downloadPdf
}