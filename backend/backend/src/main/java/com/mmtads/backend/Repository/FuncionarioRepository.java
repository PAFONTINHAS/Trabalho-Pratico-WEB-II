package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mmtads.backend.Model.Funcionario;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
    Funcionario findByIdAndUsuario_IsDeleteFalse(long id);
    
    List<Funcionario> findByUsuario_IsDeleteFalse();
    
    List<Funcionario> findByUsuario_NomeContainingIgnoreCaseAndUsuario_IsDeleteFalse(String nome);
    
    @Modifying
    @Query("UPDATE Usuario u SET u.isDelete = true WHERE u.id = (SELECT f.usuario.id FROM Funcionario f WHERE f.id = :funcionarioId)")    @Transactional
    void softDeleteById(@Param("funcionarioId") Long id);
}