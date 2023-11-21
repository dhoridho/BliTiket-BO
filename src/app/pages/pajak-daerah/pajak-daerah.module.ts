import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PajakDaerahComponent } from './pajak-daerah.component';
import { PajakDaerahRoutingModule } from './pajak-daerah-routing.module';



@NgModule({
  declarations: [
    PajakDaerahComponent
  ],
  imports: [
    CommonModule,
    PajakDaerahRoutingModule
  ]
})
export class PajakDaerahModule { }
