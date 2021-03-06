import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService) { }



  onLogin(form: NgForm) {
     if (form.invalid) {
       return ;
     }
     console.log('login comp');
     this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit() {
  }

}
