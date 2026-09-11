import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products/Games',
    pathMatch: 'full'
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid')
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist')
  }
];
