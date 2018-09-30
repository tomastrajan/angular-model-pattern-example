import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ampe-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {

  todoComponent = `
    import { Component } from '@angular/core';
    import { TodoService } from './todo.service';
     
    @Component({
      selector: 'app-todo',
      template: \`
        <!-- template subscription to todos using async pipe -->
        <ng-container *ngIf="todoService.todos$ | async as todos">
          <h1>Todos ({{todos.length}})</h1>
          <ul>
            <li *ngFor="let todo of todos">
              {{todo.prop}}
            </li>
          </ul>
          <button (click)="addTodo()">Add todo</button>
        </ng-container>
      \`,
      styleUrls: ['./todo.component.css']
    })
    export class TodoComponent {
      constructor(public todoService: TodoService) {}
     
      addTodo() {
        this.todoService.addTodo({ prop: 'New todo!' });
      }
    }
  `;

  todoService = `
    import { Injectable } from '@angular/core';
    import { Model, ModelFactory } from '@angular-extensions/model';
    import { Observable } from 'rxjs';
     
    const initialData: Todo[] = [];
     
    @Injectable({
      providedIn: 'root'
    })
    export class TodoService {
      private model: Model<Todo[]>;
     
      todos$: Observable<Todo[]>;
     
      constructor(private modelFactory: ModelFactory<Todo[]>) {
        this.model = this.modelFactory.create(initialData);
        this.todos$ = this.model.data$;
      }
     
      addTodo(todo: Todo) {
        const todos = this.model.get();
     
        todos.push(todo);
     
        this.model.set(todos);
      }
    }
     
    export interface Todo {
      prop: string;
    }
  `;

  constructor() {}

  ngOnInit(): void {
    $('ul.tabs').tabs();
  }

}
