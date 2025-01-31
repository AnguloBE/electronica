import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../common/producto';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ver-productos',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent {

  productos: Producto[] = [];

  private productoServicio = inject(ProductoService);

  constructor() {

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
