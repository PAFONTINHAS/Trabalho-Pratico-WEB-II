import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service/login';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const usuarioLogado = loginService.usuarioLogado;
  if (usuarioLogado) {
    if (route.data?.['perfil'] && route.data?.['perfil'].indexOf(usuarioLogado.perfil) === -1) {
      router.navigate(['/login'],
        { queryParams: { error: 'Acesso negado!' } });
      return false;
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { error: "Você deve realizar login antes de acessar essa página" } });
  
  return false;
};
