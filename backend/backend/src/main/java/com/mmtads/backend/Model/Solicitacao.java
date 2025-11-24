package com.mmtads.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "solicitacao")
@JsonIgnoreProperties(ignoreUnknown = true) // This allows unknown properties
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitacao") 
    private Long idSolicitacao;


    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false) 
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "descricao_equipamento", length = 100)
    private String descricaoEquipamento;

    @Column(name = "descricao_defeito", columnDefinition = "TEXT")
    private String descricaoDefeito;

    @Column(name = "motivo_rejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;

    @Column(name = "data_hora_abertura", nullable = false)
    private Date dataHoraAbertura;

    @Column(name="valor_orcamento")
    private Double valorOrcamento;

    @Column(name="isDelete")
    private boolean isDelete = false;

    @JsonIgnore
    @OneToMany(mappedBy = "solicitacao")
    private Set<Historico> historico;


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
        return valorOrcamento;
    }

    /**
     * @param orcamento the orcamento to set
     */
    public void setOrcamento(Double orcamento) {
        this.valorOrcamento = orcamento;
    }
}