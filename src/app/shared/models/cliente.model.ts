import { Endereco } from "./endereco.model";
import { Usuario } from "./usuario.model";

export class Cliente extends Usuario {
    constructor(
        id: number,
        nome: string,
        email: string,
        public cpf: string = "",
        public telefone: string = "",
        public endereco: Endereco = new Endereco(),
        senha?: string,
    ) {
        super(id, nome, email, senha, 'CLIENTE');
    }
}
