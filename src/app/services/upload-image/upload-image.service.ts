import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private gService: GlobalService
    ) { }

  getByRefType = (refType: string) => {
    return this.gService.GetById('file-asset/getByRef/', refType);
  }

  getByRefTypeAndRef = (refType: string, ref: any) => {
    return this.gService.GetById(`file-asset/getByRef/${refType}/${ref}`);
  }

  getByRefTypeRef = (refType: string, ref: string) => {
    return this.gService.GetById(`file-asset/${refType}`, ref);
  }

  save = (body: any) => {
    return this.gService.PostWithFormData('file-asset', body);
  }

  update = (body: any, id: number) => {
    return this.gService.PostWithFormData(`file-asset/${id}`, body);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`file-asset`, id);
  }
}
