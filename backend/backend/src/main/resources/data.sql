/* USE manutencaoequipamentos;

-- Categorias
INSERT IGNORE INTO categoria (nome) VALUES ('Notebook');
INSERT IGNORE INTO categoria (nome) VALUES ('Desktop');
INSERT IGNORE INTO categoria (nome) VALUES ('Impressora');
INSERT IGNORE INTO categoria (nome) VALUES ('Mouse');
INSERT IGNORE INTO categoria (nome) VALUES ('Teclado');

-- Usuários
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'joao@email.com',
    'João Gomes',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    'CLIENTE',
    FALSE
);
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'jose@email.com',
    'José da Silva',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    'CLIENTE',
    FALSE
);
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'joana@email.com',
    'Joana de Deus',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    'CLIENTE',
    FALSE
);
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'joaquina@email.com',
    'Joaquina Maria',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f4a2b3c4d5e6',
    'CLIENTE',
    FALSE
);
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'maria@email.com',
    'Maria Moura',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    'FUNCIONARIO',
    FALSE
);
INSERT IGNORE INTO usuarios (email, nome, senha_hash, senha_salt, role, is_delete)
VALUES (
    'mario@email.com',
    'Mario Montes',
    '7ea5c4daea1f3db18fc616cc72e64ec85786e674df3ce116efdcee1e4eafba10',
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    'FUNCIONARIO',
    FALSE
);

-- Clientes
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('111.111.111-11', '(41) 99999-0000', 'Rua 123', 1);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('222.222.222-22', '(42) 99999-0000', 'Rua 123', 2);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('333.333.333-33', '(43) 99999-0000', 'Rua 123', 3);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('444.444.444-44', '(44) 99999-0000', 'Rua 123', 4);

-- Funcionarios
INSERT IGNORE INTO funcionario (data_nasc, id)
VALUES ('1995-05-20', 5); -- Maria Moura
INSERT IGNORE INTO funcionario (data_nasc, id)
VALUES ('1995-06-21', 6); -- Mario Montes

-- ********* SOLICITAÇÕES CORRIGIDAS E NOVAS COM RECEITA *********

-- Solicitacao 1 (ID 1 - ABERTA) - Notebook (Categoria 1)
INSERT IGNORE INTO solicitacao (id_solicitacao, descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura)
VALUES (
    1,
    'Notebook Dell Inspiron',
    'Não liga, LED da bateria piscando.',
    1, -- Notebook
    'ABERTA',
    2, -- José da Silva
    6, -- Mario Montes
    '2025-09-01 10:00:00'
);

-- Solicitacao 2 (ID 2 - ORCADA) - Impressora (Categoria 3)
INSERT IGNORE INTO solicitacao (id_solicitacao, descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura)
VALUES (
    2,
    'Impressora Epson L3150',
    'Não reconhece cartuchos e falha na impressão.',
    3, -- Impressora
    'ORCADA',
    1, -- João Gomes
    5, -- Maria Moura
    '2025-09-05 15:30:00'
);

-- NOVO DADO: Solicitacao 3 (ID 3 - PAGA) - Notebook (Categoria 1) - Receita para o Relatório
INSERT IGNORE INTO solicitacao (id_solicitacao, descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura)
VALUES (
    3,
    'Notebook Samsung Book',
    'Troca de tela.',
    1, -- Notebook
    'PAGA',
    3, -- Joana de Deus
    5, -- Maria Moura
    '2025-09-15 09:00:00'
);

-- NOVO DADO: Solicitacao 4 (ID 4 - PAGA) - Desktop (Categoria 2) - Receita para o Relatório
INSERT IGNORE INTO solicitacao (id_solicitacao, descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura)
VALUES (
    4,
    'Desktop Gamer RGB',
    'Limpeza e troca de pasta térmica.',
    2, -- Desktop
    'PAGA',
    4, -- Joaquina Maria
    6, -- Mario Montes
    '2025-09-20 14:00:00'
);

-- NOVO DADO: Solicitacao 5 (ID 5 - PAGA) - Mouse (Categoria 4) - Receita Adicional
INSERT IGNORE INTO solicitacao (id_solicitacao, descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario, data_hora_abertura)
VALUES (
    5,
    'Mouse Logitech MX Master',
    'Botão esquerdo falhando.',
    4, -- Mouse
    'PAGA',
    1, -- João Gomes
    5, -- Maria Moura
    '2025-10-01 08:00:00'
);

-- ********* ORÇAMENTOS *********

-- Orçamento para Solicitação 2 (ORCADA)
INSERT IGNORE INTO orcamento (id_orcamento, id_solicitacao, id_funcionario, valor, data_hora)
VALUES (
    1,
    2,
    5,
    180.00,
    '2025-09-06 10:00:00'
);

-- Orçamento para Solicitação 3 (PAGA)
INSERT IGNORE INTO orcamento (id_orcamento, id_solicitacao, id_funcionario, valor, data_hora)
VALUES (
    2,
    3,
    5,
    350.00,
    '2025-09-16 11:00:00'
);

-- Orçamento para Solicitação 4 (PAGA)
INSERT IGNORE INTO orcamento (id_orcamento, id_solicitacao, id_funcionario, valor, data_hora)
VALUES (
    3,
    4,
    6,
    150.00,
    '2025-09-21 09:00:00'
);

-- Orçamento para Solicitação 5 (PAGA)
INSERT IGNORE INTO orcamento (id_orcamento, id_solicitacao, id_funcionario, valor, data_hora)
VALUES (
    4,
    5,
    5,
    90.00,
    '2025-10-02 12:00:00'
);

-- ********* PAGAMENTOS (RECEITA) *********

-- Pagamento para Solicitação 3 (R$ 350.00 - Notebook) - Data no meio de Setembro
INSERT IGNORE INTO pagamento (id_pagamento, id_solicitacao, valor, data_hora)
VALUES (
    1,
    3,
    350.00,
    '2025-09-25 10:30:00'
);

-- Pagamento para Solicitação 4 (R$ 150.00 - Desktop) - Data no início de Outubro
INSERT IGNORE INTO pagamento (id_pagamento, id_solicitacao, valor, data_hora)
VALUES (
    2,
    4,
    150.00,
    '2025-10-01 14:00:00'
);

-- Pagamento para Solicitação 5 (R$ 90.00 - Mouse) - Data no início de Outubro
INSERT IGNORE INTO pagamento (id_pagamento, id_solicitacao, valor, data_hora)
VALUES (
    3,
    5,
    90.00,
    '2025-10-01 16:00:00'
); */
USE manutencaoequipamentos;

