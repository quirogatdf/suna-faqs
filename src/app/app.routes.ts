import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { AdminHome } from '../features/admin/admin-home';
import { NewsConfig } from '../features/settings/news-config/news-config';
import { Regulations } from '../features/settings/regulations/regulations';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/admin/admin-home').then((m) => m.AdminHome),
    children: [
      {
        path: 'news-config',
        loadComponent: () => import('../features/settings/news-config/news-config').then((m) => m.NewsConfig),
      },
      {
        path: 'regulations',
        loadComponent: () => import('../features/settings/regulations/regulations').then((m) => m.Regulations),
      },
    ],
  },
  {
    path: 'settings/news-config',
    redirectTo: 'login/news-config',
  },
  {
    path: 'settings/regulations',
    redirectTo: 'login/regulations',
  },
  { path: '**', redirectTo: '/login' },
];
