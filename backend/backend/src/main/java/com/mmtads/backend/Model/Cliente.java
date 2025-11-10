package com.mmtads.backend.Model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name="usuario_id")
@Table(name = "cliente")
public class Cliente extends Usuario{

  @Column(nullable = false)
  private String cpf;

  @Column(nullable = false)
  private String telefone;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "endereco", referencedColumnName = "id_endereco")
  private Endereco endereco;

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