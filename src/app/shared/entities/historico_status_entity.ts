import { Status } from '../models/enums/status.enum';
import { Funcionario } from '../models/funcionario.model';

export interface HistoricoStatus {
     dataHora: string; 
     status: Status;    
     funciOrigem: Funcionario
}