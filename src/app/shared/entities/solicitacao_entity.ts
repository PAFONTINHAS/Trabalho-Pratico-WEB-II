import { Cliente } from "./cliente_entity";
import { Status } from "../models/enums/status.enum";
import { Funcionario } from "./funcionario_entity";
import { Categoria } from "./categoria_entity";

export interface Solicitacao {
    idSolicitacao?: number;
    cliente: Cliente;
    funcionario: Funcionario | null;
    descricaoEquipamento: string;
    descricaoDefeito: string;
    categoria?: Categoria | null;
    dataHoraAbertura: string;
    status: Status;
    orcamento?: number | null;
    motivoRejeicao?: string | null;
    funcionarioDestino: Funcionario | null;
}