import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { JenisPendapatanService } from 'src/app/services/wisata/jenis-pendapatan.service';
import { ActionPendapatanComponent } from './action-pendapatan/action-pendapatan.component';

@Component({
  selector: 'app-jenis-pendapatan',
  templateUrl: './jenis-pendapatan.component.html',
  styleUrls: ['./jenis-pendapatan.component.scss']
})
export class JenisPendapatanComponent implements OnInit {
  @Input() idTempatWisata: number;
  @Input() jenisPendapatanLength: any;
  @Input() jenisPendapatan: any[];
  @Input() refreshData: any;

  constructor(
    private dialog: MatDialog,
    private jenisPendapatanService: JenisPendapatanService
  ) { }

  ngOnInit(): void {}

  action =  (value: any) => {
    const dialogRef = this.dialog.open(ActionPendapatanComponent, {
      width : '800px',
      maxHeight: '100vh',
      data : value
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          const rulesAlert: RulesSweetAlert = {
            title: 'Berhasil',
            text: result,
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
        }
      }
    );
  }
}
