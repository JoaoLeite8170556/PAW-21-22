import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  allBooks():Observable<Book[]>{
    return this.http.get<Book[]>("http://localhost:3000/books/list");
  }
  newBooks():Observable<Book[]>{
    return this.http.get<Book[]>("http://localhost:3000/books/new");
  }
  usedBooks():Observable<Book[]>{
    return this.http.get<Book[]>("http://localhost:3000/books/used");
  }
}
