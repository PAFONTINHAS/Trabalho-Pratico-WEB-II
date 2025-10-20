package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface solicitacaoRepository extends JpaRepository<Solicitacao, Long> {
}
