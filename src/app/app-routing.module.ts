import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodosComponent } from './todos/todos.component';
import { RestComponent } from './rest/rest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'todos',
    component: TodosComponent
  }, {
    path: 'rest',
    component: RestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
