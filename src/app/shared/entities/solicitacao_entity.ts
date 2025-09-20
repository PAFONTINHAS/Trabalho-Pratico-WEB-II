import { Cliente } from "./cliente_entity";
import { Status } from "../models/enums/status.enum";
import { Funcionario } from "../../../../backup/models/funcionario.model";
import { Categoria } from "../models/enums/categoria.enum";
import { HistoricoStatus } from "./historico_status_entity";
import { Equipamento } from "./equipamento_entity";

export interface Solicitacao {


    id: number;
    cliente: Cliente;
    funcionario: Funcionario | null;
    equipamento: string;
    defeito: string;
    categoria: Categoria;
    dataSolicitacao: string;
    status: Status
    valorOrcamento? : number | null;
    historicoStatus: HistoricoStatus[];

    
}