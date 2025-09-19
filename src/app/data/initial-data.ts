import { Status } from '../shared/models/enums/status.enum';
import { Categoria } from '../shared/models/enums/categoria.enum';

export interface Funcionario {
    id: number;
    nome: string;
    email: string;
    dataNasc: string;
    senha: string;
}

export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    enderecoCompleto: string;
    telefone: string;
}

export interface HistoricoStatus {
    data: string;
    hora: string;
    status: string;
}

export interface Solicitacao {
    id: number;
    cliente: Cliente;
    funcionario?: Funcionario | null;
    equipamento: string;
    defeito: string;
    categoria: Categoria;
    dataSolicitacao: string;
    status: Status;
    valorOrcamento?: number;
    historicoStatus: HistoricoStatus[];
}

// Conjunto de dados iniciais

export const funcionarios: Funcionario[] = [
    { id: 1, nome: 'Maria Silva', email: 'maria.silva@empresa.com', dataNasc: '15/05/1990', senha: 'senha123'},
    { id: 2, nome: 'Mario Souza', email: 'mario.souza@empresa.com', dataNasc: '22/08/1985', senha: 'senha456'}
];

export const clientes: Cliente[] = [
    { id: 1, nome: 'João Lima', cpf: '123.456.789-00', email: 'joao.lima@email.com', enderecoCompleto: 'Rua A, 123, Centro, Cidade X - 11111-111', telefone: '(11) 99999-9999'},
    { id: 2, nome: 'José Costa', cpf: '987.654.321-00', email: 'jose.costa@email.com', enderecoCompleto: 'Avenida B, 456, Bairro Y, Cidade Z - 22222-222', telefone: '(22) 88888-8888'},
    { id: 3, nome: 'Joana Reis', cpf: '111.222.333-44', email: 'joana.reis@email.com', enderecoCompleto: 'Rua C, 789, Vila W, Cidade K - 33333-333', telefone: '(33) 77777-7777'},
    { id: 4, nome: 'Joaquina Alves', cpf: '444.333.222-11', email: 'joaquina.alves@email.com', enderecoCompleto: 'Estrada D, 101, Jardim V, Cidade J - 44444-444', telefone: '(44) 66666-6666'}
];

