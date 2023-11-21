import { Component, OnInit, Input } from '@angular/core';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { TarifTicketModel } from 'src/app/@core/model/tarif-ticket.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { TarifTiketService } from 'src/app/services/wisata/tarif-tiket/tarif-tiket.service';

@Component({
  selector: 'app-tarif-tiket',
  templateUrl: './tarif-tiket.component.html',
  styleUrls: ['./tarif-tiket.component.scss']
})
export class TarifTiketComponent implements OnInit {
  @Input() tarifTicket = new TarifTicketModel();
  @Input() idTempatWisata: number = 0;
  page: 1;
  offset: 10;
  isLoading = false;

  constructor(private tarifTicketService: TarifTiketService) {
  }

  ngOnInit(): void {
  }

  submitData = () => {
    if (this.tarifTicket.id && this.tarifTicket.id !== 0) {
      this.tarifTicketService.Update(this.tarifTicket).subscribe((resp) => {
        if (resp) {
          const rulesAlert: RulesSweetAlert = {
            title: 'Succes',
            text: 'Berhasil Mengubah Data',
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
        }
      });
    } else {
      this.tarifTicketService.save(this.tarifTicket).subscribe((resp) => {
        if (resp) {
          const rulesAlert: RulesSweetAlert = {
            title: 'Succes',
            text: 'Berhasil Menambah Data',
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
        }
      });
    }
  };
}
