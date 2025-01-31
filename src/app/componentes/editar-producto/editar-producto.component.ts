import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-producto',
  imports: [],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  private route = inject(ActivatedRoute);
  productoId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('productoId')))
  );

  constructor() {
    console.log('productoId(signal):', this.productoId());
  }

  

}
