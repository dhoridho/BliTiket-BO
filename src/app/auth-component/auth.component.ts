import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.route.navigate(['dashboard']);
    }
  }

}
