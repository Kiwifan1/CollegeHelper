import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const userResolver: ResolveFn<any> = (_route, _state) => {
  const authService = inject(AuthService);
  const user = authService.getUserFromServer();
  return user;
};
