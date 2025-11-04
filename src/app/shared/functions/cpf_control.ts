import { AbstractControl } from "@angular/forms";

export function cpfValido(control: AbstractControl): { [key: string]: boolean } | null {
  const cpf = control.value?.replaceAll(/\D/g, '');
  if (cpf?.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalido: true };
  }
  let soma = 0;
  for (let i = 1; i <= 9; i++)
    soma += Number.parseInt(cpf.substring(i - 1, i)) * (11 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number.parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };
  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += Number.parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number.parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };
  return null;
}