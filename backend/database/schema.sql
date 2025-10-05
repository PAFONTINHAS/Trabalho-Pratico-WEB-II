
-- CRIAR BANCO: MANUTENCAO_EQUIPAMENTOS

CREATE DATABASE IF NOT EXISTS manutencao_equipamentos;
USE manutencao_equipamentos;


-- TABELA STATUS

CREATE TABLE STATUS (
    idStatus INT AUTO_INCREMENT PRIMARY KEY,
    nomeStatus VARCHAR(30) NOT NULL
);


-- TABELA USUARIO

CREATE TABLE USUARIO (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    senhaHash VARCHAR(256) NOT NULL,
    senhaSalt VARCHAR(64) NOT NULL,
    tipo ENUM('CLIENTE','FUNCIONARIO') NOT NULL,
    isDelete BOOLEAN DEFAULT FALSE
);


-- TABELA ENDERECO

CREATE TABLE ENDERECO (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL
);


-- TABELA CLIENTE

CREATE TABLE CLIENTE (
    idCliente INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    idEndereco INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idEndereco) REFERENCES ENDERECO(idEndereco)
);


-- TABELA FUNCIONARIO

CREATE TABLE FUNCIONARIO (
    idFuncionario INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dataNascimento DATE,
    FOREIGN KEY (idFuncionario) REFERENCES USUARIO(idUsuario)
);


-- TABELA CATEGORIA

CREATE TABLE CATEGORIA (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nomeCategoria VARCHAR(50) NOT NULL,
    isDelete BOOLEAN DEFAULT FALSE
);

-- TABELA SOLICITACAO

CREATE TABLE SOLICITACAO (
    idSolicitacao INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    idFuncionario INT,
    idCategoria INT NOT NULL,
    idStatus INT NOT NULL,
    descricaoEquipamento VARCHAR(100),
    descricaoDefeito TEXT,
    motivoRejeicao TEXT,
    dataHoraAbertura DATETIME NOT NULL,
    FOREIGN KEY (idFuncionario) REFERENCES FUNCIONARIO(idFuncionario),
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente),
    FOREIGN KEY (idStatus) REFERENCES STATUS(idStatus),
    FOREIGN KEY (idCategoria) REFERENCES CATEGORIA(idCategoria)
);

-- TABELA ORCAMENTO

CREATE TABLE ORCAMENTO (
    idOrcamento INT AUTO_INCREMENT PRIMARY KEY,
    idSolicitacao INT NOT NULL,
    idFuncionario INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    dataHora DATETIME NOT NULL,
    FOREIGN KEY (idSolicitacao) REFERENCES SOLICITACAO(idSolicitacao),
    FOREIGN KEY (idFuncionario) REFERENCES FUNCIONARIO(idFuncionario)
);


-- TABEALA PAGAMENTO

CREATE TABLE PAGAMENTO(
    idPagamento INT AUTO_INCREMENT PRIMARY KEY,
    idSolicitacao INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    dataHora DATETIME NOT NULL,
    FOREIGN KEY (idSolicitacao) REFERENCES SOLICITACAO(idSolicitacao)
);

-- TABELA MANUTENCAO

CREATE TABLE MANUTENCAO(
    idManutencao INT AUTO_INCREMENT PRIMARY KEY,
    idSolicitacao INT NOT NULL,
    descricaoManutencao TEXT,
    orientacaoCliente VARCHAR(150),
    FOREIGN KEY (idSolicitacao) REFERENCES SOLICITACAO(idSolicitacao)
);

-- TABELA HISTORICO SOLICITACAO

CREATE TABLE HISTORICO(
    idHistorico INT AUTO_INCREMENT PRIMARY KEY,
    idSolicitacao INT NOT NULL,
    idStatus INT NOT NULL,
    funciOrigem INT,
    funciDestino INT,
    dataHora INT NOT NULL,
    observacao TEXT,
    FOREIGN KEY (funciDestino) REFERENCES FUNCIONARIO(idFuncionario),
    FOREIGN KEY (funciOrigem) REFERENCES FUNCIONARIO(idFuncionario),
    FOREIGN KEY (idSolicitacao) REFERENCES SOLICITACAO(idSolicitacao),
    FOREIGN KEY (idStatus) REFERENCES STATUS(idStatus)
);