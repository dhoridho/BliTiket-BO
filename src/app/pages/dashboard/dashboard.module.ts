import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@core/helper/material-module/material.module';
import { Select2Module } from 'ng-select2-component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRouting,
    MaterialModule,
    ReactiveFormsModule,
    Select2Module,
    MatPaginatorModule,
    CarouselModule,
    MatSortModule,
    NgApexchartsModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class DashboardModule { }
