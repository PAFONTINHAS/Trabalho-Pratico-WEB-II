package com.mmtads.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmtads.backend.Model.Historico;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Repository.HistoricoRepository;
import com.mmtads.backend.Repository.SolicitacaoRepository;

@RestController
@RequestMapping("/api/historico")
public class HistoricoController {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private HistoricoRepository historicoRepository;

    public HistoricoController() {
    }

    @GetMapping("/solicitacao/{id}")
    public List<Historico> listarTodasFuncionario(@PathVariable Long id) {
        Solicitacao solicitacao = this.solicitacaoRepository.findById(id).get();
        return this.historicoRepository.findBySolicitacao(solicitacao);
    }
    
}
