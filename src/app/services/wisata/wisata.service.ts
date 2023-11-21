import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class WisataService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (page = 1, offset = 999) => {
    return this.gService.Get('tempat-wisata', (page && offset) ? `?limit=${page}&offset=${offset}` : '');
  }

  getById= (id: any) => {
    return this.gService.GetById('tempat-wisata/', id);
  }

  save = (tempatWisata: any) => {
    return this.gService.Post('tempat-wisata', tempatWisata);
  }

  Update =(tempatWisata: any) =>{
    return this.gService.Put(`tempat-wisata/${tempatWisata.id}`, tempatWisata);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`tempat-wisata`, id);
  }
}
