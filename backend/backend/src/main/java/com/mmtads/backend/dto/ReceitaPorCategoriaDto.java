package com.mmtads.backend.dto;

// Usando Double para evitar conflito de tipo na projeção HQL/Hibernate
public record ReceitaPorCategoriaDto(String categoria, Double totalReceita) {
}