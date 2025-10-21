/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mmtads.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

/**
 *
 * @author gabriela
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario")
public class Usuario {
    
    @Id()
    @Column(name="idUsuario")
    private Long id;

    @Column(name="nome", nullable = false, length = 100)
    private String nome;

    @Column(name="email", nullable = false, length = 100, unique = true)
    private String email;
    
    @Column(name="telefone", length = 20)
    private String telefone;
    
    @Column(name="senhaHash", length = 256, nullable = false)
    private String senhaHash;
    
    @Column(name="senhaSalt", length = 64, nullable = false)
    private String senhaSalt;
    
    @Column(name="isDelete")
    private boolean isDelete = false;
    
    @Column(name="tipo", nullable = false)
    private String tipo;
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
     * @return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the telefone
     */
    public String getTelefone() {
        return telefone;
    }

    /**
     * @param telefone the telefone to set
     */
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    /**
     * @return the senhaHash
     */
    public String getSenhaHash() {
        return senhaHash;
    }

    /**
     * @param senhaHash the senhaHash to set
     */
    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    /**
     * @return the senhaSalt
     */
    public String getSenhaSalt() {
        return senhaSalt;
    }

    /**
     * @param senhaSalt the senhaSalt to set
     */
    public void setSenhaSalt(String senhaSalt) {
        this.senhaSalt = senhaSalt;
    }

    /**
     * @return the isDeleted
     */
    public boolean isIsDeleted() {
        return isDelete;
    }

    /**
     * @param isDeleted the isDeleted to set
     */
    public void setIsDeleted(boolean isDeleted) {
        this.isDelete = isDeleted;
    }

    /**
     * @return the tipo
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * @param tipo the tipo to set
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    
}   
