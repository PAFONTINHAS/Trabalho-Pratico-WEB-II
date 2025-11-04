import { AbstractControl } from "@angular/forms";

export function cepValido(control: AbstractControl): { [key: string]: boolean } | null {
    const cep = control.value?.replaceAll(/\D/g, '');
    if (cep?.length === 8) {
        return null;
    }
    return { cepInvalido: true };
}