package com.mmtads.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmtads.backend.Model.Manutencao;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Repository.ManutencaoRepository;
import com.mmtads.backend.Repository.SolicitacaoRepository;

@RestController
@RequestMapping("/api/manutencao")
public class ManutencaoController {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private ManutencaoRepository manutencaoRepository;
    
    @PostMapping("/{id}")
    public Manutencao salvarManutencao(@PathVariable Long id, @RequestBody Manutencao manutencao) {
        Solicitacao s = this.solicitacaoRepository.findById(id).get();

        manutencao.setSolicitacao(s);
        
        return this.manutencaoRepository.save(manutencao);
    }
}
