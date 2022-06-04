import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './services/AuthServices/authservice.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'newbooks', component: BooksComponent },
  { path: 'usedbooks', component: BooksComponent },
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
