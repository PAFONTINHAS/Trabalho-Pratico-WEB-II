package com.mmtads.backend.controller;

import com.mmtads.backend.repository.FuncionarioRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mmtads.backend.Model.Funcionario;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    
    private final FuncionarioRepository funciRepo;

    public FuncionarioController(FuncionarioRepository funciRepo) {
        this.funciRepo = funciRepo;
    }

    @GetMapping
    public List<Funcionario> getAllFuncionarios() {
        return this.funciRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getFuncionarioById(@PathVariable Long id) {
        return this.funciRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Funcionario createFuncionario(@RequestBody Funcionario funci) {
        return this.funciRepo.save(funci);
    }
    
    @PutMapping
    public Funcionario updateFuncionario(@PathVariable long id, @RequestBody Funcionario funci) {
        funci.setId(id);
        return this.funciRepo.save(funci);
    }

    @DeleteMapping("/{id}")
    public boolean deleteFuncionarioById(@PathVariable long id) {
        return this.funciRepo.deleteById(id);
    }
}

