import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from '../services/AuthServices/authservice.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    Email: '',
    Password: ''
  });


  constructor(private fb: FormBuilder, private rest : AuthserviceService) { }

  ngOnInit(): void {
  }


  submit(): void{
    this.rest.login(this.form.getRawValue());
  }

}
