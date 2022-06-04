import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './services/AuthServices/authservice.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'funcionarios', component: FuncionariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
