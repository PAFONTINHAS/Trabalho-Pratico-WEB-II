// src/app/services/relatorio-service/relatorio-service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// O caminho abaixo está correto para ir de services/relatorio-service/ para shared/entities/
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../shared/entities/relatorio_entity'; 

@Injectable({
  providedIn: 'root'
})
export class RelatorioService { // <-- EXPORT CORRIGIDO
  private readonly apiUrl = 'http://localhost:8081/api/relatorios';

  constructor(private readonly http: HttpClient) { }

  /**
   * RF019: Retorna a receita total agrupada por dia dentro de um período.
   */
  getReceitaPorPeriodo(dataInicio: string, dataFim: string): Observable<ReceitaPorPeriodo[]> {
    let params = new HttpParams();
    params = params.append('dataInicio', dataInicio);
    params = params.append('dataFim', dataFim);

    // Endpoint: GET /api/relatorios/receita-periodo?dataInicio=...&dataFim=...
    return this.http.get<ReceitaPorPeriodo[]>(`${this.apiUrl}/receita-periodo`, { params });
  }

  /**
   * RF020: Retorna a receita total agrupada por categoria, desde sempre.
   */
  getReceitaPorCategoria(): Observable<ReceitaPorCategoria[]> {
    // Endpoint: GET /api/relatorios/receita-categoria
    return this.http.get<ReceitaPorCategoria[]>(`${this.apiUrl}/receita-categoria`);
  }
  
  /**
   * Função genérica para forçar o download de um Blob (que simula um PDF).
   */
  downloadFile(data: Blob, nomeArquivo: string): void {
    // Cria um URL temporário para o Blob
    const url = window.URL.createObjectURL(data);
    
    // Cria um link invisível para forçar o download em uma nova aba
    const anchor = document.createElement('a');
    anchor.download = nomeArquivo;
    anchor.href = url;
    anchor.target = '_blank';
    
    // Simula o clique e limpa
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Função Placeholder para simular a criação do PDF a partir dos dados JSON
   */
  simulatePdfCreation(reportData: any, reportType: string): Blob {
    let content = `Relatório de Receitas - Tipo: ${reportType}\n\n`;
    content += "Dados Brutos (JSON):\n" + JSON.stringify(reportData, null, 2);
    
    return new Blob([content], { type: 'application/pdf' });
  }
}