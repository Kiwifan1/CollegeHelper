import { CanActivateFn } from '@angular/router';

export const validationGuard: CanActivateFn = (route, state) => {
  const currUrl = state.url;

  const fromRegister = currUrl.includes('register');

  if (fromRegister) {
    return true;
  }
  return false;
};
