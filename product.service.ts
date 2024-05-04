import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseURL = "http://localhost:8081/api/v1/products";

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}`).pipe(
      catchError(this.handleError)
    );;
  }

  createProduct(product: Product): Observable<Object>{
    return this.http.post(`${this.baseURL}`, product);
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
