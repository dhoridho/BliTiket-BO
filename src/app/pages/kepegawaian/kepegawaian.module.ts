import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetugasComponent } from './petugas/petugas.component';
import { ActionComponent } from './petugas/action/action.component';
import { ActionComponentIzin } from './izin-petugas/action/action.component';
import { KepegawaianComponent } from './kepegawaian.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { KepegawaianRouting } from './kepegawaian-routing.module';
import { IzinPetugasComponent } from './izin-petugas/izin-petugas.component';
import { ShiftTugasComponent } from './shift-tugas/shift-tugas.component';
import { ActionShiftComponent } from './shift-tugas/action/action.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Select2Module } from 'ng-select2-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PetugasComponent,
    ActionComponent,
    ActionComponentIzin,
    ActionShiftComponent,
    KepegawaianComponent,
    IzinPetugasComponent,
    ShiftTugasComponent
  ],
  imports: [
    CommonModule,
    KepegawaianRouting,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    Select2Module,
    NgbModule
  ]
})
export class KepegawaianModule { }
