
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilizadorService } from 'src/app/services/UtilizadorServices/utilizador.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() passField:any={
    Email:String,
    Password:String,
    Password2:String
  };
  form : FormGroup;

  constructor(private fp: FormBuilder, private utilizadorService : UtilizadorService,private router:Router,private route : ActivatedRoute) { 

    this.form = this.fp.group({
      Email: new FormControl('',[Validators.required]),
      Password: new FormControl('',[Validators.required]),
      Password2: new FormControl('',[Validators.required])
    })

  }

  ngOnInit(): void {
    this.passField.Email="";
    this.passField.Password="";
    this.passField.Password2="";
  }


  changePassword(){
    if(this.form.get('Password')?.value !== this.form.get('Password2')?.value){
      alert("Atenção as password não coencidem.");
    }else{
      this.utilizadorService.mudarPassword(this.route.snapshot.params['id'],this.passField).subscribe((res)=>{
        alert("Password alterada com sucesso");
        setTimeout(()=>this.router.navigate(['']),1000);
      },(err)=>{
        alert("Erro ao atualizar password");
      })
    }
  }

}
