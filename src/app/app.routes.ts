import { Routes } from '@angular/router';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './componentes/nuevo-producto/nuevo-producto.component';
import { VerProductosComponent } from './componentes/ver-productos/ver-productos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/ver-productos', pathMatch: 'full' },
    { path: 'ver-productos', component: VerProductosComponent },
    { path: 'editar-producto/:productoId', component: EditarProductoComponent },
    { path: 'nuevo-producto', component: NuevoProductoComponent}
];
