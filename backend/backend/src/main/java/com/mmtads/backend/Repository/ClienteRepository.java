package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmtads.backend.Model.ClienteModel;

public interface ClienteRepository extends JpaRepository<ClienteModel,Long>{
//Jpa tem um crud básico já, por isso eu importei

}
