import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class RealisasiService {

  constructor(private gService: GlobalService) { }

  Get = (param: any) => {
    return this.gService.Get('realisasi', param);
  }

  GetTotalRealisasi = () => {
    return this.gService.Get('realisasi/total-realisasi');
  }

  Save = (realisasi: any) => {
    return this.gService.PostWithFormData('realisasi', realisasi);
  }

  Edit = (realisasi: any, id: number) => {
    return this.gService.PostWithFormData(`realisasi/${id}`, realisasi);
  }
}
