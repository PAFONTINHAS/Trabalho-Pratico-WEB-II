package com.mmtads.backend.service;

import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.Model.Endereco;
import com.mmtads.backend.Model.Role;
import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.Repository.ClienteRepository;
import com.mmtads.backend.Repository.EnderecoRepository;
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
    private EnderecoRepository enderecoRepo;

    @Autowired
    private EmailService emailService;

    @Transactional
    public Cliente registrarNovoCliente(ClienteRegistroDto dto) {
        
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        String senhaPura = passwordGeneratorService.gerarSenhaAleatoria();


        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(senhaPura); 

        usuarioService.prepararNovoUsuario(usuario, Role.CLIENTE); 

        
        final Usuario usuarioSalvo = usuarioRepository.save(usuario);

        Endereco e = this.enderecoRepo.save(dto.getEndereco());
        
    
        Cliente novoCliente = new Cliente();
        
        novoCliente.setUsuario(usuarioSalvo);
        novoCliente.setCpf(dto.getCpf());
        novoCliente.setTelefone(dto.getTelefone());
        novoCliente.setEndereco(e);
        
        Cliente clienteSalvo = clienteRepository.save(novoCliente);

        emailService.enviarSenhaDeCadastro(
            clienteSalvo.getUsuario().getEmail(),
            clienteSalvo.getUsuario().getNome(),
            senhaPura 
        );

        return clienteSalvo;
    }
}