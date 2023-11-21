import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { checkEmailFormat, sweetAlert } from 'src/app/inheritComponent/helper/helper';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email!: string;
  password: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  onsubmit(): any{
    let validation = false;
    let text = '';

    if (checkEmailFormat(this.email) == null){
      validation = true;
      text = 'Email tidak sesuai format';
    }else if (!this.password){
      validation = true;
      text = 'Password harus diisi';
    }
    if (validation){
      const rulesAlert: RulesSweetAlert = {
        title: 'Failed',
        text,
        icon: 'error',
        showCancelButton: false
    };
      sweetAlert(rulesAlert);
      return;
    }
    this.authService.login(this.email, this.password).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('tipe_user', data.user.tipe_user);
        this.router.navigate(['dashboard']);
      }
    );
  }

}
