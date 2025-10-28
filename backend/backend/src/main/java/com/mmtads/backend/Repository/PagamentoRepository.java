package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.Pagamento;
import com.mmtads.backend.dto.ReceitaPorCategoriaDto;
import com.mmtads.backend.dto.ReceitaPorPeriodoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

    // RF019: Receita por Período (agrupada por dia) - CAST ADICIONADO AO DIA AQUI
    @Query("SELECT new com.mmtads.backend.dto.ReceitaPorPeriodoDto(CAST(FUNCTION('DATE_FORMAT', p.dataHora, '%Y-%m-%d') AS string), CAST(SUM(p.valor) AS double)) " +
           "FROM Pagamento p " +
           "WHERE p.dataHora >= :dataInicio AND p.dataHora <= :dataFim " +
           "GROUP BY FUNCTION('DATE_FORMAT', p.dataHora, '%Y-%m-%d') " +
           "ORDER BY p.dataHora ASC")
    List<ReceitaPorPeriodoDto> findReceitaByPeriodo(
            @Param("dataInicio") LocalDateTime dataInicio, 
            @Param("dataFim") LocalDateTime dataFim);
    
    // RF020: Receita por Categoria (desde sempre) - MANTER COMO ESTÁ
    @Query("SELECT new com.mmtads.backend.dto.ReceitaPorCategoriaDto(p.solicitacao.categoria.nome, CAST(SUM(p.valor) AS double)) " +
           "FROM Pagamento p " +
           "GROUP BY p.solicitacao.categoria.nome " +
           "ORDER BY CAST(SUM(p.valor) AS double) DESC")
    List<ReceitaPorCategoriaDto> findReceitaByCategoria();

}