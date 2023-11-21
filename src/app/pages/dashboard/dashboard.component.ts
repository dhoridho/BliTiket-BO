import { Component, OnInit, ViewChild } from '@angular/core';
import { WisataService } from 'src/app/services/wisata/wisata.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { formatCurrency } from '@angular/common';
import { BulanListModel } from 'src/app/@core/model/bulan-list.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels
} from "ng-apexcharts";
import { ApexGrid, ApexYAxis } from 'ng-apexcharts/lib/model/apex-types';
import { numberPad } from 'src/app/inheritComponent/helper/helper';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsLembaga: Partial<ChartOptions>;
  public chartOptionsPendapatan: Partial<ChartOptions>;
  // bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']; 
  bulanList: BulanListModel; 
  chartLembaga: any;
  chartPendapatan: any;
  type: 'tahun' | 'bulan' | 'minggu' | 'hari' = 'tahun';
  bulan = 0;
  wisata: any [] = [];
  totalLaporanWisata = 10;
  laporanWisataList: any[] = [];
  totalPendapatan: any = {
    Adhimatratama: 0,
    total_pendapatan: 0
  };
  totalPendapatanParkir: any;
  pendapatanByWisata: any[] = [];
  pendapatanPerFasilitas: any = {
    total_booking: 0,
    total_fasilitas: 0,
    total_parkir: 0
  };
  wisataModel= 'Semua Tempat Wisata';
  page = 1;
  offset = 5;
  tipeUser: any =   1;
  canvas: any;

  constructor(
    private wisataService: WisataService,
    private dashboardService: DashboardService
  ) {
    this.chartOptionsLembaga = {
      series: [
        {
          name: "Adhimatrama",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#9155FD'
        }
      ],
      chart: {
        height: 200,
        type: "area",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      yaxis: {
        show: false
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'between',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        labels: {
          rotateAlways: true
        }
      },
      grid: {
        show: false
      }
    };
    this.chartOptionsPendapatan = {
      series: [
        {
          name: "Pendapatan",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#FFA600'
        },
        {
          name: "Tiket",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#C8D2DE'
        }
      ],
      chart: {
        height: 200,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      yaxis: {
        show: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      },
      grid: {
        show: false
      }
    };
  }

  ngOnInit(): void {
    this.tipeUser = localStorage.getItem('tipe_user');
    this.getAll();
    this.filterByMonth();
  }

  getAll = () => {
    this.wisataService.getAllData().subscribe(
      (resp)=>{
        this.convertDataSelectTwo(resp.data);
      }
    );
  }

  getLaporanWisataList = (event: any = null) => {
    if (event) {
      this.page = event;
      // this.offset = event.pageSize;
    }
    this.dashboardService.getLaporanWisataList(this.page, this.offset, this.type).subscribe(
      resp => {
        this.totalLaporanWisata = resp.totalData;
        this.laporanWisataList = resp.data;
      }
    );
  }

  getTotalPendapatan = () => {
    this.dashboardService.getTotalPendapatan(this.type).subscribe(
      resp => {
        this.totalPendapatan = resp.data;
      }
    );
  }

  getTotalPendapatanParkir = () => {
    this.dashboardService.getTotalPendapatanParkir(this.type).subscribe(
      resp => {
        this.totalPendapatanParkir = resp.data;
      }
    );
  }

  getPendapatanWisata = () => {
    this.dashboardService.getPendapatanByWisata(this.type).subscribe(
      resp => {
        this.pendapatanByWisata = resp.data;
      }
    );
  }

  getTotalBagianByWisataId = () => {
    this.dashboardService.getTotalBagianByWisataId().subscribe(
      resp => {
        this.pendapatanPerFasilitas = resp.data[0];
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

  filterByMonth = () => {
    this.getLaporanWisataList();
    this.getTotalPendapatan();
    this.getPendapatanWisata();
    this.getTotalPendapatanParkir();
    if (this.tipeUser == 5) {
      this.getTotalBagianByWisataId();
    }
    this.dashboardService.getTotalPendapatanByFilter(this.type).subscribe(
      (resp) => {
        this.chartOptionsLembaga.series = [
          {
            name: "Pendapatan",
            data: resp.total_pembagian,
            color: '#9155FD'
          }
        ];
        this.chartOptionsPendapatan.series = [
          {
            name: "Pendapatan",
            data: resp.data,
            color: '#FFA600'
          }
        ];

        if (this.type === 'tahun') {
          this.chartOptionsLembaga.xaxis = {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
          };
          this.chartOptionsPendapatan.xaxis = {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
          };
        }
        if (this.type === 'bulan') {
          this.chartOptionsLembaga.xaxis = {
            categories: ['1', '2', '3', '4']
          };
          this.chartOptionsPendapatan.xaxis = {
            categories: ['1', '2', '3', '4']
          };
        }
        if (this.type === 'minggu') {
          this.chartOptionsLembaga.xaxis = {
            type: 'category',
            tickPlacement: 'between',
            categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
          };
          this.chartOptionsPendapatan.xaxis = {
            type: 'category',
            tickPlacement: 'between',
            categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
          };
        }
        if (this.type === 'hari') {
          const array: string[] = [];
          const resData: any[] = [];
          const resDataPembagian: any[] = [];
          let amountPembagian = 0;
          let amount = 0;
          for(let a = 0;a < 24; a++) {
            if (a % 3 === 0) {
              array.push(`${numberPad(a, 2)}:00`);
              resData.push(amount);
              resDataPembagian.push(amountPembagian);
              amountPembagian = 0;
              amount = 0;
            } else {
              amountPembagian += resp.total_pembagian[a] || 0;
              amount += resp.data[a] || 0;
            }
          }
          this.chartOptionsLembaga.series = [
            {
              name: "Pendapatan",
              data: resData,
              color: '#9155FD'
            }
          ];
          this.chartOptionsPendapatan.series = [
            {
              name: "Pendapatan",
              data: resDataPembagian,
              color: '#FFA600'
            }
          ];
          setTimeout(() => {
            this.chartOptionsLembaga.xaxis = {
              type: 'category',
              tickPlacement: 'between',
              categories: array
            };
            this.chartOptionsPendapatan.xaxis = {
              type: 'category',
              tickPlacement: 'between',
              categories: array
            };
          }, 500);
        }
      }
    );
  }

  currencyFormat = (number: any) => {
    return formatCurrency(+number, 'id-ID', 'Rp.');
  }

  modifyValue = (character: string, value: any = '') => {
    return (value.toString()).replace(/[\d_,]+/g, ' ', ' ');
  }

  roundNumber = (number: any) => {
    return Math.ceil(+number);
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  twoDigitDecimal = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
}
