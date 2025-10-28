package com.mmtads.backend.controller;

import com.mmtads.backend.dto.ReceitaPorCategoriaDto;
import com.mmtads.backend.dto.ReceitaPorPeriodoDto;
import com.mmtads.backend.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    // RF019 - Endpoint para Receita por Período
    // Espera datas no formato ISO (YYYY-MM-DD)
    // Exemplo: GET /api/relatorios/receita-periodo?dataInicio=2025-09-01&dataFim=2025-10-30
    @GetMapping("/receita-periodo")
    public ResponseEntity<List<ReceitaPorPeriodoDto>> getReceitaPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        
        List<ReceitaPorPeriodoDto> relatorio = relatorioService.gerarReceitaPorPeriodo(dataInicio, dataFim);
        return ResponseEntity.ok(relatorio);
    }

    // RF020 - Endpoint para Receita por Categoria
    // Exemplo: GET /api/relatorios/receita-categoria
    @GetMapping("/receita-categoria")
    public ResponseEntity<List<ReceitaPorCategoriaDto>> getReceitaPorCategoria() {
        List<ReceitaPorCategoriaDto> relatorio = relatorioService.gerarReceitaPorCategoria();
        return ResponseEntity.ok(relatorio);
    }
}