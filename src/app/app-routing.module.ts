import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadListComponent } from './pages/producto/unidad-list/unidad-list.component';
import { CursoListComponent } from './pages/Curso/curso-list/curso-list.component';

const routes: Routes = [
  { path: 'unidad', component: UnidadListComponent},
  { path: 'curso', component: CursoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
