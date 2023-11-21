import { WisataService } from './../../services/wisata/wisata.service';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TransaksiModel } from 'src/app/@core/model/transaksi.model';
import { TransaksiService } from 'src/app/services/transaksi/transaksi.service';
import * as XLSX from 'xlsx';
import { FilterTransaksiModel } from 'src/app/@core/model/filter-transaksi.model';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.scss']
})
export class TransaksiComponent implements OnInit {
  page = 1;
  offset = 10;
  totalData = 0;
  transaksi: any;
  totalPendapatan: any;
  sortType = 'asc';
  sortBy = '';
  wisata: any [] = [];
  petugas: any [] = [];
  sortedData: TransaksiModel[];
  filterTransaksi: FilterTransaksiModel = new FilterTransaksiModel();
  panelOpenState = false;

  constructor(
    private PetugasService: PetugasService,
    private tranksasiService: TransaksiService,
    public datepipe: DatePipe,
    private wisataService: WisataService
  ) { }

  ngOnInit(): void {
    this.getAllTransaksi();
    this.getAllWisata();
    this.getAllPetugas();
  }

  getAllWisata = () => {
    this.wisataService.getAllData().subscribe(
      (resp)=>{
        this.convertDataSelectTwo(resp.data);
      }
    );
  }
  getAllPetugas = () => {
    this.PetugasService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        let data = resp.data;
        data.forEach((element: any) => {
          const newData: any = {
              options: [
                  { value: element.id, label: element.nama }
              ]
          };
          this.petugas.push(newData);
        });
      }
    );
  }

  convertDataSelectTwo = (data: any) => {
    data.forEach((element: any) => {
      const newData: any = {
          options: [
              { value: element.id, label: element.nama_tempat_wisata }
          ]
      };
      this.wisata.push(newData);
    });
  }

  search(text: string) {
    this.wisata = text
        ? (JSON.parse(JSON.stringify(this.wisata)) as Select2Option[]).filter(
              option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : JSON.parse(JSON.stringify(this.wisata));
  }

  update(key: string, event: Select2UpdateEvent<any>) {
    this.filterTransaksi.idTempatWisata = event.value;

  }
  
  searchPetugas(text: string) {
    this.petugas = text
        ? (JSON.parse(JSON.stringify(this.wisata)) as Select2Option[]).filter(
              option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : JSON.parse(JSON.stringify(this.wisata));
  }

  updatePetugas(key: string, event: Select2UpdateEvent<any>) {
    this.filterTransaksi.idPetugas = event.value;

  }

  getAllTransaksi = (event: any = false) => {
    if (event) {
      this.page = event;
    }
    const param: any = {
      page: this.page,
      offset: this.offset,
      type: this.sortType ? this.sortType : 'asc',
      by:  this.sortBy
    };
    if (this.filterTransaksi.startDate) {
      param.startDate = this.filterTransaksi.startDate;
    }
    if (this.filterTransaksi.endDate) {
      param.endDate = this.filterTransaksi.endDate;
    }
    if (this.filterTransaksi.metodePembayaran) {
      param.metodePembayaran = this.filterTransaksi.metodePembayaran;
    }
    if (this.filterTransaksi.idTempatWisata) {
      param.idTempatWisata = this.filterTransaksi.idTempatWisata;
    }
    if (this.filterTransaksi.idPetugas) {
      param.idPetugas = this.filterTransaksi.idPetugas;
    }
    if (this.filterTransaksi.item) {
      param.item = this.filterTransaksi.item;
    }
    if (this.filterTransaksi.transaction) {
      param.transaction = this.filterTransaksi.transaction;
    }
    this.tranksasiService.getAllData(param).subscribe(
      (resp) => {
        this.transaksi = resp.data;
        this.totalPendapatan =resp.total_pendapatan;
        this.totalData = resp.length;
      }
    );
  }

  jsonImportTemplate: any = {
    transaksi: []
  }

  exportExcel = () => {
    this.jsonImportTemplate.transaksi = [];
    this.appendImportData();
  }

  generateJsonToExcel = () => {
    const filename = "Transaksi.xlsx";
    const workBook = XLSX.utils.book_new();
    const objectMaxLength: any[] = []; 
    for (let i = 0; i < this.jsonImportTemplate.transaksi.length; i++) {
      const value = <any>Object.values(this.jsonImportTemplate.transaksi[i]);
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
    const workSheet1 = XLSX.utils.json_to_sheet(this.jsonImportTemplate.transaksi);
    workSheet1["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet1, 'Transaksi');
    XLSX.writeFile(workBook, filename);
  }

  appendImportData() {
    const param = {
      page: 1,
      offset: 99999,
      startDate: this.filterTransaksi.startDate,
      endDate: this.filterTransaksi.endDate,
      metodePembayaran: this.filterTransaksi.metodePembayaran,
      idTempatWisata: this.filterTransaksi.idTempatWisata,
      type: this.sortType,
      by:  this.sortBy
    };
      this.tranksasiService.getAllData(param).subscribe(
          resp => {
            for(const value of resp.data){
              const tanggal =  value.tanggal !==null ? this.datepipe.transform( value.tanggal, 'EEEE, d MMMM y ') : '-';
              const total_bayar =  value.total_bayar !==null ? 'Rp.' + value.total_bayar : '-';
              const transaksi: TransaksiModel = new TransaksiModel();
              transaksi.nama_tempat_wisata = value.tempat_wisata?.nama_tempat_wisata ? value.tempat_wisata?.nama_tempat_wisata : '-';
              transaksi.tanggal = tanggal;
              transaksi.transaksi = value.email ? 'Website' : 'Loket';
              transaksi.id_transaksi = value.no_transaksi ? value.no_transaksi : '-';
              transaksi.metode = value.metode_pembayaran ? value.metode_pembayaran : '-';
              transaksi.total_bayar = total_bayar;
              transaksi.kontak = value.no_telp ? value.no_telp : '-' ;
              transaksi.email = value.email ?value.email : '-';
              this.jsonImportTemplate.transaksi.push(transaksi);
            }
            this.generateJsonToExcel();
          }
        );
  }

  sortData(sort: Sort) {
    this.sortBy = sort.active;
    this.sortType = sort.direction;
    this.getAllTransaksi();
  }

}


