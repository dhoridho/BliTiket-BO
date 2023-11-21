import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PbbComponent } from './pbb.component';


const routes: Routes = [
  {
    path: '',
    component: PbbComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PbbRoutingModule { }
