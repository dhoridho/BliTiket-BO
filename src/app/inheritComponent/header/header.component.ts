import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { UserService } from 'src/app/services/user-management/user.service';
import { WisataService } from 'src/app/services/wisata/wisata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  email = localStorage.getItem('email');
  tipeUser = localStorage.getItem('tipe_user');
  currentUser: any;
  namaWisata: string;
  namaLokasi: string;
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private lokasiService: LokasiService,
    private wisataService: WisataService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.getWisata();
    this.getLokasi();
  }

  expandMenu() {
    let html:any = document.querySelector('html')
    if(html) {
      html?.classList?.add('layout-transitioning')
      html?.classList?.add('layout-menu-expanded')
      setInterval(() => {
        html?.classList?.remove('layout-transitioning')
      }, 1000)
    }
  }

  getLokasi = () => {
    if (this.currentUser.tipe_user === 4) {
      this.lokasiService.getById(this.currentUser.id_lokasi).subscribe(
        resp => {
          this.namaLokasi = resp.data.nama_lokasi;
        }
      );
    }
  }

  getWisata = () => {
    if (this.currentUser.tipe_user === 5) {
      this.wisataService.getById(this.currentUser.id_tempat_wisata).subscribe(
        resp => {
          this.namaWisata = resp.data.nama_tempat_wisata;
        }
      );
    }
  }

  logout = () => {
    this.AuthService.logout().subscribe(
      data => {
        if(data){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigate(['/login']);
        }
      }
      );
  }

}
