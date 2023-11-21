import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftPetugasService {

  constructor(private gService: GlobalService) { }

  getAllData = (page: number, offset:number) => {
    return this.gService.Get('shift-tugas', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (shiftData: any) => {
    return this.gService.Post('shift-tugas', shiftData);
  }

  Update =(shiftData: any) =>{
    return this.gService.Put(`shift-tugas/${shiftData.id}`, shiftData);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`shift-tugas`, id);
  }
}
