import { Cliente } from "./cliente_entity";
import { Status } from "../models/enums/status.enum";
import { Funcionario } from "./funcionario_entity";
import { Categorias } from "../models/enums/categoria.enum";
import { HistoricoStatus } from "./historico_status_entity";

export interface Solicitacao {


    id?: number;
    cliente: Cliente;
    funcionario: Funcionario | null;
    equipamento: string;
    defeito: string;
    categoria?: Categorias | null;
    dataSolicitacao: string;
    status: Status
    valorOrcamento? : number | null;
    historicoStatus: HistoricoStatus[];


}
