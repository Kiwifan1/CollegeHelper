import { ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  if (localStorage.getItem('user')) {
    return true;
  }
  return false;
};
