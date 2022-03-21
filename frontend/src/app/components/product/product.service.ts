import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3001/products'

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg : string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(prod: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, prod).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  errorHandler(e : any) : Observable<any> {
    this.showMessage('Error', true)
    return EMPTY
  }

  read() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  } 

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  update(prod: Product) : Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${prod.id}`, prod)
  }

  delete(id: string) :  Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`)
  }

}
