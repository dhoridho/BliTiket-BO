import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class PetugasService {

  constructor(private gService: GlobalService) { }

  getAllData = (page = 0, offset = 0) => {
    return this.gService.Get('pegawai', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (pegawaiData :any) => {
    return this.gService.Post('pegawai', pegawaiData);
  }

  Update =(pegawaiData: any) =>{
    return this.gService.Put(`pegawai/${pegawaiData.id}`, pegawaiData);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`pegawai`, id);
  }
}
