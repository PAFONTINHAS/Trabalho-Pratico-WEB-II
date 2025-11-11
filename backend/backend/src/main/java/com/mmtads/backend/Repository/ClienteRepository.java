package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mmtads.backend.Model.Cliente;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    Cliente findByIdAndIsDeleteFalse(long id);
    
    List<Cliente> findByIsDeleteFalse();

    Cliente findByEmailAndIsDeleteFalse(String email);
    
    List<Cliente> findByNomeContainingIgnoreCaseAndIsDeleteFalse(String nome);
    
    @Modifying
    @Query("UPDATE Usuario u SET u.isDelete = true WHERE u.id = :id")    
    @Transactional
    void softDeleteById(Long id);
}