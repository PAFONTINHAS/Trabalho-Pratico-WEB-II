import { Cliente } from "./cliente_entity";
import { Status } from "../models/enums/status.enum";
import { Funcionario } from "./funcionario_entity";
import { HistoricoStatus } from "./historico_status_entity";
import { Categoria } from "./categoria_entity";

export interface Solicitacao {


    id?: number;
    cliente: Cliente;
    funcionario: Funcionario | null;
    equipamento: string;
    defeito: string;
    categoria?: Categoria | null;
    dataSolicitacao: string;
    status: Status
    valorOrcamento? : number | null;
    historicoStatus: HistoricoStatus[];


}
