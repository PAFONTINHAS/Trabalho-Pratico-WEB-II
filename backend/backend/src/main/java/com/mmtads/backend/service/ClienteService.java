package com.mmtads.backend.service;

import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.Model.Role;
import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.Repository.ClienteRepository;
import com.mmtads.backend.Repository.UsuarioRepository;
import com.mmtads.backend.dto.ClienteRegistroDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordGeneratorService passwordGeneratorService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailService emailService;

    @Transactional
    public Cliente registrarNovoCliente(ClienteRegistroDto dto) {
        
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        String senhaPura = passwordGeneratorService.gerarSenhaAleatoria();

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setSenha(senhaPura); 

        usuarioService.prepararNovoUsuario(novoUsuario, Role.CLIENTE); 

        String enderecoCompleto = String.format("%s, %s - %s - %s, CEP: %s",
                dto.getLogradouro(),
                dto.getNumero(),
                dto.getCidade(),
                dto.getUf(),
                dto.getCep()
        );

        Cliente novoCliente = new Cliente();
        novoCliente.setCpf(dto.getCpf());
        novoCliente.setTelefone(dto.getTelefone());
        novoCliente.setEndereco(enderecoCompleto);
        
        novoCliente.setUsuario(novoUsuario);

        Cliente clienteSalvo = clienteRepository.save(novoCliente);

        emailService.enviarSenhaDeCadastro(
            clienteSalvo.getUsuario().getEmail(),
            clienteSalvo.getUsuario().getNome(),
            senhaPura 
        );

        return clienteSalvo;
    }
}