package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.SolicitacaoModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoRepository extends JpaRepository<SolicitacaoModel, Long> {
}
