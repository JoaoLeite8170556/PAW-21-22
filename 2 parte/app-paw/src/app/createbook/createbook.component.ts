import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import { BooksService } from '../services/BooksServices/books.service';
import { Book } from '../models/book';
import { FormBuilder, FormControl, FormGroup, Validators,FormsModule } from '@angular/forms';



@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css'],
})
export class CreatebookComponent implements OnInit {
  form: FormGroup;

  submitted= false;

  constructor(
    private fb: FormBuilder,
    private bookService: BooksService,
    private route: Router
  ) {
    this.form = this.fb.group({
      ISBN: ['', Validators.required,Validators.maxLength(10)],
      Titulo: ['', Validators.required],
      Autores: ['', Validators.required],
      AnoPublicacao:['', Validators.required],
      Estado:['',Validators.required],
      Preco: ['', Validators.required],
      Editora: ['', Validators.required],
      Stock: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get FormControl(){
    return this.form.controls;
  }


  addbook(){
    this.submitted = true;
    if(!this.form.invalid){
      this.bookService.createBook(this.form.getRawValue()).subscribe((res)=>{
        alert("Registo efetuado com sucesso");
        setTimeout(()=>this.route.navigate(['']),1000);
      },(err)=>{
        alert("Ocorreu um erro no registo de livro");
      })
    }
  }
}
