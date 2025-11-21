package com.mmtads.backend.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@PrimaryKeyJoinColumn(name="id")
@Table(name = "funcionario")
@JsonIgnoreProperties(ignoreUnknown = true) // This allows unknown properties
public class Funcionario extends Usuario{

    @Column(name="dataNasc", nullable = false)
    private Date data_nasc;

    @JsonIgnore
    @OneToMany(mappedBy = "funciOrigem")
    private Set<Historico> historicoOrigem;

    @JsonIgnore
    @OneToMany(mappedBy = "funciDestino")
    private Set<Historico> historicoDestino;


    public Funcionario() {
    }

    public Funcionario(Date data_nasc) {
        this.data_nasc = data_nasc;
    }


    public Date getData_nasc() {
        return data_nasc;
    }

    public void setData_nasc(Date data_nasc) {
        this.data_nasc = data_nasc;
    }

    /**
     * @return the historicoOrigem
     */
    public Set<Historico> getHistoricoOrigem() {
        return historicoOrigem;
    }

    /**
     * @param historicoOrigem the historicoOrigem to set
     */
    public void setHistoricoOrigem(Set<Historico> historicoOrigem) {
        this.historicoOrigem = historicoOrigem;
    }

    /**
     * @return the historicoDestino
     */
    public Set<Historico> getHistoricoDestino() {
        return historicoDestino;
    }

    /**
     * @param historicoDestino the historicoDestino to set
     */
    public void setHistoricoDestino(Set<Historico> historicoDestino) {
        this.historicoDestino = historicoDestino;
    }
}
