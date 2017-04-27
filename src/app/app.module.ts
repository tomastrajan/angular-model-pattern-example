import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { RestComponent } from './rest/rest.component';
import { AboutComponent } from './about/about.component';
import { TodosService } from './todos/todos.service';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ExamplesComponent } from './examples/examples.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { RestService } from './rest/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    RestComponent,
    AboutComponent,
    GettingStartedComponent,
    ExamplesComponent,
    AdvancedComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [TodosService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
