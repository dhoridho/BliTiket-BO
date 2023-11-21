import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class LokasiService {

  constructor(private gService: GlobalService) { }

  getAllData = (page = 0, offset = 0) => {
    return this.gService.Get('lokasi', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }
  
  getById = (id: number) => {
    return this.gService.Get('lokasi/' + id);
  }

  save = (lokasi: any) => {
    return this.gService.Post('lokasi', lokasi);
  }

  Update =(lokasi: any) =>{
    return this.gService.Put(`lokasi/${lokasi.id}`, lokasi);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`lokasi`, id);
  }
}
