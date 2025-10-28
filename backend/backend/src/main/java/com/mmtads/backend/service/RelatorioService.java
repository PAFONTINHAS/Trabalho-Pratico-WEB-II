package com.mmtads.backend.service;

import com.mmtads.backend.Repository.PagamentoRepository;
import com.mmtads.backend.dto.ReceitaPorCategoriaDto;
import com.mmtads.backend.dto.ReceitaPorPeriodoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    // RF019 - Receita por Período
    public List<ReceitaPorPeriodoDto> gerarReceitaPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        
        // Ajusta dataInicio para o início do dia (00:00:00)
        LocalDateTime inicio = dataInicio.atStartOfDay();
        // Ajusta dataFim para o final do dia (23:59:59.999...) para incluir todo o dia
        LocalDateTime fim = dataFim.atTime(LocalTime.MAX); 

        return pagamentoRepository.findReceitaByPeriodo(inicio, fim);
    }
    
    // RF020 - Receita por Categoria
    public List<ReceitaPorCategoriaDto> gerarReceitaPorCategoria() {
        return pagamentoRepository.findReceitaByCategoria();
    }
}