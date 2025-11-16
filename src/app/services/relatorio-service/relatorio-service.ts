// src/app/services/relatorio-service/relatorio-service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../shared/entities/relatorio_entity';

// Importa as bibliotecas jsPDF (se estiver instalado)
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Necessário para o doc.autoTable

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private readonly apiUrl = 'http://localhost:8081/api/relatorios';

  constructor(private readonly http: HttpClient) { }

  // ... (getReceitaPorPeriodo e getReceitaPorCategoria permanecem os mesmos)

  // Função genérica para forçar o download de um Blob (PDF real agora).
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

  // RF019 - Função para gerar e baixar o PDF de Receita por Período
  gerarPdfReceitaPeriodo(data: ReceitaPorPeriodo[], dataInicio: string, dataFim: string): Blob {
    const doc = new jsPDF();
    let finalY = 15;
    
    // Título
    doc.setFontSize(18);
    doc.text('Relatório de Receitas por Período', 15, finalY);
    finalY += 10;
    
    // Subtítulo
    doc.setFontSize(12);
    doc.text(`Período: ${this.formatarData(dataInicio)} a ${this.formatarData(dataFim)}`, 15, finalY);
    finalY += 10;
    
    // Preparar dados para autoTable
    const headers = [['Data', 'Receita (R$)']];
    const body = data.map(item => [
        this.formatarData(item.dia),
        `R$ ${item.totalReceita.toFixed(2).replace('.', ',')}`
    ]);
    
    // Adicionar Tabela
    (doc as any).autoTable({
        startY: finalY,
        head: headers,
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [45, 137, 203] }, // Cor mm
        columnStyles: { 1: { halign: 'right' } }
    });

    finalY = (doc as any).autoTable.previous.finalY;

    // Total
    const total = data.reduce((sum, item) => sum + item.totalReceita, 0);
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${total.toFixed(2).replace('.', ',')}`, 15, finalY + 10);
    
    return doc.output('blob');
  }

  // RF020 - Função para gerar e baixar o PDF de Receita por Categoria
  gerarPdfReceitaCategoria(data: ReceitaPorCategoria[]): Blob {
    const doc = new jsPDF();
    let finalY = 15;
    
    doc.setFontSize(18);
    doc.text('Relatório de Receitas por Categoria', 15, finalY);
    finalY += 10;
    
    doc.setFontSize(12);
    doc.text('Período: Desde sempre', 15, finalY);
    finalY += 10;
    
    const headers = [['Categoria', 'Receita (R$)']];
    const body = data.map(item => [
        item.categoria,
        `R$ ${item.totalReceita.toFixed(2).replace('.', ',')}`
    ]);

    (doc as any).autoTable({
        startY: finalY,
        head: headers,
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [45, 137, 203] },
        columnStyles: { 1: { halign: 'right' } }
    });

    finalY = (doc as any).autoTable.previous.finalY;

    const total = data.reduce((sum, item) => sum + item.totalReceita, 0);
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${total.toFixed(2).replace('.', ',')}`, 15, finalY + 10);
    
    return doc.output('blob');
  }

  // Função utilitária para formatar a data (ajusta do formato YYYY-MM-DD para DD/MM/YYYY)
  private formatarData(dataString: string): string {
    try {
      // O backend agora retorna YYYY-MM-DD, precisamos inverter
      const [ano, mes, dia] = dataString.split('-');
      if (ano && mes && dia) {
        return `${dia}/${mes}/${ano}`;
      }
      return dataString;
    } catch (e) {
      return dataString;
    }
  }

  // Mantendo o restante das chamadas HTTP no serviço...

  getReceitaPorPeriodo(dataInicio: string, dataFim: string): Observable<ReceitaPorPeriodo[]> {
    let params = new HttpParams();
    params = params.append('dataInicio', dataInicio);
    params = params.append('dataFim', dataFim);

    // O código de requisição real já estava correto
    return this.http.get<ReceitaPorPeriodo[]>(`${this.apiUrl}/receita-periodo`, { params });
  }

  getReceitaPorCategoria(): Observable<ReceitaPorCategoria[]> {
    // O código de requisição real já estava correto
    return this.http.get<ReceitaPorCategoria[]>(`${this.apiUrl}/receita-categoria`);
  }
}