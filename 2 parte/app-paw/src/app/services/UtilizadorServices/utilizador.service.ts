import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilizador } from 'src/app/models/utilizador';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  constructor(private http: HttpClient) {}

  allUsers():Observable<Utilizador[]>{
    return this.http.get<Utilizador[]>("http://localhost:3000/users/list");
  }


  registoCliente(utilizador: Utilizador):Observable<Utilizador>{
    return this.http.post<Utilizador>("http://localhost:3000/users/client/register",JSON.stringify(utilizador),httpOptions);
  }

  registoFuncionario(utilizador: Utilizador):Observable<Utilizador>{
    return this.http.post<Utilizador>("http://localhost:3000/users/employee/register",JSON.stringify(utilizador),httpOptions);
  }


  mudarPassword(id:String,password:String):Observable<Utilizador>{
    return this.http.put<Utilizador>("http://localhost:3000/users/editPassword/"+id,JSON.stringify(password),httpOptions);
  }
}
