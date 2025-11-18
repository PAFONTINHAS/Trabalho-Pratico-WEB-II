package com.mmtads.backend.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "historico")
@NoArgsConstructor
@AllArgsConstructor
public class Historico {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_historico") 
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss", timezone = "America/Sao_Paulo")
    @Column(name = "data_hora", nullable = false)
    private Date dataHora;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name="observacao")
    private String observacao;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "funci_origem", referencedColumnName = "id")
    private Funcionario funciOrigem;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "funci_destino", referencedColumnName = "id")
    private Funcionario funciDestino;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_solicitacao", referencedColumnName = "id_solicitacao")
    private Solicitacao solicitacao;
}
