import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private gService: GlobalService) {}

  getLaporanWisataList = (page: number, offset: number, type: string) => {
    let param: any = { page, offset };
    if (type) {
      param = { page, offset, type };
    }
    return this.gService.Get('dashboard/laporan-wisata-list', param);
  }

  getTotalPendapatanByFilter = (type: 'tahun' | 'bulan' | 'minggu' | 'hari' = 'tahun') => {
    return this.gService.Get(`dashboard/chart-value?type=${type}`);
  }

  getTotalPendapatan = (type: any) => {
    return this.gService.Get('dashboard/total-pendapatan', `?type=${type}`);
  }

  getTotalPendapatanParkir = (type: any) => {
    return this.gService.Get('dashboard/total-pendapatan-parkir', `?type=${type}`);
  }

  getPendapatanByWisata = (type: any) => {
    return this.gService.Get('dashboard/total-bagian-by-wisata',`?type=${type}`);
  }

  getTotalBagianByWisataId = () => {
    return this.gService.Get('dashboard/total-bagian-by-wisata-id');
  }
}
