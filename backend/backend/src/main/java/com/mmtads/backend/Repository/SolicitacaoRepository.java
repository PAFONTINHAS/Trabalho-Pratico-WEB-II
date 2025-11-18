package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Model.Status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    List<Solicitacao> findByFuncionarioOrStatus(Funcionario funcionario, Status status);
}
