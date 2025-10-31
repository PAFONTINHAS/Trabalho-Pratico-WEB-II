package com.mmtads.backend.controller;

import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.Repository.ClienteRepository;
import com.mmtads.backend.dto.ClienteRegistroDto;
import com.mmtads.backend.service.ClienteService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepo;

    @Autowired
    private ClienteService clienteService;

    public ClienteController(ClienteRepository clienteRepo) {
        this.clienteRepo = clienteRepo;
    }

    @GetMapping
    public List<Cliente> getAllClientes() {
        return this.clienteRepo.findByIsDeleteFalse();
    }

    @GetMapping("/{id}")
    public Cliente getClienteById(@PathVariable Long id) {
        return this.clienteRepo.findByIdAndIsDeleteFalse(id);
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarCliente(@RequestBody ClienteRegistroDto clienteDto) {
        try {
            Cliente clienteSalvo = clienteService.registrarNovoCliente(clienteDto);
            return new ResponseEntity<>(clienteSalvo, HttpStatus.CREATED);
        
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro interno ao processar cadastro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/user/{userEmail}/{id}")
    public void deleteClienteById(@PathVariable String userEmail, @PathVariable long id) {    
        Cliente cliente = this.clienteRepo.findByEmailAndIsDeleteFalse(userEmail);
        
        if(cliente.getId() == id) {
            ResponseEntity.badRequest();
        }
        else {
            this.clienteRepo.softDeleteById(id);
        }
    }
}