export const solicitacoes: Solicitacao[] = [

    // 4 solicitações ABERTAS

    {
        id: 1,
        cliente: clientes[0],
        funcionario: funcionarios[0],
        equipamento: 'Notebook Dell XPS 13',
        defeito: 'Luzes piscando',
        categoria: Categoria.Notebook,
        dataSolicitacao: '10/09/2025 - 09:30',
        status: Status.Aberta,
        historicoStatus: [
            { data: '10/09/2025', hora: '09:30', status: Status.Aberta }
        ]
    },
    {
        id: 2,
        cliente: clientes[1],
        funcionario: funcionarios[1],
        equipamento: 'Desktop HP Pavilion',
        defeito: 'Não liga',
        categoria: Categoria.Desktop,
        dataSolicitacao: '10/09/2025 - 11:45',
        status: Status.Aberta,
        historicoStatus: [
            { data: '10/09/2025', hora: '11:45', status: Status.Aberta }
        ]
    },
    {
        id: 3,
        cliente: clientes[2],
        funcionario: funcionarios[0],
        equipamento: 'Impressora Epson EcoTank',
        defeito: 'Atolando papel',
        categoria: Categoria.Impressora,
        dataSolicitacao: '11/09/2025 - 14:00',
        status: Status.Aberta,
        historicoStatus: [
            { data: '11/09/2025', hora: '14:00', status: Status.Aberta }
        ]
    },
    {
        id: 4,
        cliente: clientes[3],
        funcionario: funcionarios[1],
        equipamento: 'Mouse Logitech MX Master',
        defeito: 'Botão direito falhando',
        categoria: Categoria.Mouse,
        dataSolicitacao: '11/09/2025 - 16:20',
        status: Status.Aberta,
        historicoStatus: [
            { data: '11/09/2025', hora: '16:20', status: Status.Aberta }
        ]
    },

    // 3 solicitações ORÇADAS
    {
        id: 5,
        cliente: clientes[0],
        funcionario: funcionarios[0],
        equipamento: 'Teclado Redragon',
        defeito: 'Algumas teclas não respondem',
        categoria: Categoria.Teclado,
        dataSolicitacao: '12/09/2025 - 10:10',
        status: Status.Orcada,
        valorOrcamento: 150.00,
        historicoStatus: [
            { data: '12/09/2025', hora: '10:10', status: Status.Aberta },
            { data: '13/09/2025', hora: '11:00', status: Status.Orcada,}
        ]
    },
    {
        id: 6,
        cliente: clientes[1],
        funcionario: funcionarios[1],
        equipamento: 'Notebook Acer Aspire',
        defeito: 'Tela com listras horizontais',
        categoria: Categoria.Notebook,
        dataSolicitacao: '12/09/2025 - 12:30',
        status: Status.Orcada,
        valorOrcamento: 450.00,
        historicoStatus: [
            { data: '12/09/2025', hora: '12:30', status: Status.Aberta },
            { data: '13/09/2025', hora: '14:00', status: Status.Orcada}
        ]
    },
    {
        id: 7,
        cliente: clientes[2],
        funcionario: funcionarios[0],
        equipamento: 'Desktop Alienware',
        defeito: 'Superaquecimento',
        categoria: Categoria.Desktop,
        dataSolicitacao: '13/09/2025 - 15:00',
        status: Status.Orcada,
        valorOrcamento: 600.00,
        historicoStatus: [
            { data: '13/09/2025', hora: '15:00', status: Status.Aberta },
            { data: '14/09/2025', hora: '10:15', status: Status.Orcada,}
        ]
    },

// 3 solicitações APROVADAS
    {
        id: 8,
        cliente: clientes[3],
        funcionario: funcionarios[1],
        equipamento: 'Impressora HP Laserjet',
        defeito: 'Manchas na impressão',
        categoria: Categoria.Impressora,
        dataSolicitacao: '13/09/2025 - 17:30',
        status: Status.Aprovada,
        valorOrcamento: 250.00,
        historicoStatus: [
            { data: '13/09/2025', hora: '17:30', status: Status.Aberta },
            { data: '14/09/2025', hora: '11:30', status: Status.Orcada,},
            { data: '15/09/2025', hora: '09:00', status: Status.Aprovada }
        ]
    },
    {
        id: 9,
        cliente: clientes[0],
        funcionario: funcionarios[0],
        equipamento: 'Mouse Razer Deathadder',
        defeito: 'Sensor com falhas',
        categoria: Categoria.Mouse,
        dataSolicitacao: '14/09/2025 - 08:00',
        status: Status.Aprovada,
        valorOrcamento: 120.00,
        historicoStatus: [
            { data: '14/09/2025', hora: '08:00', status: Status.Aberta },
            { data: '15/09/2025', hora: '14:00', status: Status.Orcada,},
            { data: '16/09/2025', hora: '10:00', status: Status.Aprovada }
        ]
    },
    {
        id: 10,
        cliente: clientes[1],
        funcionario: funcionarios[1],
        equipamento: 'Teclado Mecânico HyperX',
        defeito: 'Botão de espaço emperrado',
        categoria: Categoria.Teclado,
        dataSolicitacao: '14/09/2025 - 10:40',
        status: Status.Aprovada,
        valorOrcamento: 300.00,
        historicoStatus: [
            { data: '14/09/2025', hora: '10:40', status: Status.Aberta },
            { data: '15/09/2025', hora: '09:20', status: Status.Orcada,},
            { data: '15/09/2025', hora: '15:10', status: Status.Aprovada }
        ]
    },

// 3 solicitações REJEITADAS para o RF003c
    {
        id: 11,
        cliente: clientes[2],
        funcionario: funcionarios[0],
        equipamento: 'Notebook Apple MacBook Pro',
        defeito: 'Problema na bateria',
        categoria: Categoria.Notebook,
        dataSolicitacao: '15/09/2025 - 13:00',
        status: Status.Rejeitada,
        valorOrcamento: 800.00,
        historicoStatus: [
            { data: '15/09/2025', hora: '13:00', status: Status.Aberta },
            { data: '16/09/2025', hora: '10:00', status: Status.Orcada,},
            { data: '16/09/2025', hora: '16:30', status: Status.Rejeitada }
        ]
    },
    {
        id: 12,
        cliente: clientes[3],
        funcionario: funcionarios[1],
        equipamento: 'Desktop Lenovo Ideacentre',
        defeito: 'Não dá boot',
        categoria: Categoria.Desktop,
        dataSolicitacao: '15/09/2025 - 14:50',
        status: Status.Rejeitada,
        valorOrcamento: 400.00,
        historicoStatus: [
            { data: '15/09/2025', hora: '14:50', status: Status.Aberta },
            { data: '16/09/2025', hora: '11:10', status: Status.Orcada,},
            { data: '17/09/2025', hora: '17:00', status: Status.Rejeitada }
        ]
    },
    {
        id: 13,
        cliente: clientes[0],
        funcionario: funcionarios[0],
        equipamento: 'Impressora Brother',
        defeito: 'Não reconhece cartucho',
        categoria: Categoria.Impressora,
        dataSolicitacao: '16/09/2025 - 09:00',
        status: Status.Rejeitada,
        valorOrcamento: 180.00,
        historicoStatus: [
            { data: '16/09/2025', hora: '09:00', status: Status.Aberta },
            { data: '17/09/2025', hora: '10:00', status: Status.Orcada,},
            { data: '17/09/2025', hora: '12:00', status: Status.Rejeitada }
        ]
    },

// 3 solicitações ARRUMADAS para o RF003d
    {
        id: 14,
        cliente: clientes[1],
        funcionario: funcionarios[1],
        equipamento: 'Mouse Corsair',
        defeito: 'Scroll quebrado',
        categoria: Categoria.Mouse,
        dataSolicitacao: '16/09/2025 - 11:20',
        status: Status.Arrumada,
        valorOrcamento: 90.00,
        historicoStatus: [
            { data: '16/09/2025', hora: '11:20', status: Status.Aberta },
            { data: '17/09/2025', hora: '13:00', status: Status.Orcada },
            { data: '18/09/2025', hora: '15:40', status: Status.Aprovada },
            { data: '18/09/2025', hora: '16:00', status: Status.Arrumada }
        ]
    },
    {
        id: 15,
        cliente: clientes[2],
        funcionario: funcionarios[0],
        equipamento: 'Teclado Ducky One 2',
        defeito: 'LEDs com defeito',
        categoria: Categoria.Teclado,
        dataSolicitacao: '17/09/2025 - 14:00',
        status: Status.Arrumada,
        valorOrcamento: 220.00,
        historicoStatus: [
            { data: '17/09/2025', hora: '14:00', status: Status.Aberta },
            { data: '18/09/2025', hora: '10:00', status: Status.Orcada, },
            { data: '18/09/2025', hora: '14:00', status: Status.Aprovada },
            { data: '19/09/2025', hora: '09:00', status: Status.Arrumada }
        ]
    },
    {
        id: 16,
        cliente: clientes[3],
        funcionario: funcionarios[1],
        equipamento: 'Notebook HP Spectre',
        defeito: 'Porta USB não funciona',
        categoria: Categoria.Notebook,
        dataSolicitacao: '17/09/2025 - 16:30',
        status: Status.Arrumada,
        valorOrcamento: 350.00,
        historicoStatus: [
            { data: '17/09/2025', hora: '16:30', status: Status.Aberta },
            { data: '18/09/2025', hora: '11:00', status: Status.Orcada, },
            { data: '19/09/2025', hora: '15:00', status: Status.Aprovada },
            { data: '19/09/2025', hora: '16:00', status: Status.Arrumada }
        ]
    },

    // 2 solicitações REDIRECIONADAS para o RF015
    {
        id: 17,
        cliente: clientes[0],
        funcionario: funcionarios[0],
        equipamento: 'Desktop Custom',
        defeito: 'Problema na fonte de energia',
        categoria: Categoria.Desktop,
        dataSolicitacao: '18/09/2025 - 10:00',
        status: Status.Redirecionada,
        valorOrcamento: 500.00,
        historicoStatus: [
            { data: '18/09/2025', hora: '10:00', status: Status.Aberta },
            { data: '19/09/2025', hora: '14:00', status: Status.Orcada, },
            { data: '19/09/2025', hora: '15:00', status: Status.Aprovada },
            { data: '20/09/2025', hora: '09:00', status: Status.Redirecionada, }
        ]
    },
    {
        id: 18,
        cliente: clientes[1],
        funcionario: funcionarios[1],
        equipamento: 'Impressora Canon',
        defeito: 'Não imprime cores',
        categoria: Categoria.Impressora,
        dataSolicitacao: '18/09/2025 - 12:00',
        status: Status.Redirecionada,
        valorOrcamento: 200.00,
        historicoStatus: [
            { data: '18/09/2025', hora: '12:00', status: Status.Aberta },
            { data: '19/09/2025', hora: '09:00', status: Status.Orcada,},
            { data: '19/09/2025', hora: '11:00', status: Status.Aprovada },
            { data: '20/09/2025', hora: '14:00', status: Status.Redirecionada, }
        ]
    },

    // 2 solicitações PAGAS
    {
        id: 19,
        cliente: clientes[2],
        funcionario: funcionarios[0],
        equipamento: 'Mouse Multilaser',
        defeito: 'Clique duplo',
        categoria: Categoria.Mouse,
        dataSolicitacao: '19/09/2025 - 15:00',
        status: Status.Paga,
        valorOrcamento: 80.00,
        historicoStatus: [
            { data: '19/09/2025', hora: '15:00', status: Status.Aberta },
            { data: '20/09/2025', hora: '10:00', status: Status.Orcada, },
            { data: '20/09/2025', hora: '14:00', status: Status.Aprovada },
            { data: '21/09/2025', hora: '11:00', status: Status.Arrumada },
            { data: '21/09/2025', hora: '15:00', status: Status.Paga }
        ]
    },
    {
        id: 20,
        cliente: clientes[3],
        funcionario: funcionarios[1],
        equipamento: 'Teclado Razer Huntsman',
        defeito: 'Teclas presas',
        categoria: Categoria.Teclado,
        dataSolicitacao: '20/09/2025 - 11:00',
        status: Status.Paga,
        valorOrcamento: 400.00,
        historicoStatus: [
            { data: '20/09/2025', hora: '11:00', status: Status.Aberta },
            { data: '21/09/2025', hora: '10:00', status: Status.Orcada, },
            { data: '21/09/2025', hora: '14:00', status: Status.Aprovada },
            { data: '22/09/2025', hora: '12:00', status: Status.Arrumada },
            { data: '22/09/2025', hora: '16:00', status: Status.Paga }
        ]
    },
];