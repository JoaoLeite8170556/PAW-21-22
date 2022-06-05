import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import { BooksComponent } from './books/books.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreatebookComponent } from './createbook/createbook.component';
import { RegisterClienteComponent } from './Utilizadores/register-cliente/register-cliente.component';
import { RegisterFuncionarioComponent } from './Utilizadores/register-funcionario/register-funcionario.component';
import { ChangePasswordComponent } from './Utilizadores/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FuncionariosComponent,
    BooksComponent,
    NavBarComponent,
    CreatebookComponent,
    RegisterClienteComponent,
    RegisterFuncionarioComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormBuilder,{provide: JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
