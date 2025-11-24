package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Model.Status;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    //List<Solicitacao> findByFuncionarioOrStatus(Funcionario funcionario, Status status);

    List<Solicitacao> findByIsDeleteFalse();

    @Modifying
    @Query("UPDATE Solicitacao s SET s.isDelete = true WHERE s.idSolicitacao = :id")    
    @Transactional
    void softDeleteById(@Param("id") Long id);

    @Query(
        value = "select  * from solicitacao where is_delete = false and (id_funcionario = :id or status='ABERTA')",
        nativeQuery = true
    )
    @Transactional
    List<Solicitacao> findByFuncionarioOrStatus(@Param("id") Long id);

    @Query("SELECT s FROM Solicitacao s WHERE s.cliente.usuario.email = :email AND s.isDelete = false")    
    List<Solicitacao> findByClienteUsuarioEmailAndIsDeleteFalse(@Param("email") String email);
}
