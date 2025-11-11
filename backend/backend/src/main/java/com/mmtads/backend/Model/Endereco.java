package com.mmtads.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "endereco")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco") 
    private int id_endereco;

    @Column(length = 9, nullable = false)
    private String cep;

    @Column(length = 100, nullable = false)
    private String logradouro;

    @Column(length = 10)
    private String numero;

    @Column(length = 50, nullable = false)
    private String cidade;

    @Column(length = 2, nullable = false)
    private String estado;

    @OneToOne(mappedBy = "endereco")
    private Cliente cliente;

    /**
     * @return the id_endereco
     */
    public int getId_endereco() {
        return id_endereco;
    }

    /**
     * @param id_endereco the id_endereco to set
     */
    public void setId_endereco(int id_endereco) {
        this.id_endereco = id_endereco;
    }

    /**
     * @return the cep
     */
    public String getCep() {
        return cep;
    }

    /**
     * @param cep the cep to set
     */
    public void setCep(String cep) {
        this.cep = cep;
    }

    /**
     * @return the logradouro
     */
    public String getLogradouro() {
        return logradouro;
    }

    /**
     * @param logradouro the logradouro to set
     */
    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    /**
     * @return the numero
     */
    public String getNumero() {
        return numero;
    }

    /**
     * @param numero the numero to set
     */
    public void setNumero(String numero) {
        this.numero = numero;
    }

    /**
     * @return the cidade
     */
    public String getCidade() {
        return cidade;
    }

    /**
     * @param cidade the cidade to set
     */
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    /**
     * @return the estado
     */
    public String getEstado() {
        return estado;
    }

    /**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }
}
