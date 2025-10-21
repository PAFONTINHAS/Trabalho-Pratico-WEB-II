package com.mmtads.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmtads.backend.Model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente,Long>{
//Jpa tem um crud básico já, por isso eu importei

}
