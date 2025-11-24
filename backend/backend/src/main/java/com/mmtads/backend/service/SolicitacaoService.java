package com.mmtads.backend.service;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.mmtads.backend.config.JwtAuthenticationFilter;
import com.mmtads.backend.dto.SolicitacaoDto;

import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {

    private static final Logger logger = LoggerFactory.getLogger(SolicitacaoService.class);


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

        logger.info("[SERVER-SERVICE] FUNÇÃO DE SALVAR SOLICITAÇÃO ACIONADA PELO CONTROLLER");

        Solicitacao solicitacao = new Solicitacao();
        setarSolicitacao(solicitacao, solicitacaoDto);
        return this.solicitacaoRepository.save(solicitacao);
    }

    public void salvarHistorico(Solicitacao s, Funcionario funciDestino) {
        Historico h = new Historico();
        Date dataHoraAtual = new Date();
        h.setDataHora(dataHoraAtual);

        if(s.getStatus() == Status.ABERTA || s.getStatus() == Status.APROVADA || s.getStatus() == Status.REJEITADA || s.getStatus() == Status.PAGA) {
            h.setFunciOrigem(null);
        } else {
            h.setFunciOrigem(s.getFuncionario());
        }
        h.setSolicitacao(s);
        h.setStatus(s.getStatus());

        if (s.getStatus() == Status.REDIRECIONADA) {
            h.setFunciDestino(funciDestino);
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

        System.out.println("VALOR QUE CHEGA DO FRONT (solicitacao.getOrcamento()) = "
                + solicitacao.getOrcamento());

        Pagamento p = new Pagamento();
        p.setDataHora(new Date());
        p.setSolicitacao(solicitacao);

        BigDecimal valorOrcamento =
                converterBigDecimalDouble(solicitacao.getOrcamento());

        p.setValor(valorOrcamento);

        System.out.println("VALOR FINAL ANTES DE SALVAR NO PAGAMENTO = "
                + valorOrcamento);

        this.pagamentoRepository.save(p);
    }

    // Constrói a entidade Solicitacao com base no DTO recebido do front-end.
    private Solicitacao setarSolicitacao(Solicitacao s,SolicitacaoDto solicitacaoDto) {
      //tirei o long id para nao sobrescrever

        if(solicitacaoDto.getFuncionario()!=null){
          //evita que o null subscreva o que ja existe
          s.setFuncionario(solicitacaoDto.getFuncionario());               // funcionário atual                                        // id pode ser null (novo)
        }

        if(solicitacaoDto.getCategoria()!=null){
            s.setCategoria(solicitacaoDto.getCategoria());
        }

        if(solicitacaoDto.getCliente()!=null){
            s.setCliente(solicitacaoDto.getCliente());
        }

        if(solicitacaoDto.getDataHoraAbertura()!=null){
            s.setDataHoraAbertura(solicitacaoDto.getDataHoraAbertura());
        }

        if(solicitacaoDto.getDescricaoEquipamento()!=null){
            s.setDescricaoEquipamento(solicitacaoDto.getDescricaoEquipamento());
        }

        if(solicitacaoDto.getDescricaoDefeito()!=null){
            s.setDescricaoDefeito(solicitacaoDto.getDescricaoDefeito());
        }

        if(solicitacaoDto.getMotivoRejeicao()!=null){
            s.setMotivoRejeicao(solicitacaoDto.getMotivoRejeicao());
        }

        if(solicitacaoDto.getOrcamento()!=null){
            s.setOrcamento(solicitacaoDto.getOrcamento());
        }

        if(solicitacaoDto.getStatus()!=null){
            s.setStatus(solicitacaoDto.getStatus());
        }
        return s;  // retorna entidade pronta para persistência
    }

    // Converte String → Date no formato dd-MM-yyyy HH:mm:ss
    public Date formatarData(String data) {
        try {
            DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return formatter.parse(data);        // tenta converter
        } catch (ParseException exp) {
            exp.printStackTrace();
            return null;
        }
    }
}
