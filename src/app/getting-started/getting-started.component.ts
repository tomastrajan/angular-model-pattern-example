import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ampe-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {

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
  fileBusinessService = `
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import { ModelFactory, Model } from '../core';
    
    @Injectable()
    export class TodoService {
    
      private model: Model<Todo[]>;
    
      // public (exposed) Observable to be used in component's template or explicitly subscribed 
      todos$: Observable<Todo[]>;
    
      // inject model factory with specified type
      constructor(private modelFactory: ModelFactory<Todo[]>) {
        this.model = this.modelFactory.create([]);
        this.todos$ = this.model.data$;
      }
      
      toggleTodo(name: string) {
        // retrieve raw model data
        const todos = this.model.getData();
        
        // mutate model data
        todos.forEach(t => {
          if (t.name === name) {
            t.done = !t.done;
          }
        });
        
        // set new model data (after mutation)
        this.model.setData(todos);
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
    setTimeout(() =>
      $('pre code').each((i, block) => hljs.highlightBlock(block)));
  }

}
