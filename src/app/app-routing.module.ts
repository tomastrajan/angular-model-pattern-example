import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { FaqComponent } from './faq/faq.component';
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
    path: 'faq',
    component: FaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
