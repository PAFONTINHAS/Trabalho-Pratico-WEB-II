package com.mmtads.backend.Controller;

import com.mmtads.backend.Repository.FuncionarioRepository;
import com.mmtads.backend.service.UsuarioService;

import org.springframework.http.ResponseEntity;
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
        return this.funciRepo.findByIsDeleteFalse();
    }

    @GetMapping("/{id}")
    public Funcionario getFuncionarioById(@PathVariable Long id) {
        return this.funciRepo.findByIdAndIsDeleteFalse(id);
    }

    @PostMapping
    public Funcionario createFuncionario(@RequestBody Funcionario funcionario) {
<<<<<<< HEAD
        usuarioService.prepararNovoUsuario(funcionario.getUsuario(), Role.FUNCIONARIO);

=======
        funcionario.setId(null);
        this.usuarioService.prepararNovoUsuario(funcionario, Role.FUNCIONARIO);
        
>>>>>>> 3335398d7bd03d0af5608c1f2882d4082b29a137
        return this.funciRepo.save(funcionario);
    }

    @PutMapping("/{id}")
    public Funcionario updateFuncionario(@PathVariable long id, @RequestBody Funcionario funci) {
        funci.setId(id);
        return this.funciRepo.save(funci);
    }

    @DeleteMapping("/user/{userId}/{id}")
    public void deleteFuncionarioById(@PathVariable long userId, @PathVariable long id) {    
        if(id == userId) {
            ResponseEntity.badRequest();
        } else {
            this.funciRepo.softDeleteById(id);
        }
    }

}
