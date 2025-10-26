package com.mmtads.backend.Controller;

import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Repository.SolicitacaoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoController(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    @GetMapping
    public List<Solicitacao> listarTodas() {
        return solicitacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable Long id) {
        return solicitacaoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Solicitacao criar(@RequestBody Solicitacao solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitacao> atualizar(@PathVariable Long id, @RequestBody Solicitacao solicitacao) {
        if (!solicitacaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        solicitacao.setIdSolicitacao(id);
        return ResponseEntity.ok(solicitacaoRepository.save(solicitacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!solicitacaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        solicitacaoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
