import { FilterRealisasiModel } from './../../@core/model/filter-realisasi.model';
import { DatePipe } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionRealisasiComponent } from './action-realisasi/action-realisasi.component';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RealisasiService } from 'src/app/services/realisasi/realisasi.service';
import * as XLSX from 'xlsx';
import { RealiasiModel } from 'src/app/@core/model/realisasi.model';

@Component({
  selector: 'app-realisasi',
  templateUrl: './realisasi.component.html',
  styleUrls: ['./realisasi.component.scss']
})
export class RealisasiComponent implements OnInit {
  totalPRealisasi = {
    total_transfer: 0,
    total_cash: 0,
    total_non_cash: 0,
    balance: 0,
    total_pendapatan: 0
  }
  labelFilter ={
    hariIni: 'Hari Ini',
    tahunIni: 'Tahun Ini',
    rentanTanggal: 'Rentang Tanggal'
  }
  totalRealisasi = 0
  tipeUser: any =   1
  realisasi: any[] = [];
  filterRealisasi= new FilterRealisasiModel()
  realisasiExport = new RealiasiModel()
  page = 1;
  offset = 5;
  constructor(
    private dialog: MatDialog,
    private realisasiService: RealisasiService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.tipeUser = localStorage.getItem('tipe_user');
    this.getRealisasi();
  }

  jsonImportTemplate: any = {
    realisasi: []
  }

  exportExcel = () => {
    this.jsonImportTemplate.realisasi = [];
    this.appendImportData();
  }

  generateJsonToExcel() {
    const filename = "Realisasi.xlsx";
    const workBook = XLSX.utils.book_new();
    const objectMaxLength: any[] = []; 
    for (let i = 0; i < this.jsonImportTemplate.realisasi.length; i++) {
      const value = <any>Object.values(this.jsonImportTemplate.realisasi[i]);
      for (let j = 0; j < value.length; j++) {
        if (typeof value[j] == "number") {
          objectMaxLength[j] = 10;
        } else {
          if(value[j]){
          objectMaxLength[j] =
            objectMaxLength[j] >= value[j].length
              ? objectMaxLength[j]
              : value[j].length;
          }else{
            objectMaxLength[j] = 15;
          }
        }
      }
    }
    const wscols = [
      { wch: objectMaxLength[0] },
      { wch: objectMaxLength[1] },
      { wch: objectMaxLength[2] }, 
      { wch: objectMaxLength[3] }, 
      { wch: objectMaxLength[4] },
      { wch: objectMaxLength[5] }, 
      { wch: objectMaxLength[6] }, 
      { wch: objectMaxLength[7] }, 
      { wch: objectMaxLength[8] },
      { wch: objectMaxLength[9] }
    ];
    const workSheet1 = XLSX.utils.json_to_sheet(this.jsonImportTemplate.realisasi);
    workSheet1["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet1, 'Realisasi');
    XLSX.writeFile(workBook, filename);
  }

  appendImportData() {
    const param = {
      page: 1,
      offset: 999999,
      type: this.filterRealisasi.type,
      startDate: this.filterRealisasi.startDate,
      endDate: this.filterRealisasi.endDate
    };
    this.realisasiService.Get(param).subscribe(
        resp => {
          for(const value of resp.data){
            const tanggal_transfer =  value.tanggal_transfer !==null ? this.datepipe.transform( value.tanggal_transfer, 'EEEE, d MMMM y ') : '-';
            const total_transfer =  value.total_transfer !==null ? 'Rp.' + value.total_transfer : '-';
            const realisasi: RealiasiModel = new RealiasiModel();
            realisasi.no_ref = value.no_ref ? value.no_ref : '-';
            realisasi.penerima = value.penerima ? value.penerima : '-';
            realisasi.tanggal_transfer = tanggal_transfer;
            realisasi.total_transfer = total_transfer;
            this.jsonImportTemplate.realisasi.push(realisasi);
          }
          this.generateJsonToExcel();
        }
      );
}

  onAdd = (value= null) => {
    const dialogRef = this.dialog.open(ActionRealisasiComponent, {
      width : '800px',
      maxHeight: '100vh',
      data: value
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.getRealisasi();
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

  getRealisasi = (event: any = false) =>{
    const date = new Date();
    if (event) {
      this.page = event;
    }

    if(this.filterRealisasi.type === 1){
      this.filterRealisasi.startDate = new Date().getFullYear() + '01-01';
      this.filterRealisasi.endDate = new Date().getFullYear() + '12-31';
    }

    if(this.filterRealisasi.type === 2){
      this.filterRealisasi.startDate = this.datepipe.transform(date, "yyyy-MM-dd");
      this.filterRealisasi.endDate = this.datepipe.transform(date, "yyyy-MM-dd");
    }

    if(this.filterRealisasi.type === 3){
      this.filterRealisasi.startDate = this.filterRealisasi.startDate;
      this.filterRealisasi.endDate = this.filterRealisasi.endDate;
    }

    const param = {
      page: this.page,
      offset: this.offset,
      type:this.filterRealisasi.type,
      startDate: this.filterRealisasi.startDate,
      endDate: this.filterRealisasi.endDate
    };
    this.realisasiService.Get(param).subscribe(
      resp => {
        this.realisasi = resp.data;
        this.totalRealisasi = resp.length;
        this.totalPRealisasi = {
          total_non_cash: resp.total_non_cash,
          total_cash: resp.total_cash,
          total_transfer: resp.total_transfer,
          balance: resp.balance,
          total_pendapatan: resp.total_pendapatan
        };
      }
    );
  }

  sortData(sort: Sort) {
    
  }

}
