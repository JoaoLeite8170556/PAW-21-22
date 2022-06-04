import { Component, OnInit } from '@angular/core';
import { Utilizador } from '../models/utilizador';
import { UtilizadorService } from '../services/UtilizadorServices/utilizador.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})

export class FuncionariosComponent implements OnInit {

  allUsers: Utilizador[]=[];
  constructor(private rest:UtilizadorService) { }

  ngOnInit(): void {
    this.rest.allUsers().subscribe((res:any)=>{
    this.allUsers = res['users'];
    })
  }

}
