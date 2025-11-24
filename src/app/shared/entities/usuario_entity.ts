export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    role?: string; // 'CLIENTE' | 'FUNCIONARIO'
    isDelete?: boolean;
}