import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetribusiComponent } from './retribusi.component';


const routes: Routes = [
  {
    path: '',
    component: RetribusiComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetribusiRoutingModule { }
