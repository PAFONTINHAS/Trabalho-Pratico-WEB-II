import { Usuario } from "../models/usuario.model";

export interface Cliente {

    id: number;
    cpf: string ;
    enderecoCompleto: string ;
    telefone: string;
    usuario: Usuario;

}