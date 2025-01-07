import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../common/producto';

@Component({
  selector: 'app-ver-productos',
  imports: [],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent {

  texto: string ='que tranza';

  productos: Producto[] = [];

  constructor(private productoServicio: ProductoService) {

    this.obtenerProductos();

  };

  obtenerProductos() {
    this.productoServicio.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos; // Ahora contiene el array de productos
        console.log('Productos obtenidos:', this.productos);
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }




}
