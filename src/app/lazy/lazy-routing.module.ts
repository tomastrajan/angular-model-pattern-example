import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompComponent } from './comp/comp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'comp',
    pathMatch: 'full'
  }, {
    path: 'comp',
    component: CompComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
