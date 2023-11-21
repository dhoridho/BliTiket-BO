import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BphtbComponent } from './bphtb.component';


const routes: Routes = [
  {
    path: '',
    component: BphtbComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BphtbRoutingModule { }
