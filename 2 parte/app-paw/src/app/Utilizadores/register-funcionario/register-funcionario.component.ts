import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from 'src/app/services/UtilizadorServices/utilizador.service';
import {Router} from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators, FormsModule, Form } from '@angular/forms';


@Component({
  selector: 'app-register-funcionario',
  templateUrl: './register-funcionario.component.html',
  styleUrls: ['./register-funcionario.component.css']
})
export class RegisterFuncionarioComponent implements OnInit {

  form: FormGroup;

  submitted= false;

  constructor(private utilizadorService: UtilizadorService, private fp : FormBuilder,private route: Router) {
    this.form = this.fp.group({
      Nome: ['',Validators.required],
      Email: ['',Validators.required,Validators.email],
      Password: ['',Validators.required],
      Morada: ['',Validators.required],
      Genero: ['',Validators.required],
      DataNascimento: ['',Validators.required]
  });
   }

  ngOnInit(): void {
  }

  registFuncionario(){
    this.submitted = true;
    if(!this.form.valid){
      this.utilizadorService.registoFuncionario(this.form.getRawValue()).subscribe((res)=>{
        alert("Registo de funcionário efetuado com sucesso");
        setTimeout(()=>this.route.navigate(['']),1000);
      },(err)=>{
        alert("Ocorreu um erro no registo do Funcionário");
      })
    }
   
  }

}
