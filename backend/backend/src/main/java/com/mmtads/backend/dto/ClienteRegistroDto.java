package com.mmtads.backend.dto;

// Importe as anotações de validação (se estiver usando spring-boot-starter-validation)
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Size;

public class ClienteRegistroDto {

    // @NotEmpty(message = "Nome é obrigatório")
    private String nome;

    // @Email(message = "Email inválido")
    // @NotEmpty(message = "Email é obrigatório")
    private String email;
    
    // @NotEmpty(message = "CPF é obrigatório")
    private String cpf;

    // @NotEmpty(message = "Telefone é obrigatório")
    private String telefone;

    // @NotEmpty(message = "CEP é obrigatório")
    private String cep;
    
    // @NotEmpty(message = "Logradouro é obrigatório")
    private String logradouro;
    
    // @NotEmpty(message = "Número é obrigatório")
    private String numero;
    
    // @NotEmpty(message = "Cidade é obrigatória")
    private String cidade;
    
    // @NotEmpty(message = "UF é obrigatório")
    // @Size(min = 2, max = 2)
    private String uf;

    // Getters e Setters
    
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }
}