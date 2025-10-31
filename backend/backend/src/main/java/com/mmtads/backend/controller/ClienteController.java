package com.mmtads.backend.controller;

import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.dto.ClienteRegistroDto;
import com.mmtads.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarCliente(@RequestBody ClienteRegistroDto clienteDto) {
        // Se você adicionar validação (@Valid) no DTO, trate a exceção aqui
        try {
            Cliente clienteSalvo = clienteService.registrarNovoCliente(clienteDto);
            // Retorna o cliente salvo (sem a senha, claro)
            return new ResponseEntity<>(clienteSalvo, HttpStatus.CREATED);
        
        } catch (RuntimeException e) {
            // Captura o "Email já cadastrado."
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro interno ao processar cadastro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}