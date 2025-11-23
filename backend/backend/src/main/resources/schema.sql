USE manutencaoequipamentos;

/*CREATE TABLE IF NOT EXISTS endereco (
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

-- Tabelas que dependem APENAS da tabela usuarios
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

--Tabela solicitacao (Depende de Cliente, Funcionário e Categoria)
CREATE TABLE IF NOT EXISTS solicitacao (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    id_funcionario BIGINT, -- Pode ser NULL
    id_categoria INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    descricao_equipamento VARCHAR(100),
    descricao_defeito TEXT,
    motivo_rejeicao TEXT,
    data_hora_abertura DATETIME NOT NULL,
    valor_orcamento DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) DEFAULT CHARSET=utf8mb4;

-- Tabelas Dependentes da Solicitação e Funcionário
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
    data_hora DATETIME NOT NULL, -- Corrigido para DATETIME, BIGINT é incomum para data/hora
    observacao TEXT,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
    FOREIGN KEY (funci_origem) REFERENCES funcionario(id),
    FOREIGN KEY (funci_destino) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;
*/

-- ========================================
-- INSERÇÃO DE DADOS
-- ========================================

-- Inserir Categorias
INSERT IGNORE INTO categoria (nome) VALUES
('Notebook'),
('Desktop'),
('Impressora'),
('Mouse'),
('Teclado');

-- Inserir Usuários
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete) VALUES
('joao@email.com', 'João Gomes', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6', 'CLIENTE', FALSE),
('jose@email.com', 'José da Silva', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6', 'CLIENTE', FALSE),
('joana@email.com', 'Joana de Deus', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6', 'CLIENTE', FALSE),
('joaquina@email.com', 'Joaquina Maria', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f4a2b3c4d5e6', 'CLIENTE', FALSE),
('maria@email.com', 'Maria Moura', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6', 'FUNCIONARIO', FALSE),
('mario@email.com', 'Mario Montes', '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10', 'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6', 'FUNCIONARIO', FALSE);

-- Inserir Endereços
-- MUDANÇA: Nova tabela, dados antes estavam direto em cliente
INSERT INTO endereco (logradouro, numero, cidade, estado, cep) VALUES
('Rua das Flores', '123', 'Curitiba', 'PR', '80000-000'),
('Rua dos Pinheiros', '456', 'Curitiba', 'PR', '80420-000'),
('Av. Brasil', '789', 'Curitiba', 'PR', '80610-000'),
('Rua XV de Novembro', '321', 'Curitiba', 'PR', '80020-000');

-- Inserir Clientes
-- MUDANÇA: Agora endereco recebe ID (1, 2, 3, 4) ao invés de texto ('Rua 123')
-- MUDANÇA: usuario_id é usado como PK, não há mais coluna 'id' separada
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id) VALUES
('111.111.111-11', '(41) 99999-0000', 1, 1),  -- endereco = 1 (ID do endereço)
('222.222.222-22', '(42) 99999-0000', 2, 2),  -- endereco = 2 (ID do endereço)
('333.333.333-33', '(43) 99999-0000', 3, 3),  -- endereco = 3 (ID do endereço)
('444.444.444-44', '(44) 99999-0000', 4, 4);  -- endereco = 4 (ID do endereço)

-- Inserir Funcionários
-- MUDANÇA: 'id' agora é o próprio usuario_id, não é AUTO_INCREMENT
INSERT IGNORE INTO funcionario (data_nasc, id) VALUES
('1995-05-20', 5),  -- id = 5 (corresponde ao usuario_id 5)
('1995-06-21', 6);  -- id = 6 (corresponde ao usuario_id 6)


-- Inserir Solicitações
INSERT IGNORE INTO solicitacao (descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura, valor_orcamento, is_delete) VALUES
('Notebook Dell Inspiron', 'Não liga, LED da bateria piscando.', 1, 'ABERTA', 2, null, '2025-09-01 10:00:00', null, false),
('Impressora Epson L3150', 'Não reconhece cartuchos e falha na impressão.', 3, 'ORCADA', 1, 5, '2025-09-05 15:30:00', 350.00, false),
('Notebook Samsung Book', 'Troca de tela.', 1, 'PAGA', 3, 5, '2025-09-15 09:00:00', 150.00, false),
('Desktop Gamer RGB', 'Limpeza e troca de pasta térmica.', 2, 'FINALIZADA', 4, 6, '2025-09-20 14:00:00', 90.00, false),
('Mouse Logitech MX Master', 'Botão esquerdo falhando.', 4, 'PAGA', 1, 5, '2025-10-01 08:00:00', null, false),
('Mouse Sem Fio HP 150', 'Scroll não funciona direito .', 4, 'ARRUMADA', 1, 5, '2025-10-03 10:31:00', null, false);


-- Inserir Pagamentos
INSERT IGNORE INTO pagamento ( id_solicitacao, valor, data_hora) VALUES
( 3, 350.00, '2025-09-25 10:30:00'),
( 4, 150.00, '2025-10-01 14:00:00'),
( 5, 90.00, '2025-10-01 16:00:00');

INSERT IGNORE INTO historico (id_solicitacao, funci_origem, status, data_hora, funci_destino) VALUES 
(1, null, 'ABERTA', '2025-09-01 10:00:00', null),
(2, null, 'ABERTA', '2025-09-05 10:30:00', null),
(2, 5, 'ORCADA', '2025-09-05 15:30:00', null),
(3, null, 'ABERTA', '2025-09-15 09:00:00', null),
(3, 5, 'ORCADA', '2025-09-15 11:00:00', null),
(3, null, 'APROVADA', '2025-09-15 16:00:00', null),
(3, 5, 'ARRUMADA', '2025-09-16 14:20:00', null),
(3, null, 'PAGA', '2025-09-17 09:00:00', null),
(4, null, 'ABERTA', '2025-09-20 14:00:00', null),
(4, 6, 'ORCADA', '2025-09-21 09:44:00', null),
(4, null, 'APROVADA', '2025-09-21 15:23:00', null),
(4, 6, 'ARRUMADA', '2025-09-26 09:00:00', null),
(4, null, 'PAGA', '2025-09-29 13:33:00', null),
(4, 6, 'FINALIZADA', '2025-09-29 15:14:00', null),
(5, null, 'ABERTA', '2025-10-01 08:00:00', null),
(5, 5, 'ORCADA', '2025-10-01 09:00:00', null),
(5, null, 'APROVADA', '2025-10-03 17:52:00', null),
(5, 5, 'REDIRECIONADA', '2025-10-04 11:42:00', 6),
(5, 6, 'ARRUMADA', '2025-10-07 09:45:00', null),
(5, null, 'PAGA', '2025-10-08 10:30:00', null),
(6, null, 'ABERTA', '2025-10-03 10:31:00', null),
(6, 6, 'ORCADA', '2025-10-03 16:00:00', null),
(6, null, 'REJEITADA', '2025-10-04 08:42:00', null),
(6, null, 'APROVADA', '2025-10-06 11:35:00', 6),
(6, 6, 'ARRUMADA', '2025-10-10 09:48:00', null);
