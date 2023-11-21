import { Component, OnInit, Input } from '@angular/core';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { ToiletModel } from 'src/app/@core/model/toilet.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { ToiletService } from 'src/app/services/wisata/toilet/toilet.service';

@Component({
  selector: 'app-toilet',
  templateUrl: './toilet.component.html',
  styleUrls: ['./toilet.component.scss']
})
export class ToiletComponent implements OnInit {
  @Input() toilet = new ToiletModel();
  @Input() idTempatWisata: number = 0;
  constructor(
    private toiletService: ToiletService
  ) { }

  ngOnInit(): void {
    if (!this.toilet) {
      this.toilet = {
        id: 0,
        kode_toilet: '',
        id_tempat_wisata: this.idTempatWisata,
        quota: 0,
        tarif: 0
      };
    }
  }

  submitData = () => {
    const param = {
      id: this.toilet.id,
      kode_toilet: this.toilet.kode_toilet,
      id_tempat_wisata: this.idTempatWisata,
      tarif: this.toilet.tarif,
      quota: this.toilet.quota
    };
    if(this.toilet.id){
      this.toiletService.Update(param).subscribe(
        (resp) =>{
          if (resp) {
            const rulesAlert: RulesSweetAlert = {
              title: 'Succes',
              text: 'Berhasil Mengubah Data',
              icon: 'success',
              showCancelButton: false
            };
            sweetAlert(rulesAlert);
          }
        }
        );
    }else{
      this.toiletService.save(param).subscribe(
        (resp) =>{
          if (resp) {
            const rulesAlert: RulesSweetAlert = {
              title: 'Succes',
              text: 'Berhasil Menambah Data',
              icon: 'success',
              showCancelButton: false
            };
            sweetAlert(rulesAlert);
          }
        }
      );
    }
  }

}
