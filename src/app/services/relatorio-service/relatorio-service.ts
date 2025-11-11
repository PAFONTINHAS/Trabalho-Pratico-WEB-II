import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../shared/entities/relatorio_entity'; 

@Injectable({
  providedIn: 'root'
})
export class RelatorioService { 
  private readonly apiUrl = 'http://localhost:8081/api/relatorios';

  constructor(private readonly http: HttpClient) { }

  getReceitaPorPeriodo(dataInicio: string, dataFim: string): Observable<ReceitaPorPeriodo[]> {
    let params = new HttpParams();
    params = params.append('dataInicio', dataInicio);
    params = params.append('dataFim', dataFim);

    return this.http.get<ReceitaPorPeriodo[]>(`${this.apiUrl}/receita-periodo`, { params });
  }

  getReceitaPorCategoria(): Observable<ReceitaPorCategoria[]> {
    return this.http.get<ReceitaPorCategoria[]>(`${this.apiUrl}/receita-categoria`);
  }
  
  downloadFile(data: Blob, nomeArquivo: string): void {
    const url = window.URL.createObjectURL(data);
    
    const anchor = document.createElement('a');
    anchor.download = nomeArquivo;
    anchor.href = url;
    anchor.target = '_blank';
    
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }

  simulatePdfCreation(reportData: any, reportType: string): Blob {
    let content = `Relatório de Receitas - Tipo: ${reportType}\n\n`;
    content += "Dados Brutos (JSON):\n" + JSON.stringify(reportData, null, 2);
    
    return new Blob([content], { type: 'application/pdf' });
  }
}