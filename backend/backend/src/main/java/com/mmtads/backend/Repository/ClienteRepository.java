package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mmtads.backend.Model.Cliente;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    @Query("SELECT c FROM Cliente c WHERE c.id = :id AND c.usuario.isDelete = false")
    Cliente findByIdAndIsDeleteFalse(@Param("id") long id);
    
    @Query("SELECT c FROM Cliente c WHERE c.usuario.isDelete = false")
    List<Cliente> findByIsDeleteFalse();

    @Query("SELECT c FROM Cliente c WHERE c.usuario.email = :email AND c.usuario.isDelete = false")
    Cliente findByUsuarioEmail(@Param("email") String email);
    
    @Query("SELECT c FROM Cliente c WHERE lower(c.usuario.nome) LIKE lower(concat('%', :nome, '%')) AND c.usuario.isDelete = false")
    List<Cliente> findByNomeContainingIgnoreCaseAndIsDeleteFalse(@Param("nome") String nome);
    
    @Modifying
    @Query("UPDATE Usuario u SET u.isDelete = true WHERE u.id = :id")    
    @Transactional
    void softDeleteById(@Param("id") Long id);
}