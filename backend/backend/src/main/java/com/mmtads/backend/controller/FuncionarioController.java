package com.mmtads.backend.controller;

import com.mmtads.backend.Repository.FuncionarioRepository;
import com.mmtads.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Role;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    private final FuncionarioRepository funciRepo;
    
    private final UsuarioService usuarioService;

    public FuncionarioController(FuncionarioRepository funciRepo, UsuarioService usuarioService) {
        this.funciRepo = funciRepo;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Funcionario> getAllFuncionarios() {
        return this.funciRepo.findByUsuario_IsDeleteFalse();
    }

    @GetMapping("/{id}")
    public Funcionario getFuncionarioById(@PathVariable Long id) {
        return this.funciRepo.findByIdAndUsuario_IsDeleteFalse(id);
    }

    @PostMapping
    public Funcionario createFuncionario(@RequestBody Funcionario funcionario) {
        usuarioService.prepararNovoUsuario(funcionario.getUsuario(), Role.FUNCIONARIO);
        
        return this.funciRepo.save(funcionario);
    }
    
    @PutMapping("/{id}")
    public Funcionario updateFuncionario(@PathVariable long id, @RequestBody Funcionario funci) {
        funci.setId(id);
        return this.funciRepo.save(funci);
    }

    @DeleteMapping("/{id}")
    public void deleteFuncionarioById(@PathVariable long id) {
        this.funciRepo.softDeleteById(id);
    }
    
}