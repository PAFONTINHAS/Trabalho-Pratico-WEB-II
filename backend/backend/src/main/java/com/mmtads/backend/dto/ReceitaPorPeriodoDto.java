// DTO para o Relatório de Receita por Período (Dia e Total)
package com.mmtads.backend.dto;

// Removendo o import de BigDecimal e usando Double
public record ReceitaPorPeriodoDto(String dia, Double totalReceita) {
}