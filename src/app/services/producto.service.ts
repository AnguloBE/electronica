import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../common/producto';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8080/productos";


  getProductos():Observable<Producto[]> {

    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(response => response._embedded.productos)
    );

  }


  getProducto(productoId: number): Observable<Producto> {

    return this.http.get<Producto>(`${this.baseUrl}/${productoId}`);

  }


  postProducto(producto: Producto): Observable<any> {

    return this.http.post<Producto>(`${this.baseUrl}`,producto);

  }


  putProducto(producto: Producto): Observable<any> {

    return this.http.put<Producto>(`${this.baseUrl}/${producto.productoId}`,producto

    );

  }


  deleteProducto(productoId: number): Observable<any> {

    return this.http.delete<Producto>(`${this.baseUrl}/${productoId}`)

  }
}
