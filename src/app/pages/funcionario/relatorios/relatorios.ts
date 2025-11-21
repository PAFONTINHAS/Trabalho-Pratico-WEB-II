import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Categoria } from '../../../shared/entities/categoria_entity';
import { RelatorioService } from '../../../services/relatorio-service/relatorio-service';
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../../shared/entities/relatorio_entity';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios.html',
})
export class Relatorios implements OnInit { 

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly relatorioService: RelatorioService
    ) {}

  categorias: Categoria[] = [];

  dataInicioRelatorio: string = ''; 
  dataFimRelatorio: string = '';     
  categoriaSelecionadaId: number | null = null; 

  formSubmittedPeriodo: boolean = false;
  formSubmittedCategoria: boolean = false;
  
  modalAberto = false;


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

  gerarRelatorioReceitasPorPeriodo(): void {
    this.formSubmittedPeriodo = true; 

    if (!this.dataInicioRelatorio || !this.dataFimRelatorio) {
      return; 
    }

    const nomeArquivo = `relatorio_receitas_periodo_${this.dataInicioRelatorio}_a_${this.dataFimRelatorio}.pdf`;

    this.relatorioService.getReceitaPorPeriodo(this.dataInicioRelatorio, this.dataFimRelatorio).subscribe({
      next: (data: ReceitaPorPeriodo[]) => {
        console.log('Dados de Receita por Período recebidos:', data);

        // CORREÇÃO AQUI: Chamar o novo método de geração de PDF real
        const pdfBlob = this.relatorioService.gerarPdfReceitaPeriodo(data, this.dataInicioRelatorio, this.dataFimRelatorio);
        
        // 3. Forçar o download
        this.relatorioService.downloadFile(pdfBlob, nomeArquivo);
        
        this.formSubmittedPeriodo = false; 
      },
      error: (erro) => {
        console.error('Erro ao buscar dados de receita por período:', erro);
        // O back-end retornou erro (a correção SQL nativa deve resolver)
      }
    });
  } 

  // RF020 - Função para gerar o Relatório de Receitas por Categoria em PDF.
  gerarRelatorioReceitasPorCategoria(): void {
    this.formSubmittedCategoria = true; 
    
    if (this.categoriaSelecionadaId === null) {
      return;
    }

    const categoriaSelecionada = this.categorias.find(c => c.id === this.categoriaSelecionadaId);
    
    const categoriaNome = categoriaSelecionada ? categoriaSelecionada.nome : 'Todas';
    const nomeArquivo = `relatorio_receitas_categoria_${categoriaNome}.pdf`;

    // MUDANÇA: Passa o ID da categoria selecionada para o serviço.
    this.relatorioService.getReceitaPorCategoria(this.categoriaSelecionadaId).subscribe({
      next: (data: ReceitaPorCategoria[]) => {
        console.log('Dados de Receita por Categoria recebidos:', data);

        // MUDANÇA: Passa os dados e o nome da categoria para a geração do PDF.
        const pdfBlob = this.relatorioService.gerarPdfReceitaCategoria(data, categoriaNome);
        
        // 3. Forçar o download
        this.relatorioService.downloadFile(pdfBlob, nomeArquivo);

        this.formSubmittedCategoria = false; 
      },
      error: (erro) => {
        console.error('Erro ao buscar dados de receita por categoria:', erro);
      }
    });
  }
}