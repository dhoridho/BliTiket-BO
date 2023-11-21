import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BphtbComponent } from './bphtb.component';
import { BphtbRoutingModule } from './bphtb-routing.module';



@NgModule({
  declarations: [
    BphtbComponent
  ],
  imports: [
    CommonModule,
    BphtbRoutingModule
  ]
})
export class BphtbModule { }
