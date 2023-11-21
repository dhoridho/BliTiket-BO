import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaksiComponent } from './transaksi.component';

const routes: Routes = [
  {
    path: '',
    component: TransaksiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiRoutingModule { }
