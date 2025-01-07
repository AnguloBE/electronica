import { Component, inject } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-nuevo-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent {

  private formBuilder = inject(FormBuilder);

  productoForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    identificador: ['', [Validators.minLength(3), Validators.required]],
    cantidad: ['',[Validators.required, Validators.pattern('[\\d]*')]],
    unidadMedida: ['', Validators.required],
    costo: ['', [Validators.required, Validators.pattern('^\\d+[\\d\\.]*')]],
    precioAlPublico: ['']
  });

  formProducto = new FormGroup({

    nombre: new FormControl(''),
    identificador: new FormControl(''),
    cantidad: new FormControl(''),
    unidadMedida: new FormControl(''),
    costo: new FormControl(''),
    precioAlPublico: new FormControl('')

  });

  onSubmit(){
    console.log(this.productoForm.value);
  };

}
