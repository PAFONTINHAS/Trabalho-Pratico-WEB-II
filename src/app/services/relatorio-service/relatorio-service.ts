// src/app/services/relatorio-service/relatorio-service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaPorPeriodo, ReceitaPorCategoria } from '../../shared/entities/relatorio_entity';

import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private readonly apiUrl = 'http://localhost:8081/api/relatorios';

  constructor(private readonly http: HttpClient) { }

  private getAutoTableFn() {
    const candidates = [
      (autoTable as any).default?.default,
      (autoTable as any).default,
      (autoTable as any).autoTable,
      autoTable
    ];

    for (const c of candidates) {
      if (typeof c === 'function') return c;

      if (c && typeof c.default === 'function') return c.default;
    }

    console.error('jspdf-autotable export detectado:', autoTable);
    throw new Error('autoTable function not found — verifique o pacote jspdf-autotable');
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

  gerarPdfReceitaPeriodo(data: ReceitaPorPeriodo[], dataInicio: string, dataFim: string): Blob {
    const doc = new jsPDF();
    const autoTableFn = this.getAutoTableFn();
    let finalY = 15;

    doc.setFontSize(18);
    doc.text('Relatório de Receitas por Período', 15, finalY);
    finalY += 10;

    doc.setFontSize(12);
    doc.text(`Período: ${this.formatarData(dataInicio)} a ${this.formatarData(dataFim)}`, 15, finalY);
    finalY += 10;

    const headers = [['Data', 'Receita (R$)']];
    const body = data.map(item => [
      this.formatarData(item.dia),
      `R$ ${item.totalReceita.toFixed(2).replace('.', ',')}`
    ]);

    const resultado = autoTableFn(doc, {
      startY: finalY,
      head: headers,
      body: body,
      theme: 'striped',
      headStyles: { fillColor: [45, 137, 203] },
      columnStyles: { 1: { halign: 'right' } }
    });

    finalY = resultado?.finalY ?? finalY;

    const total = data.reduce((sum, item) => sum + item.totalReceita, 0);
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${total.toFixed(2).replace('.', ',')}`, 15, finalY + 35);

    return doc.output('blob');
  }

gerarPdfReceitaCategoria(data: ReceitaPorCategoria[], categoriaNome?: string): Blob {
    const doc = new jsPDF();
    const autoTableFn = this.getAutoTableFn();
    let finalY = 15;

    doc.setFontSize(18);
    doc.text('Relatório de Receitas por Categoria', 15, finalY);
    finalY += 10;

    doc.setFontSize(12);
    const subtitle = categoriaNome ? `Categoria: ${categoriaNome}` : 'Período: Desde sempre';
    doc.text('Período: Desde sempre', 15, finalY);
    finalY += 10;

    const headers = [['Categoria', 'Receita (R$)']];
    const body = data.map(item => [
      item.categoria,
      `R$ ${item.totalReceita.toFixed(2).replace('.', ',')}`
    ]);

    const resultado = autoTableFn(doc, {
      startY: finalY,
      head: headers,
      body: body,
      theme: 'striped',
      headStyles: { fillColor: [45, 137, 203] },
      columnStyles: { 1: { halign: 'right' } }
    });

    finalY = resultado?.finalY ?? finalY;

    const total = data.reduce((sum, item) => sum + item.totalReceita, 0);
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${total.toFixed(2).replace('.', ',')}`, 15, finalY + 35);

    return doc.output('blob');
  }

  private formatarData(dataString: string): string {
    try {
      const [ano, mes, dia] = dataString.split('-');
      if (ano && mes && dia) return `${dia}/${mes}/${ano}`;
      return dataString;
    } catch {
      return dataString;
    }
  }

  getReceitaPorPeriodo(dataInicio: string, dataFim: string): Observable<ReceitaPorPeriodo[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return this.http.get<ReceitaPorPeriodo[]>(`${this.apiUrl}/receita-periodo`, { params });
  }

  getReceitaPorCategoria(idCategoria?: number | null): Observable<ReceitaPorCategoria[]> {
    let params = new HttpParams();
    if (idCategoria !== null && idCategoria !== undefined) {
      params = params.set('idCategoria', idCategoria.toString()); 
    }

    return this.http.get<ReceitaPorCategoria[]>(`${this.apiUrl}/receita-categoria`, { params });
  }
}
