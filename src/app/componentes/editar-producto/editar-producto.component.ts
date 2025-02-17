import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../common/producto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule, CommonModule
  ],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private productoServicio = inject(ProductoService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  producto!: Producto;

    formProducto = new FormGroup({
  
      nombre: new FormControl('', Validators.required),
      identificador: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('[\\d]*')]),
      unidadMedida: new FormControl(0, Validators.required),
      ubicacion: new FormControl('', Validators.required),
      costo: new FormControl('', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')]),
      precioAlPublico: new FormControl('', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')])
  
    });

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('productoId')),
      switchMap(productoId => {
        const id = Number(productoId); // Convertir el ID a número
        return this.productoServicio.getProducto(id);
      })
    ).subscribe(producto => {
      this.producto = producto;
      console.log('Producto obtenido:', this.producto);
      
      this.formProducto.patchValue({
        nombre: this.producto.nombre,
        identificador: this.producto.identificador,
        cantidad: this.producto.cantidad.toString(),
        ubicacion: this.producto.ubicacion,
        costo: this.producto.costo.toString(),
        precioAlPublico: this.producto.precioAlPublico.toString(),
        unidadMedida: this.producto.unidadMedida 
      });


    });


  }

  eliminar() {
    this.productoServicio.deleteProducto(this.producto.productoId!).subscribe({
      next: () => {
        this.toastr.success('Producto eliminado correctamente');
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastr.error('Error al eliminar el producto');
      }
    })

  }

  onSubmit() {
    const formValue = this.formProducto.value;

    this.producto.nombre = formValue.nombre!;
    this.producto.identificador = formValue.identificador!,
    this.producto.cantidad = Number(formValue.cantidad!),
    this.producto.unidadMedida = formValue.unidadMedida!,
    this.producto.ubicacion = formValue.ubicacion!,
    this.producto.costo = Number(formValue.costo!),
    this.producto.precioAlPublico = Number(formValue.precioAlPublico!)
    
    console.log(this.producto)

    this.productoServicio.putProducto(this.producto).subscribe({
      next: () => {
        this.toastr.success('Producto actualizado correctamente');
        
      },
      error: () => {
        this.toastr.error('Error al actualizar el producto');
      }
    })

  }

  

}
