-- Insere categorias de equipamentos (para o seu CRUD de Categoria)
INSERT INTO categoria (nome) VALUES ('Notebook');
INSERT INTO categoria (nome) VALUES ('Desktop');
INSERT INTO categoria (nome) VALUES ('Impressora');
INSERT INTO categoria (nome) VALUES ('Monitor');

-- Insere um cliente de exemplo
-- (Aviso: Em produção, a senha nunca deve ser armazenada em texto puro!)
INSERT INTO cliente (cpf, nome, email, telefone, data_nasc, senha)
VALUES ('111.111.111-11', 'João da Silva', 'joao.silva@teste.com', '(11) 99999-0000', '1990-01-15', 'senha123');

-- Insere um funcionário de exemplo
-- (Aviso: Em produção, a senha nunca deve ser armazenada em texto puro!)
INSERT INTO funcionario (nome, email, data_nasc, senha)
VALUES ('Maria Funcionaria', 'maria.func@mmtads.com', '1985-05-20', 'func123');


-- Insere algumas solicitações iniciais para que a tela principal não fique vazia
-- O ID do cliente é 1 (João da Silva)
-- O ID do funcionário é 1 (Maria Funcionaria)

-- Solicitação Aberta (Aguarda Orçamento)
INSERT INTO solicitacao (equipamento, defeito, status, valor_orcamento, historico_status, id_cliente, id_funcionario)
VALUES (
    'Notebook Dell Inspiron', 
    'Não liga, LED da bateria piscando.', 
    'Aberta', 
    NULL, 
    '[{"data": "01/10/2025", "hora": "10:30", "status": "Aberta"}]',
    1, 
    1
);

-- Solicitação Orçada (Aguarda Aprovação do Cliente)
INSERT INTO solicitacao (equipamento, defeito, status, valor_orcamento, historico_status, id_cliente, id_funcionario)
VALUES (
    'Impressora Epson L3150', 
    'Não reconhece cartuchos e falha na impressão.', 
    'Orcada', 
    150.00, 
    '[{"data": "05/10/2025", "hora": "09:00", "status": "Aberta"}, {"data": "06/10/2025", "hora": "14:45", "status": "Orcada"}]',
    1, 
    1
);