-- ========================================
-- TABELA ENDERECO (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10),
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA USUARIOS (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(256) NOT NULL,
    senha_salt VARCHAR(64) NOT NULL,
    role VARCHAR(20) NOT NULL,
    is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA CATEGORIA (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    is_delete BOOLEAN DEFAULT FALSE
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA CLIENTE (MODIFICADA)
-- ========================================
-- MUDANÇA 1: Coluna 'endereco' agora é BIGINT (ID) ao invés de VARCHAR(255)
-- MUDANÇA 2: Adicionada FOREIGN KEY para tabela endereco
-- MUDANÇA 3: Removido 'id' próprio, agora usa 'usuario_id' como PK
CREATE TABLE IF NOT EXISTS cliente (
    usuario_id BIGINT PRIMARY KEY,  -- MUDANÇA: Agora é PK diretamente
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    endereco BIGINT,  -- MUDANÇA: De VARCHAR(255) para BIGINT
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (endereco) REFERENCES endereco(id_endereco) ON DELETE SET NULL  -- MUDANÇA: Nova FK
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA FUNCIONARIO (MODIFICADA)
-- ========================================
-- MUDANÇA: Removido 'id' próprio, agora usa 'usuario_id' como PK (chamado 'id')
-- MUDANÇA: Renomeado 'usuario_id' para 'id' para ser consistente com Cliente
CREATE TABLE IF NOT EXISTS funcionario (
    id BIGINT PRIMARY KEY,  -- MUDANÇA: Antes era AUTO_INCREMENT separado, agora é FK direto
    data_nasc DATE,
    FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA SOLICITACAO (SEM MUDANÇAS)
-- ========================================
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
    FOREIGN KEY (id_cliente) REFERENCES cliente(usuario_id),  -- Referencia usuario_id agora
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA ORCAMENTO (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS orcamento (
    id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitacao INT NOT NULL,
    id_funcionario BIGINT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_hora DATETIME NOT NULL,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA PAGAMENTO (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitacao INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_hora DATETIME NOT NULL,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA MANUTENCAO (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitacao INT NOT NULL,
    descricao_manutencao TEXT,
    orientacao_cliente VARCHAR(150),
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao)
) DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABELA HISTORICO (SEM MUDANÇAS)
-- ========================================
CREATE TABLE IF NOT EXISTS historico (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitacao INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    funci_origem BIGINT,
    funci_destino BIGINT,
    data_hora DATETIME NOT NULL,
    observacao TEXT,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacao(id_solicitacao),
    FOREIGN KEY (funci_origem) REFERENCES funcionario(id),
    FOREIGN KEY (funci_destino) REFERENCES funcionario(id)
) DEFAULT CHARSET=utf8mb4;

