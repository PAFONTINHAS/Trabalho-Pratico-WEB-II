package com.mmtads.backend.service;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Historico;
import com.mmtads.backend.Model.Pagamento;
import com.mmtads.backend.Model.Solicitacao;
import com.mmtads.backend.Model.Status;
import com.mmtads.backend.Repository.HistoricoRepository;
import com.mmtads.backend.Repository.PagamentoRepository;
import com.mmtads.backend.Repository.SolicitacaoRepository;
import com.mmtads.backend.dto.SolicitacaoDto;

import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {

    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Transactional
    public Solicitacao atualizarSolicitacao(SolicitacaoDto solicitacaoDto, Long id) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        //busca a solicitacao que ja existe

        setarSolicitacao(solicitacao, solicitacaoDto);

        if (solicitacao.getStatus() == Status.REDIRECIONADA) {
            this.salvarHistorico(solicitacao, solicitacaoDto.getFuncionarioDestino());
            solicitacao.setFuncionario(solicitacaoDto.getFuncionarioDestino());
        } else {
            if (solicitacao.getStatus() == Status.PAGA)
                this.salvarPagamento(solicitacao);

            this.salvarHistorico(solicitacao, null);
        }

        return this.solicitacaoRepository.save(solicitacao);
    }

    public Solicitacao salvarSolicitacao(SolicitacaoDto solicitacaoDto) {
        Solicitacao solicitacao = new Solicitacao();
        setarSolicitacao(solicitacao, solicitacaoDto);
        return this.solicitacaoRepository.save(solicitacao);
    }

    public void salvarHistorico(Solicitacao s, Funcionario funciDestiono) {
        Historico h = new Historico();
        Date dataHoraAtual = new Date();
        h.setDataHora(dataHoraAtual);
        h.setFunciOrigem(s.getFuncionario());
        h.setSolicitacao(s);
        h.setStatus(s.getStatus());

        if (s.getStatus() == Status.REDIRECIONADA) {
            h.setFunciDestino(funciDestiono);
        }

        this.historicoRepository.save(h);
    }



    // Converte um Double para BigDecimal de forma segura.
    // Isso evita problemas quando o valor é null e impede perda de precisão.
    private static BigDecimal converterBigDecimalDouble(Double valor) {
        if (valor == null) return BigDecimal.ZERO; // retorna zero para evitar NullPointerException
        return BigDecimal.valueOf(valor); // mantem precisão exata
    }

    // Registra um pagamento associado a uma solicitação com status PAGA.
    private void salvarPagamento(Solicitacao solicitacao) {
        Pagamento p = new Pagamento();           // cria instância de Pagamento
        p.setDataHora(new Date());               // registra data/hora atual
        p.setSolicitacao(solicitacao);           // associa pagamento à solicitação

        BigDecimal valorOrcamento =
                converterBigDecimalDouble(solicitacao.getOrcamento()); // converte Double → BigDecimal

        p.setValor(valorOrcamento);              // define valor convertido
        this.pagamentoRepository.save(p);        // persiste no banco
    }

    // Constrói a entidade Solicitacao com base no DTO recebido do front-end.
    private Solicitacao setarSolicitacao(Solicitacao s,SolicitacaoDto solicitacaoDto) {
      //tirei o long id para nao sobrescrever


        s.setCategoria(solicitacaoDto.getCategoria());                   // copia categoria
        s.setCliente(solicitacaoDto.getCliente());                       // copia cliente
        s.setDataHoraAbertura(solicitacaoDto.getDataHoraAbertura());     // data/hora
        s.setDescricaoEquipamento(solicitacaoDto.getDescricaoEquipamento()); // descrição equip.
        s.setDescricaoDefeito(solicitacaoDto.getDescricaoDefeito());     // defeito
        s.setFuncionario(solicitacaoDto.getFuncionario());               // funcionário atual                                        // id pode ser null (novo)
        s.setMotivoRejeicao(solicitacaoDto.getMotivoRejeicao());         // motivo rejeição
        s.setOrcamento(solicitacaoDto.getOrcamento());                   // orçamento
        s.setStatus(solicitacaoDto.getStatus());                         // status

        return s;  // retorna entidade pronta para persistência
    }

    // Converte String → Date no formato dd-MM-yyyy HH:mm:ss
    public Date formatarData(String data) {
        try {
            DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return formatter.parse(data);        // tenta converter
        } catch (ParseException exp) {
            exp.printStackTrace();               // log de erro
            return null;                         // retorna null caso falhe
        }
    }
}
