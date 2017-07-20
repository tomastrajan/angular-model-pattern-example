import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ampe-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {

  libraryProvide = `
    import { NgxModelModule } from 'ngx-model';
    
    @NgModule({
      /* ... */
      imports: [
        NgxModelModule
      ]
    })
    export class AppModule {} // or CoreModule
  `;
  repoUrl =
    'https://github.com/tomastrajan/angular-model-pattern-example/blob/master';
  fileModelService: string =
    require('!raw-loader!../core/model/model.service.ts');
  fileModelServiceTests: string =
    require('!raw-loader!../core/model/model.service.spec.ts');
  fileCoreModule = `
    import { NgModule } from '@angular/core';
    import { MODEL_PROVIDER } from './model.service';
    
    @NgModule({
      /* ... */
      providers: [MODEL_PROVIDER]
    })
    export class CoreModule { }
  `;
  fileBusinessComponent = `
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { TodosService, Todo, TodosCounts } from './todos.service';
    import { Subscription } from 'rxjs/Subscription';
    
    @Component({
      selector: 'ampe-todos',
      templateUrl: \`
        /* ... */
        <p>Todo list ({{counts.active}})</p>
        <ul>
          <!-- template subscription to todos using async pipe -->
          <li *ngFor="let todo of todosService.todos$ | async" (click)="onTodoClick(todo)">
            {{todo.name}}
          </li>
        </ul>
      \`,
    })
    export class TodosComponent implements OnInit, OnDestroy {
    
      newTodo: string;
      counts: TodosCounts;
      
      subscription: Subscription;
    
      constructor(public todosService: TodosService) {}
    
      ngOnInit() {
        // explicit subscription to todos counts
        this.subscription = this.todosService.todosCounts$
          .subscribe(counts => (this.counts = counts));
      }
    
      onTodoClick(todo: Todo) {
        this.todosService.toggleTodo(todo.name);
      }
      
      /* ... */
    
    }

  `;
  fileBusinessService = `
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import { ModelFactory, Model } from '../core';
    
    @Injectable()
    export class TodoService {
    
      private model: Model<Todo[]>;
    
      // public (exposed) Observable to be used in component's template 
      // or explicitly subscribed in ngOnInit() method
      todos$: Observable<Todo[]>;
    
      // inject model factory with specified type
      constructor(private modelFactory: ModelFactory<Todo[]>) {
        this.model = this.modelFactory.create([]);
        this.todos$ = this.model.data$;
      }
      
      toggleTodo(name: string) {
        // retrieve raw model data
        const todos = this.model.get();
        
        // mutate model data
        todos.forEach(t => {
          if (t.name === name) {
            t.done = !t.done;
          }
        });
        
        // set new model data (after mutation)
        this.model.set(todos);
      }
      
      /* ... */
    }
    
    export interface Todo {
      name: string;
      done: boolean;
    }
  `;
  libraryBusinessService = `
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    
    import { ModelFactory, Model } from 'ngx-model';
    
    @Injectable()
    export class TodoService {
    
      private model: Model<Todo[]>;
    
      // public (exposed) Observable to be used in component's template 
      // or explicitly subscribed in ngOnInit() method
      todos$: Observable<Todo[]>;
    
      // inject model factory with specified type
      constructor(private modelFactory: ModelFactory<Todo[]>) {
        this.model = this.modelFactory.create([]);
        this.todos$ = this.model.data$;
      }
      
      toggleTodo(name: string) {
        // retrieve raw model data
        const todos = this.model.get();
        
        // mutate model data
        todos.forEach(t => {
          if (t.name === name) {
            t.done = !t.done;
          }
        });
        
        // set new model data (after mutation)
        this.model.set(todos);
      }
      
      /* ... */
    }
    
    export interface Todo {
      name: string;
      done: boolean;
    }
  `;

  constructor() {}

  ngOnInit(): void {
    $('ul.tabs').tabs();
  }

}
