import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { LoginComponent } from './login/login.component';
import { CreatebookComponent } from './createbook/createbook.component';
import { RegisterClienteComponent } from './Utilizadores/register-cliente/register-cliente.component'
import { ChangePasswordComponent } from './Utilizadores/change-password/change-password.component';
import { AuthserviceService } from './services/AuthServices/authservice.service';
import {RegisterFuncionarioComponent} from './Utilizadores/register-funcionario/register-funcionario.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'newbooks', component: BooksComponent },
  { path: 'usedbooks', component: BooksComponent },
  { path: 'registerBook',component:CreatebookComponent},
  { path: 'registerClient',component:RegisterClienteComponent},
  { path: 'registerFuncionario',component:RegisterFuncionarioComponent},
  { path: 'updatePassword/:id',component:ChangePasswordComponent},
  {
    path: 'books',
    children: [
      { path: 'all', component: BooksComponent },
      { path: 'new', component: BooksComponent },
      { path: 'used', component: BooksComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
