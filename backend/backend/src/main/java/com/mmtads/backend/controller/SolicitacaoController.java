package com.mmtads.backend.controller;

import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Model.Status;
import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Repository.ClienteRepository;
import com.mmtads.backend.Repository.FuncionarioRepository;
import com.mmtads.backend.Repository.SolicitacaoRepository;
import com.mmtads.backend.config.JwtAuthenticationFilter;
import com.mmtads.backend.dto.SolicitacaoDto;
import com.mmtads.backend.service.SolicitacaoService;

import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;


@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(origins = "*")

public class SolicitacaoController {
    
    private static final Logger logger = LoggerFactory.getLogger(SolicitacaoController.class);


    @Autowired
    private SolicitacaoService solicitacaoService;

    @Autowired
    private FuncionarioRepository funcionarioRepo;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoController(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    @GetMapping("/user/{email}")
    public List<Solicitacao> listarTodasFuncionario(@PathVariable String email) {
        Funcionario funci = this.funcionarioRepo.findByEmailAndIsDeleteFalse(email);
        return solicitacaoRepository.findByFuncionarioOrStatus(funci.getId());
    }

    @GetMapping("/cliente/{email}")
    public ResponseEntity<List<Solicitacao>> listarPorCliente(@PathVariable String email) {

        List<Solicitacao> lista = solicitacaoRepository.findByClienteUsuarioEmailAndIsDeleteFalse(email);
        return ResponseEntity.ok(lista);
    }
    

    @GetMapping()
    public List<Solicitacao> listarTodas() {
        return solicitacaoRepository.findByIsDeleteFalse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable Long id) {
        return solicitacaoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{email}")
    public Solicitacao criar(@PathVariable String email, @RequestBody SolicitacaoDto solicitacaoDto) {
        
        logger.info("[SERVER-CONTROLLER] FUNÇÃO ACIONADA PELO SERVICE");
        logger.info("[SERVER-CONTROLLER] EMAIL: {} CORPO: {}", email, solicitacaoDto);
        
        Cliente cliente = this.clienteRepository.findByEmailAndIsDeleteFalse(email);
        solicitacaoDto.setCliente(cliente);
        
        Solicitacao s = this.solicitacaoService.salvarSolicitacao(solicitacaoDto);
        this.solicitacaoService.salvarHistorico(s, null);
        return s;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitacao> atualizar(@PathVariable Long id, @RequestBody SolicitacaoDto solicitacao) {
        if (!solicitacaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        solicitacao.setIdSolicitacao(id);
        Solicitacao s = this.solicitacaoService.atualizarSolicitacao(solicitacao, id);
        return ResponseEntity.ok(s);
    }

    @PutMapping("/{id}/user/{email}")
    public ResponseEntity<Solicitacao> atualizarFuncionario(@PathVariable Long id, @PathVariable String email, @RequestBody SolicitacaoDto solicitacao) {
        if (!solicitacaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Funcionario funci = this.funcionarioRepo.findByEmailAndIsDeleteFalse(email);
        solicitacao.setFuncionario(funci);
        solicitacao.setIdSolicitacao(id);
        Solicitacao s = this.solicitacaoService.atualizarSolicitacao(solicitacao, id);
        return ResponseEntity.ok(s);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!solicitacaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        solicitacaoRepository.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
