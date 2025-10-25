package com.mmtads.backend.Model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@PrimaryKeyJoinColumn(name="id")
@Table(name = "funcionario")
public class Funcionario extends Usuario{

    @Column(name="dataNasc", nullable = false)
    private Date data_nasc;

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
    
}
