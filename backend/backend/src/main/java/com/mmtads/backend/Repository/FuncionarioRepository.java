package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mmtads.backend.Model.Funcionario;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
    Funcionario findByIdAndIsDeleteFalse(long id);
    
    List<Funcionario> findByIsDeleteFalse();
    
    List<Funcionario> findByNomeContainingIgnoreCaseAndIsDeleteFalse(String nome);
    
    @Modifying
    @Query("UPDATE Usuario u SET u.isDelete = true WHERE u.id = :id")    @Transactional
    void softDeleteById(Long id);
}