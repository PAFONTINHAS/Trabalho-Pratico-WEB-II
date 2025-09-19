import { Status } from "./enums/status.enum";
import { Equipamento } from "./equipamento.model";
import { Funcionario } from "./funcionario.model";

export class Solicitacao {
    constructor(
        public id: number = 0,
        public equipamento: Equipamento = new Equipamento(),
        public status: Status = Status.Aberta,
        public data: Date = new Date(),
        public orcamento: number = 0,
        public funcionario: Funcionario = new Funcionario(),
        public defeito: string = "",
        public cliente: string = "",
        public dataSolicitacao: string = "",
        public descricaoEquipamento: string = ""
      // historicoStatus: HistoricoStatus[];
    ) {}
}
