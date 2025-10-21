package com.mmtads.backend.Model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmtads.backend.Repository.ClienteRepository;
//import com.mmtads.backend.Model.ClienteModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
// defina a classe rest
@RequestMapping("/cliente")
// vincula a uma url

public class ClienteRest {
    @Autowired
    // cria o obj, injeta no atributo
    // é uma injeção de dependencia
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<ClienteModel> listar() {
        // lista todos os contatos do bd
        return clienteRepository.findAll();
        // euem tem o método é o clienterepository
    }

    @PostMapping
    public void salvar(@RequestBody ClienteModel cliente) {
        // RequestBody converte de json para obj java
        clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public ClienteModel atualizar(@PathVariable Long id, @RequestBody ClienteModel cliente) {
    ClienteModel existente = clienteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Cliente não encontrado com id " + id));

    existente.setNome(cliente.getNome());
    existente.setCpf(cliente.getCpf());
    existente.setEmail(cliente.getEmail());
    existente.setEndereco(cliente.getEndereco());
    existente.setTelefone(cliente.getTelefone());

    return clienteRepository.save(existente);
}


    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id, @RequestBody ClienteModel cliente) {
        clienteRepository.deleteById(id);
    }
}
