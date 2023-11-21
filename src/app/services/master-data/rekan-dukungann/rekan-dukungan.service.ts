import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class RekanDukunganService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (param: any) => {
    return this.gService.Get('rekan-dan-dukungan', param);
  }

  save = (body: any) => {
    return this.gService.PostWithFormData('rekan-dan-dukungan', body);
  }

  Update =(body: any, id:number) =>{
    return this.gService.PostWithFormData(`rekan-dan-dukungan/${id}`, body);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`rekan-dan-dukungan`, id);
  }
}
