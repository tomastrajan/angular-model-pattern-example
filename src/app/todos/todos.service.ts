import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { ModelFactory, Model } from '../core';

@Injectable()
export class TodosService implements Resolve<boolean> {

  private model: Model<Todo[]>;

  todos$: Observable<Todo[]>;
  todosCounts$: Observable<TodosCounts>;

  constructor(private modelFactory: ModelFactory<Todo[]>) {
    this.model = this.modelFactory.create([]);
    this.todos$ = this.model.data$;
    this.todosCounts$ = this.todos$.map(todos => ({
      active: todos.filter(t => !t.done).length,
      done: todos.filter(t => t.done).length
    }));
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.model.setData([
      { name: 'Try Todos example', done: false },
      { name: 'Try Rest example', done: false },
      { name: 'Read blog post', done: false },
      { name: 'Integrate model pattern in your project', done: false },
      { name: 'Enjoy simplified state management!', done: false }
    ]);
    return Observable.of(true);
  }

  addTodo(name: string) {
    const todos = this.model.getData();
    this.model.setData(todos.concat([{ name, done: false }]));
  }

  toggleTodo(name: string) {
    const todos = this.model.getData();
    todos.forEach(t => {
      if (t.name === name) {
        t.done = !t.done;
      }
    });
    this.model.setData(todos);
  }

  clearDoneTodos() {
    const todos = this.model.getData();
    this.model.setData(todos.filter(t => !t.done));
  }

}

export interface Todo {
  name: string;
  done: boolean;
}

export interface TodosCounts {
  active: number;
  done: number;
}
