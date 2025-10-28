USE manutencaoequipamentos;

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
);