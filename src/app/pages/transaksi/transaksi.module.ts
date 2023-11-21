import { Select2Module } from 'ng-select2-component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TransaksiRoutingModule } from './transaksi-routing.module';
import { TransaksiComponent } from './transaksi.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TransaksiComponent
  ],
  imports: [
    CommonModule,
    TransaksiRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    Select2Module,
    NgbModule
  ],
  providers:[
    DatePipe
  ]
})
export class TransaksiModule { }
