import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth-component/auth.guard';
import { BackofficeLayoutsComponent } from './backoffice-layouts.component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeLayoutsComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'realisasi',
                loadChildren: () => import('../../pages/realisasi/realisasi.module').then(m => m.RealisasiModule)
            },
            {
                path: 'retribusi',
                loadChildren: () => import('../../pages/retribusi/retribusi.module').then(m => m.RetribusiModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'pajak-daerah',
                loadChildren: () => import('../../pages/pajak-daerah/pajak-daerah.module').then(m => m.PajakDaerahModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'pbb',
                loadChildren: () => import('../../pages/pbb/pbb.module').then(m => m.PbbModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'bphtb',
                loadChildren: () => import('../../pages/bphtb/bphtb.module').then(m => m.BphtbModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'lokasi',
                loadChildren: () => import('../../pages/lokasi/lokasi.module').then(m => m.LokasiModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'hari-libur',
                loadChildren: () => import('../../pages/hari-libur/hari-libur.module').then(m => m.HariLiburModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'wisata',
                loadChildren: () => import('../../pages/wisata/wisata.module').then(m => m.WisataModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'transaksi',
                loadChildren: () => import('../../pages/transaksi/transaksi.module').then(m => m.TransaksiModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'kepegawaian',
                loadChildren: () => import('../../pages/kepegawaian/kepegawaian.module').then(m => m.KepegawaianModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'master-data',
                loadChildren: () => import('../../pages/master-data/master-data.module').then(m => m.MasterDataModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'user-management',
                loadChildren: () => import('../../pages/user-management/user-management.module').then(m => m.UserManagementModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeLayoutsRoutingModule { }
