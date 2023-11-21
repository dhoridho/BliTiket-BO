import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LokasiComponent } from './lokasi.component';


const routes: Routes = [
  {
    path: '',
    component: LokasiComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LokasiRoutingModule { }
