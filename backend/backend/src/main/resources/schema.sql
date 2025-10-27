--USE manutencaoequipamentos;

/*CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(256) NOT NULL,
  senha_salt VARCHAR(64) NOT NULL,
  role VARCHAR(20) NOT NULL,
  is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS endereco (
  id_endereco INT AUTO_INCREMENT PRIMARY KEY,
  cep VARCHAR(9) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(10),
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(2) NOT NULL
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cliente (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  endereco VARCHAR(255),
  telefone VARCHAR(20),
  usuario_id BIGINT UNIQUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS funcionario (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  data_nasc DATE,
  usuario_id BIGINT UNIQUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS solicitacao (
  id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente BIGINT NOT NULL,
  id_funcionario BIGINT,
  id_categoria INT NOT NULL,
  status VARCHAR(30) NOT NULL,
  descricao_equipamento VARCHAR(100),
  descricao_defeito TEXT,
  motivo_rejeicao TEXT,
  data_hora_abertura DATETIME NOT NULL,
  FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
  FOREIGN KEY (id_cliente) REFERENCES cliente(id),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orcamento (
  id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  id_funcionario BIGINT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_hora DATETIME NOT NULL,
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
  FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pagamento (
  id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_hora DATETIME NOT NULL,
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS manutencao (
  id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  descricao_manutencao TEXT,
  orientacao_cliente VARCHAR(150),
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS historico (
  id_historico INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  status VARCHAR(30) NOT NULL,
  funci_origem BIGINT,
  funci_destino BIGINT,
  data_hora BIGINT NOT NULL,
  observacao TEXT,
  FOREIGN KEY (funci_destino) REFERENCES funcionario(id),
  FOREIGN KEY (funci_origem) REFERENCES funcionario(id),
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;
*/
USE manutencaoequipamentos;

--mudança da ordem de create table para criação da chave estrangeira corretamente

CREATE TABLE IF NOT EXISTS endereco (
  id_endereco INT AUTO_INCREMENT PRIMARY KEY,
  cep VARCHAR(9) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(10),
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(2) NOT NULL
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(256) NOT NULL,
  senha_salt VARCHAR(64) NOT NULL,
  role VARCHAR(20) NOT NULL,
  is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

---

-- Dependem APENAS da tabela usuarios

CREATE TABLE IF NOT EXISTS cliente (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  endereco VARCHAR(255), 
  telefone VARCHAR(20),
  usuario_id BIGINT UNIQUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS funcionario (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  data_nasc DATE,
  usuario_id BIGINT UNIQUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8mb4;

---

-- Depende de Cliente, Funcionário e Categoria

CREATE TABLE IF NOT EXISTS solicitacao (
  id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente BIGINT NOT NULL,
  id_funcionario BIGINT, -- Pode ser NULL, pois é opcional no início
  id_categoria INT NOT NULL,
  status VARCHAR(30) NOT NULL,
  descricao_equipamento VARCHAR(100),
  descricao_defeito TEXT,
  motivo_rejeicao TEXT,
  data_hora_abertura DATETIME NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id),
  FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) DEFAULT CHARSET=utf8mb4;

---

-- Dependentes da Solicitação

CREATE TABLE IF NOT EXISTS orcamento (
  id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  id_funcionario BIGINT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_hora DATETIME NOT NULL,
  -- CHAVES ESTRANGEIRAS
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
  FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pagamento (
  id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_hora DATETIME NOT NULL,
  -- CHAVE ESTRANGEIRA
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS manutencao (
  id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  descricao_manutencao TEXT,
  orientacao_cliente VARCHAR(150),
  -- CHAVE ESTRANGEIRA
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS historico (
  id_historico INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitacao INT NOT NULL,
  status VARCHAR(30) NOT NULL,
  funci_origem BIGINT,
  funci_destino BIGINT,
  data_hora BIGINT NOT NULL,
  observacao TEXT,
  -- CHAVES ESTRANGEIRAS
  FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
  FOREIGN KEY (funci_origem) REFERENCES funcionario(id),
  FOREIGN KEY (funci_destino) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;