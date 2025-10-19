package com.mmtads.backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitacao")
public class SolicitacaoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSolicitacao")
    private Long idSolicitacao;
    
    @Column(name = "descricaoEquipamento", length = 100)
    private String descricaoEquipamento;
    
    @Column(name = "descricaoDefeito", columnDefinition = "TEXT")
    private String descricaoDefeito;
    
    @Column(name = "motivoRejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;
    
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss", timezone = "America/Sao_Paulo")
    @Column(name = "dataHoraAbertura", nullable = false)
    private LocalDateTime dataHoraAbertura;
    
    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private ClienteModel cliente;
    
    @ManyToOne
    @JoinColumn(name = "idFuncionario")
    private Funcionario funcionario;
    
    @ManyToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    private CategoriaModel categoria;
    
    @ManyToOne
    @JoinColumn(name = "idStatus", nullable = false)
    private StatusModel status;
    
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
    
    public LocalDateTime getDataHoraAbertura() {
        return dataHoraAbertura;
    }
    
    public void setDataHoraAbertura(LocalDateTime dataHoraAbertura) {
        this.dataHoraAbertura = dataHoraAbertura;
    }
    
    public ClienteModel getCliente() {
        return cliente;
    }
    
    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }
    
    public Funcionario getFuncionario() {
        return funcionario;
    }
    
    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }
    
    public CategoriaModel getCategoria() {
        return categoria;
    }
    
    public void setCategoria(CategoriaModel categoria) {
        this.categoria = categoria;
    }
    
    public StatusModel getStatus() {
        return status;
    }
    
    public void setStatus(StatusModel status) {
        this.status = status;
    }
}