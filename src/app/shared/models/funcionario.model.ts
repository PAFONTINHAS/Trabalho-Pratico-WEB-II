import { Usuario } from "./usuario.model";

export class Funcionario extends Usuario {
    constructor(
        id: number,
        nome: string,
        email: string,
        public dataNasc: Date = new Date(),
        senha?: string,
    ) {
        super(id, nome, email, senha, 'FUNCIONARIO');
    }
}
