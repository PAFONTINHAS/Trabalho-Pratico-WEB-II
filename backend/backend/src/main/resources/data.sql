USE manutencaoequipamentos;

INSERT IGNORE INTO categoria (nome) VALUES ('Notebook');
INSERT IGNORE INTO categoria (nome) VALUES ('Desktop');
INSERT IGNORE INTO categoria (nome) VALUES ('Impressora');
INSERT IGNORE INTO categoria (nome) VALUES ('Mouse');
INSERT IGNORE INTO categoria (nome) VALUES ('Teclado');

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
    'c1b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
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

INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('111.111.111-11', '(41) 99999-0000', 'Rua 123', 1);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('222.222.222-22', '(42) 99999-0000', 'Rua 123', 2);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('333.333.333-33', '(43) 99999-0000', 'Rua 123', 3);
INSERT IGNORE INTO cliente (cpf, telefone, endereco, usuario_id)
VALUES ('444.444.444-44', '(44) 99999-0000', 'Rua 123', 4);

INSERT IGNORE INTO funcionario (data_nasc, usuario_id)
VALUES ('1995-05-20', 5);
INSERT IGNORE INTO funcionario (data_nasc, usuario_id)
VALUES ('1995-06-21', 6);

INSERT IGNORE INTO solicitacao (descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario)
VALUES (
    'Notebook Dell Inspiron',
    'Não liga, LED da bateria piscando.',
    1,
    'ABERTA',
    2,
    2
);
INSERT IGNORE INTO solicitacao (descricao_equipamento, descricao_defeito, id_categoria, status, id_cliente, id_funcionario)
VALUES (
    'Impressora Epson L3150',
    'Não reconhece cartuchos e falha na impressão.',
    3,
    'ORCADA',
    1,
    1
);
