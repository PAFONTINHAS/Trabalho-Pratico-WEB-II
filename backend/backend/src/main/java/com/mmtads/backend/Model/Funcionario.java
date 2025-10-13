package com.mmtads.backend.Model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "funcio")
public class Funcionario {
    
    @Id()
    @Column(name="idFuncionario")
    @OneToOne(mappedBy="usuario")
    private Long id;

    @Column(name="cpf", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name="dataNascimento", nullable = false)
    private Date data_nasc;

    public Funcionario() {
    }
    
    public Funcionario(String cpf, Date data_nasc) {
        this.cpf = cpf;
        this.data_nasc = data_nasc;
    }

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the cpf
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * @param cpf the cpf to set
     */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    /**
     * @return the data_nasc
     */
    public Date getData_nasc() {
        return data_nasc;
    }

    /**
     * @param data_nasc the data_nasc to set
     */
    public void setData_nasc(Date data_nasc) {
        this.data_nasc = data_nasc;
    }
    
}
