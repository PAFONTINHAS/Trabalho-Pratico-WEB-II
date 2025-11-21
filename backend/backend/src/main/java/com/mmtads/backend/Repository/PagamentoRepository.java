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
  @Query(value = 
           "SELECT DATE_FORMAT(p.data_hora, '%Y-%m-%d') AS dia, " + 
           "CAST(SUM(p.valor) AS DOUBLE) AS totalReceita " + // <-- CORREÇÃO AQUI: CAST para DOUBLE
           "FROM pagamento p " + 
           "WHERE p.data_hora >= :dataInicio AND p.data_hora <= :dataFim " + 
           "GROUP BY dia " + 
           "ORDER BY dia ASC",
           nativeQuery = true) 
    List<ReceitaPorPeriodoDto> findReceitaByPeriodo(
            @Param("dataInicio") LocalDateTime dataInicio, 
            @Param("dataFim") LocalDateTime dataFim);
    
    // RF020: Receita por Categoria (desde sempre) - MANTER COMO ESTÁ
  @Query(value = 
           "SELECT c.nome AS categoria, " + 
           "CAST(SUM(p.valor) AS DOUBLE) AS totalReceita " +
           "FROM pagamento p " +
           "JOIN solicitacao s ON p.id_solicitacao = s.id_solicitacao " +
           "JOIN categoria c ON s.id_categoria = c.id_categoria " +
           "WHERE (:idCategoria IS NULL OR c.id_categoria = :idCategoria) " + // Adicionado filtro condicional
           "GROUP BY c.nome " + 
           "ORDER BY totalReceita DESC",
           nativeQuery = true)
    List<ReceitaPorCategoriaDto> findReceitaByCategoria(@Param("idCategoria") Long idCategoria); // Parâmetro adicionado
}