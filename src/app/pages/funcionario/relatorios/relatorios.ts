// src/app/pages/funcionario/relatorios/relatorios.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CategoriaService } from '../../../services/categoria-service/categoria-service';
import { Categoria } from '../../../shared/entities/categoria_entity';
// Importação dos novos itens
// Caminho corrigido para o novo serviço (3 níveis acima, entra em services/relatorio-service)
import { RelatorioService } from '../../../services/relatorio-service/relatorio-service';
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../../shared/entities/relatorio_entity';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios.html',
})
export class Relatorios implements OnInit { // <-- CLASSE DO COMPONENTE

  // Injetando o novo RelatorioService
  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly relatorioService: RelatorioService // <-- Injeção correta
    ) {}

  categorias: Categoria[] = [];

  // Propriedades para filtros
  dataInicioRelatorio: string = ''; 
  dataFimRelatorio: string = '';     
  categoriaSelecionadaId: number | null = null; 

  // Flags para rastrear submissão e exibir erros em cada seção
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

  // RF019 - Função para gerar o Relatório de Receitas por Período em PDF.
  gerarRelatorioReceitasPorPeriodo(): void {
    this.formSubmittedPeriodo = true; 

    // Validação: ambos os campos devem ser preenchidos
    if (!this.dataInicioRelatorio || !this.dataFimRelatorio) {
      return; 
    }

    const nomeArquivo = `relatorio_receitas_periodo_${this.dataInicioRelatorio}_a_${this.dataFimRelatorio}.pdf`;

    // 1. Chamar o serviço para obter os dados em JSON do backend
    this.relatorioService.getReceitaPorPeriodo(this.dataInicioRelatorio, this.dataFimRelatorio).subscribe({
      next: (data: ReceitaPorPeriodo[]) => {
        console.log('Dados de Receita por Período recebidos:', data);

        // 2. Simular a criação do PDF a partir dos dados
        const pdfBlob = this.relatorioService.simulatePdfCreation(data, 'Período');
        
        // 3. Forçar o download
        this.relatorioService.downloadFile(pdfBlob, nomeArquivo);
        
        // Reset da flag após sucesso
        this.formSubmittedPeriodo = false; 
      },
      error: (erro) => {
        console.error('Erro ao buscar dados de receita por período:', erro);
        // Lógica de tratamento de erro (ex: feedback para o usuário)
      }
    });
  } 

  // RF020 - Função para gerar o Relatório de Receitas por Categoria em PDF.
  gerarRelatorioReceitasPorCategoria(): void {
    this.formSubmittedCategoria = true; 
    
    // Validação: a categoria deve ser selecionada
    if (!this.categoriaSelecionadaId) {
      return;
    }

    const categoriaNome = this.categorias.find(c => c.id === this.categoriaSelecionadaId)?.nome || 'Todas';
    const nomeArquivo = `relatorio_receitas_categoria_${categoriaNome}.pdf`;

    // 1. Chamar o serviço para obter os dados em JSON do backend
    this.relatorioService.getReceitaPorCategoria().subscribe({
      next: (data: ReceitaPorCategoria[]) => {
        console.log('Dados de Receita por Categoria recebidos:', data);
        
        const pdfBlob = this.relatorioService.simulatePdfCreation(data, 'Categoria');

        // 3. Forçar o download
        this.relatorioService.downloadFile(pdfBlob, nomeArquivo);

        // Reset da flag após sucesso
        this.formSubmittedCategoria = false; 
      },
      error: (erro) => {
        console.error('Erro ao buscar dados de receita por categoria:', erro);
        // Lógica de tratamento de erro (ex: feedback para o usuário)
      }
    });
  }
}