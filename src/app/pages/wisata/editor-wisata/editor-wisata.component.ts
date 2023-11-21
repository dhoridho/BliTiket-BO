import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WisataDetailModel } from 'src/app/@core/model/wisata-detail.model';
import { WisataModel } from 'src/app/@core/model/wisata.model';
import { WisataService } from 'src/app/services/wisata/wisata.service';

@Component({
  selector: 'app-editor-wisata',
  templateUrl: './editor-wisata.component.html',
  styleUrls: ['./editor-wisata.component.scss']
})
export class EditorWisataComponent implements OnInit {
  page: 1;
  offset: 10;
  wisata = new WisataDetailModel();
  wisataData = new WisataModel();

  constructor(
   private wisataService: WisataService,
   @Inject(MAT_DIALOG_DATA) public data: WisataModel,
   public dialogRef: MatDialogRef<EditorWisataComponent>
  ) {
    if(data){
      this.wisataData = data;
    }
  }
  
  ngOnInit(): void {
    this.getWisataById();
  }

  getWisataById = () => {
    this.wisataService.getById(this.wisataData.id).subscribe(
      (resp)=> {
        this.wisata = resp.data;
        if(!this.wisata.tarif_tiket) {
          this.wisata.tarif_tiket = {
            id: 0,
            id_tempat_wisata: this.wisata.id,
            tarif_weekend: 0,
            tarif_weekday: 0,
            quota: 0
          };
        }

        if(!this.wisata.toilet) {
          this.wisata.toilet = {
            id: 0,
            kode_toilet: '',
            id_tempat_wisata: 0,
            quota: 0,
            tarif: 0
          };
        }
      }
    );
  }

}
