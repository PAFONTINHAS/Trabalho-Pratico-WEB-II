package com.mmtads.backend.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitacao")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSolicitacao")
    private Long idSolicitacao;

    @Column(name = "descricaoEquipamento", nullable = false, length = 100)
    private String descricaoEquipamento;

    @Column(name = "descricaoDefeito", columnDefinition = "TEXT")
    private String descricaoDefeito;

    @Column(name = "motivoRejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;

    @Column(name = "dataHoraAbertura", nullable = false)
    private LocalDateTime dataHoraAbertura;

    // 🔗 Relacionamentos com outras tabelas
    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "idFuncionario")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "idStatus", nullable = false)
    private Status status;

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
}
