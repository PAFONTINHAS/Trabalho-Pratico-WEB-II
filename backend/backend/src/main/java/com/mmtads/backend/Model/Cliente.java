package com.mmtads.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
// @PrimaryKeyJoinColumn(name="usuario_id")
@Table(name = "cliente")
@JsonIgnoreProperties(ignoreUnknown = true) // This allows unknown properties
public class Cliente{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "usuario_id", referencedColumnName = "id")
  private Usuario usuario;

  @Column(nullable = false)
  private String cpf;

  @Column(nullable = false)
  private String telefone;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "endereco", referencedColumnName = "id_endereco")
  private Endereco endereco;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public Usuario getUsuario() { return usuario; }
  public void setUsuario(Usuario usuario) { this.usuario = usuario; }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public Endereco getEndereco() {
    return endereco;
  }

  public void setEndereco(Endereco endereco) {
    this.endereco = endereco;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }
}