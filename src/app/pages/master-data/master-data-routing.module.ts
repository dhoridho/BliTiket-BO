import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HariLiburComponent } from '../hari-libur/hari-libur.component';
import { LokasiComponent } from '../lokasi/lokasi.component';
import { AcaraComponent } from './acara/acara.component';
import { JenisPembayaranComponent } from './jenis-pembayaran/jenis-pembayaran.component';
import { KendaraanComponent } from './kendaraan/kendaraan.component';
import { RekanDukunganComponent } from './rekan-dukungan/rekan-dukungan.component';
import { WisataMendatangComponent } from './wisata-mendatang/wisata-mendatang.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kendaraan',
        component: KendaraanComponent
      },
      {
        path: 'acara',
        component: AcaraComponent
      },
      {
        path: 'rekan-dukungan',
        component: RekanDukunganComponent
      },
      {
        path: 'lokasi',
        component: LokasiComponent
      },
      {
        path: 'hari-libur',
        component: HariLiburComponent
      },
      {
        path: 'wisata-mendatang',
        component: WisataMendatangComponent
      },
      {
        path: 'jenis-pembayaran',
        component: JenisPembayaranComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
