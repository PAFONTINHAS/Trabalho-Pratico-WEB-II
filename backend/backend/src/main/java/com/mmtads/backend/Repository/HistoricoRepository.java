package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmtads.backend.Model.Historico;
import com.mmtads.backend.Model.Solicitacao;

import java.util.List;


public interface HistoricoRepository extends JpaRepository<Historico, Integer>{

    List<Historico> findBySolicitacao(Solicitacao solicitacao);
} 