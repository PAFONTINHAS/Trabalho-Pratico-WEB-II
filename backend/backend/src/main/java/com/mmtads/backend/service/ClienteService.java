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
    private UsuarioService usuarioService; // O serviço que você criou com o Hashing

    @Autowired
    private EmailService emailService;

    @Transactional // Garante que ou tudo salva, ou nada salva
    public Cliente registrarNovoCliente(ClienteRegistroDto dto) {
        
        // 1. Verificar se o e-mail já existe
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            // Você pode criar uma exceção customizada depois
            throw new RuntimeException("Email já cadastrado.");
        }

        // 2. Gerar a senha pura de 4 dígitos
        String senhaPura = passwordGeneratorService.gerarSenhaAleatoria();

        // 3. Criar e preparar a entidade Usuario
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setSenha(senhaPura); // Seta a senha no campo @Transient

        // 4. Chamar seu serviço de Hashing para gerar Hash e Salt
        usuarioService.prepararNovoUsuario(novoUsuario, Role.CLIENTE); 
        // novoUsuario agora tem hash, salt e role definidos

        // 5. Formatar o endereço (seu model Cliente tem 1 campo 'endereco')
        String enderecoCompleto = String.format("%s, %s - %s - %s, CEP: %s",
                dto.getLogradouro(),
                dto.getNumero(),
                dto.getCidade(),
                dto.getUf(),
                dto.getCep()
        );

        // 6. Criar a entidade Cliente
        Cliente novoCliente = new Cliente();
        novoCliente.setCpf(dto.getCpf());
        novoCliente.setTelefone(dto.getTelefone());
        novoCliente.setEndereco(enderecoCompleto);
        
        // 7. Ligar o Cliente ao novo Usuario
        // Como o Usuario é o "dono" da relação no @OneToOne do Cliente,
        // salvar o Cliente com Cascade.ALL vai persistir o Usuario junto.
        novoCliente.setUsuario(novoUsuario);

        // 8. Salvar no banco (salva Cliente e Usuario)
        Cliente clienteSalvo = clienteRepository.save(novoCliente);

        // 9. Enviar o email com a senha pura
        emailService.enviarSenhaDeCadastro(
            clienteSalvo.getUsuario().getEmail(),
            clienteSalvo.getUsuario().getNome(),
            senhaPura // Envia '0459', etc.
        );

        return clienteSalvo;
    }
}