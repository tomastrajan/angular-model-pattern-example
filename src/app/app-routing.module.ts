import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodosComponent } from './todos/todos.component';
import { RestComponent } from './rest/rest.component';
import { TodosService } from './todos/todos.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'todos',
    component: TodosComponent,
    resolve: {
      todos: TodosService
    }
  }, {
    path: 'rest',
    component: RestComponent
  }, {
    path: 'lazy',
    loadChildren: 'app/lazy/lazy.module#LazyModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
