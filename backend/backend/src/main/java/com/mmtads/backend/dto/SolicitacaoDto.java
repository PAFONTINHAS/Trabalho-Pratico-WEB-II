package com.mmtads.backend.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mmtads.backend.Model.Categoria;
import com.mmtads.backend.Model.Cliente;
import com.mmtads.backend.Model.Funcionario;
import com.mmtads.backend.Model.Status;

@JsonIgnoreProperties(ignoreUnknown = true) // This allows unknown propertie
public class SolicitacaoDto {
    private Long idSolicitacao;

    private Cliente cliente;

    private Funcionario funcionario;

    private Categoria categoria;

    private Status status;

    private String descricaoEquipamento;

    private String descricaoDefeito;

    private String motivoRejeicao;

    private Date dataHoraAbertura;

    private Double orcamento;

    private Funcionario funcionarioDestino;

    // Getters e Setters


    public Long getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(Long idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public String getDescricaoEquipamento() {
        return descricaoEquipamento;
    }

    public void setDescricaoEquipamento(String descricaoEquipamento) {
        this.descricaoEquipamento = descricaoEquipamento;
    }

    public String getDescricaoDefeito() {
        return descricaoDefeito;
    }

    public void setDescricaoDefeito(String descricaoDefeito) {
        this.descricaoDefeito = descricaoDefeito;
    }

    public String getMotivoRejeicao() {
        return motivoRejeicao;
    }

    public void setMotivoRejeicao(String motivoRejeicao) {
        this.motivoRejeicao = motivoRejeicao;
    }

    public Date getDataHoraAbertura() {
        return dataHoraAbertura;
    }

    public void setDataHoraAbertura(Date dataHoraAbertura) {
        this.dataHoraAbertura = dataHoraAbertura;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    /**
     * @return the orcamento
     */
    public Double getOrcamento() {
        return orcamento;
    }

    /**
     * @param orcamento the orcamento to set
     */
    public void setOrcamento(Double orcamento) {
        this.orcamento = orcamento;
    }

    /**
     * @return the historico
     */
    public Funcionario getFuncionarioDestino() {
        return funcionarioDestino;
    }

    /**
     * @param historico the historico to set
     */
    public void setFuncionarioDestino(Funcionario funcionarioDestino) {
        this.funcionarioDestino = funcionarioDestino;
    }
}
