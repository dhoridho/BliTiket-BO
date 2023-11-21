import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class AcaraService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (param: any) => {
    return this.gService.Get('acara', param);
  }

  save = (body: any) => {
    return this.gService.PostWithFormData('acara', body);
  }

  Update =(body: any, id: number) =>{
    return this.gService.PostWithFormData(`acara/${id}`, body);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`acara`, id);
  }
}
