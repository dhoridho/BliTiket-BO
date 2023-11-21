import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzinPetugasComponent } from './izin-petugas/izin-petugas.component';
import { KepegawaianComponent } from './kepegawaian.component';
import { PetugasComponent } from './petugas/petugas.component';
import { ShiftTugasComponent } from './shift-tugas/shift-tugas.component';

const routes: Routes = [
  {
    path: '',
    component: KepegawaianComponent,
    children: [
        {
            path: 'petugas',
            component: PetugasComponent
        },
        {
            path: 'izin-petugas',
            component: IzinPetugasComponent
        },
        {
            path: 'shift-tugas',
            component: ShiftTugasComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KepegawaianRouting { }
