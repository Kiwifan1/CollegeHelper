import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

export const questionnaireGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('qc') === 'true' || true) {
    return true;
  } else {
    router.navigate(['/register']);
    return false;
  }
};
