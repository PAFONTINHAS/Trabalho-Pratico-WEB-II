export class Endereco {
  constructor(
    public logradouro: string = "",
    public numero: string = "",
    public cidade: string = "",
    public estado: string = "",
    public cep: string = "",
  ) {}
}