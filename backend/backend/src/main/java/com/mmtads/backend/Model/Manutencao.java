package com.mmtads.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "manutencao")
@NoArgsConstructor
@AllArgsConstructor
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_manutencao") 
    private Long idManutencao;

    @OneToOne
    @JoinColumn(name = "id_solicitacao", nullable = false) 
    private Solicitacao solicitacao;

    @Column
    private String descricaoManutencao;

    @Column
    private String orientacaoCliente;
    
}
