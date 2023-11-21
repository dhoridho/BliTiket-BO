import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RealisasiRoutingModule } from './realisasi-routing.module';
import { RealisasiComponent } from './realisasi.component';
import { ActionRealisasiComponent } from './action-realisasi/action-realisasi.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RealisasiComponent,
    ActionRealisasiComponent
  ],
  imports: [
    CommonModule,
    RealisasiRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    NgbModule,
    MatDatepickerModule
  ],
  providers:[
    DatePipe
  ]
})
export class RealisasiModule { }
