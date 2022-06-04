import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksService } from '../services/BooksServices/books.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks: Book[]=[];
  constructor(private rest:BooksService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      if(params[0].path=="all")  
      this.rest.allBooks().subscribe((res:any)=>{
      this.allBooks = res['books'];
    })
    if(params[0].path=="new")  
    this.rest.newBooks().subscribe((res:any)=>{
    this.allBooks = res['books'];
  })
  if(params[0].path=="used")  
  this.rest.usedBooks().subscribe((res:any)=>{
  this.allBooks = res['books'];
})
      
    })
    
  }

}
