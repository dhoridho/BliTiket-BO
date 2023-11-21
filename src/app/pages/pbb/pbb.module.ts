import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PbbComponent } from './pbb.component';
import { PbbRoutingModule } from './pbb-routing.module';



@NgModule({
  declarations: [
    PbbComponent
  ],
  imports: [
    CommonModule,
    PbbRoutingModule
  ]
})
export class PbbModule { }
