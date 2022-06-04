import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  user:any = {};
  token ="";

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }


  login(data:any):void{
    this.http.post("http://localhost:3000/users/login",data,{
      withCredentials:true,
      headers: this.headers
    }).subscribe((res:any)=>{
      localStorage.setItem('user',JSON.stringify(res));
    });
  }


  verifyToken(): boolean {
    this.user = JSON.parse(localStorage.getItem('user')|| '{}');

    if(Object.keys(this.user).length !== 0){
      this.token = this.user.token;
    }

    if (this.token.length === 0 || this.jwtHelper.isTokenExpired(this.token)) {
      console.log("Sem token ou token expirado!");
      return false;
    }
    console.log("Token válido!");
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let permission = this.verifyToken();

      if(permission === true){
        return true;
      }

      this.router.navigate(['']);
      return false;
    }
}
