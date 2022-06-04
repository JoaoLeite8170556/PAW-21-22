import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilizador } from 'src/app/models/utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  constructor(private http: HttpClient) {}

  allUsers():Observable<Utilizador[]>{
    return this.http.get<Utilizador[]>("http://localhost:3000/users/list");
  }
}
