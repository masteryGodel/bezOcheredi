import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
  }, {
    path: 'companies',
    loadChildren: () => import('./pages/companies-page/companies-page.module').then(m => m.CompaniesPageModule)
  }, {
    path: 'masters',
    loadChildren: () => import('./pages/masters-page/masters-page.module').then(m => m.MastersPageModule)
  }, {
    path: 'auth', loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
