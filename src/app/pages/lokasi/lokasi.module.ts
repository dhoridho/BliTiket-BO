import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokasiComponent } from './lokasi.component';
import { LokasiRoutingModule } from './lokasi-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ActionComponent } from './action/action.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LokasiComponent,
    ActionComponent
  ],
  imports: [
    LokasiRoutingModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgbModule
  ]
})
export class LokasiModule { }
