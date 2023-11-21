import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class IzinPetugasService {

  constructor(private gService: GlobalService) { }

  getAllData = (page: number, offset:number) => {
    return this.gService.Get('izin-petugas', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (pegawaiData: any) => {
    return this.gService.Post('izin-petugas', pegawaiData);
  }

  Update =(pegawaiData: any) =>{
    return this.gService.Put(`izin-petugas/${pegawaiData.id}`, pegawaiData);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`izin-petugas`, id);
  }
}
