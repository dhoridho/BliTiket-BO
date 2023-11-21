import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WisataComponent } from './wisata.component';

const routes: Routes = [
  {
    path: '',
    component: WisataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WisataRoutingModule { }
