import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },  // Redirige la raíz a la ruta de usuarios
  { path: 'users', component: UserTableComponent },       // Ruta para el componente de la tabla de usuarios
  // Puedes agregar otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }