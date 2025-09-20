import { Cliente } from "../../app/shared/entities/cliente_entity";

export const clientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Lima',
    cpf: '123.456.789-00',
    email: 'joao.lima@email.com',
    enderecoCompleto: 'Rua A, 123, Centro, Cidade X - 11111-111',
    telefone: '(11) 99999-9999',
  },
  {
    id: 2,
    nome: 'José Costa',
    cpf: '987.654.321-00',
    email: 'jose.costa@email.com',
    enderecoCompleto: 'Avenida B, 456, Bairro Y, Cidade Z - 22222-222',
    telefone: '(22) 88888-8888',
  },
  {
    id: 3,
    nome: 'Joana Reis',
    cpf: '111.222.333-44',
    email: 'joana.reis@email.com',
    enderecoCompleto: 'Rua C, 789, Vila W, Cidade K - 33333-333',
    telefone: '(33) 77777-7777',
  },
  {
    id: 4,
    nome: 'Joaquina Alves',
    cpf: '444.333.222-11',
    email: 'joaquina.alves@email.com',
    enderecoCompleto: 'Estrada D, 101, Jardim V, Cidade J - 44444-444',
    telefone: '(44) 66666-6666',
  },
];
