import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  createBook(book:Book):Observable<Book>{
    return this.http.post<Book>("http://localhost:3000/books/register",JSON.stringify(book),httpOptions);
  }

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
