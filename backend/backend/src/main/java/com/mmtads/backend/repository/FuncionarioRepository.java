package com.mmtads.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mmtads.backend.Model.Funcionario;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author gabriela
 */
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
    Funcionario findById(long id);
    
    @Query("update usuario set isDelete = true where idUsuario = ?1")
    boolean deleteById(long id);
    
    
}
