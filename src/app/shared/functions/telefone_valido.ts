import { AbstractControl } from "@angular/forms";

export function telefoneValido(control: AbstractControl): { [key: string]: boolean } | null {
  const telefone = control.value?.replaceAll(/\D/g, '');
  if (telefone && (telefone.length === 10 || telefone.length === 11)) {
    return null;
  }
  return { telefoneInvalido: true };
}
