package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmtads.backend.Model.Manutencao;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Integer>{
    
}
