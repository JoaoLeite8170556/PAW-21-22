import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FuncionariosComponent
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
