import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirección opcional
  {
    path: 'home',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login').then((m) => m.Login),
  },
  { path: '**', redirectTo: '/login' }, // ruta wildcard opcional
];
