import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { TodosService } from './todos/todos.service';
import { RestComponent } from './rest/rest.component';
import { RestService } from './rest/rest.service';
import {
  GettingStartedComponent
} from './getting-started/getting-started.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'getting-started',
    component: GettingStartedComponent
  }, {
    path: 'advanced',
    component: AdvancedComponent
  }, {
    path: 'examples',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      }, {
        path: 'todos',
        component: TodosComponent,
        resolve: {
          todos: TodosService
        }
      }, {
        path: 'rest',
        component: RestComponent,
        resolve: {
          rates: RestService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
