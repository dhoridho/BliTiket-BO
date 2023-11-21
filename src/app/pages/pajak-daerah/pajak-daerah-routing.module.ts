import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PajakDaerahComponent } from './pajak-daerah.component';


const routes: Routes = [
  {
    path: '',
    component: PajakDaerahComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PajakDaerahRoutingModule { }
