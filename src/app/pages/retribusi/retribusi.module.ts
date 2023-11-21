import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetribusiComponent } from './retribusi.component';
import { RetribusiRoutingModule } from './retribubsi-routing.module';



@NgModule({
  declarations: [
    RetribusiComponent
  ],
  imports: [
    CommonModule,
    RetribusiRoutingModule
  ]
})
export class RetribusiModule { }
