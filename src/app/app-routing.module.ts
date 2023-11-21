import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-component/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>  import('./auth-component/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./layouts/backoffice-layouts/backoffice-layouts.module').then(m => m.BackofficeLayoutsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
