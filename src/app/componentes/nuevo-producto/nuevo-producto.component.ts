import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../common/producto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-producto',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent{


  private productoServicio = inject(ProductoService);
  private toastr = inject(ToastrService);

  /*productoForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    identificador: ['', [Validators.minLength(3), Validators.required]],
    cantidad: ['',[Validators.required, Validators.pattern('[\\d]*')]],
    unidadMedida: ['', Validators.required],
    ubicacion: ['',Validators.required],
    costo: ['', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')]],
    precioAlPublico: ['', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')]]
  });*/


  formProducto = new FormGroup({

    nombre: new FormControl('', Validators.required),
    identificador: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('[\\d]*')]),
    unidadMedida: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
    costo: new FormControl('', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')]),
    precioAlPublico: new FormControl('', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')])

  });

  onSubmit(){
    const formValue = this.formProducto.value;

    const producto: Producto = {
      nombre: formValue.nombre!,
      identificador: formValue.identificador!,
      cantidad: Number(formValue.cantidad)!,
      unidadMedida: Number(formValue.unidadMedida)!,
      ubicacion: formValue.ubicacion!,
      costo: Number(formValue.costo!),
      precioAlPublico: Number(formValue.precioAlPublico)!
    };

    this.productoServicio.postProducto(producto).subscribe({
      next: () => {
        this.toastr.success('Producto guardado correctamente');
        this.formProducto.reset();
      },
      error: () => {
        this.toastr.error('uii, paso un error al guardar el producto, intenta de nuevo');

      }
    });
    
  }



}
