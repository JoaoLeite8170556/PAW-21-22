import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from '../../services/UtilizadorServices/utilizador.service';
import { Utilizador } from 'src/app/models/utilizador';
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.css']
})
export class RegisterClienteComponent implements OnInit {
  form: FormGroup;

  submitted= false;


  constructor(private utilizadorService : UtilizadorService, private fp : FormBuilder,private route: Router) {

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


  registClient(){
    this.submitted = true;
    if(!this.form.invalid){
      this.utilizadorService.registoCliente(this.form.getRawValue()).subscribe((res)=>{
        alert("Registo de cliente efetuado com sucesso");
        setTimeout(()=>this.route.navigate(['']),1000);
      },(err)=>{
        alert("Ocorreu um erro no registo de Cliente");
      })
    }
  }

}
