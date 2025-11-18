import { Cliente } from "./cliente_entity";
import { Status } from "../models/enums/status.enum";
import { Funcionario } from "./funcionario_entity";
import { HistoricoStatus } from "./historico_status_entity";
import { Categoria } from "./categoria_entity";

export interface Solicitacao {
    idSolicitacao?: number; // Correção: De 'id' para 'idSolicitacao'
    cliente: Cliente;
    funcionario: Funcionario | null;
    descricaoEquipamento: string; // Correção: De 'equipamento' para 'descricaoEquipamento'
    descricaoDefeito: string; // Correção: De 'defeito' para 'descricaoDefeito'
    categoria?: Categoria | null;
    dataHoraAbertura: string; // Correção: De 'dataSolicitacao' para 'dataHoraAbertura'
    status: Status;
    orcamento?: number | null;
    motivoRejeicao?: string | null;
    funcionarioDestino: Funcionario | null;
}