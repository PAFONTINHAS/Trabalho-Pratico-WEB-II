package com.mmtads.backend.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Historico;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Model.Status;
import com.mmtads.backend.Repository.HistoricoRepository;
import com.mmtads.backend.Repository.SolicitacaoRepository;
import com.mmtads.backend.dto.SolicitacaoDto;

import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {
    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Transactional
    public Solicitacao atualizarSolicitacao(SolicitacaoDto solicitacaoDto, Long id) {
        Solicitacao solicitacao = setarSolicitacao(solicitacaoDto, id);

        if(solicitacao.getStatus() == Status.REDIRECIONADA) {
            this.salvarHistorico(solicitacao, solicitacaoDto.getFuncionarioDestino());
        } else {
            this.salvarHistorico(solicitacao, null);
        }

        return this.solicitacaoRepository.save(solicitacao);
    }

    public Solicitacao salvarSolicitacao(SolicitacaoDto solicitacaoDto) {
        Solicitacao solicitacao = setarSolicitacao(solicitacaoDto, null);
        return this.solicitacaoRepository.save(solicitacao);
    }

    public void salvarHistorico(Solicitacao s, Funcionario funciDestiono) {
        
        Historico h = new Historico();
        Date dataHoraAtual = new Date();
        h.setDataHora(dataHoraAtual);
        h.setFunciOrigem(s.getFuncionario());
        h.setSolicitacao(s);
        h.setStatus(s.getStatus());

        if(s.getStatus() == Status.REDIRECIONADA) {
            h.setFunciDestino(funciDestiono);
        }

        this.historicoRepository.save(h);
    }

    private Solicitacao setarSolicitacao(SolicitacaoDto solicitacaoDto, Long id) {
        Solicitacao s = new Solicitacao();
        s.setCategoria(solicitacaoDto.getCategoria());
        s.setCliente(solicitacaoDto.getCliente());
        s.setDataHoraAbertura((solicitacaoDto.getDataHoraAbertura()));
        s.setDescricaoEquipamento(solicitacaoDto.getDescricaoEquipamento());
        s.setDescricaoDefeito(solicitacaoDto.getDescricaoDefeito());
        s.setFuncionario(solicitacaoDto.getFuncionario());
        s.setIdSolicitacao(id);
        s.setMotivoRejeicao(solicitacaoDto.getMotivoRejeicao());
        s.setOrcamento(solicitacaoDto.getOrcamento());
        s.setStatus(solicitacaoDto.getStatus());

        return s;
    }

    public Date formatarData(String data) {
        try  {
            DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            Date dataFormatada = formatter.parse(data);
            return dataFormatada;
        } catch (ParseException exp) {
            exp.printStackTrace();
            return null;
        }
        
    }
    
}
