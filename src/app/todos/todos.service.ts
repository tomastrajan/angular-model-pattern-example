import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService implements Resolve<boolean> {


  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  todos = this._todos.asObservable();
  todosCounts: Observable<TodosCounts> = this.todos.map(todos => {
    return {
      active: todos.filter(t => !t.done).length,
      done: todos.filter(t => t.done).length
    };
  });

  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.setTodos([
      { name: 'Try Todos example', done: false },
      { name: 'Try Rest example', done: false },
      { name: 'Try Lazy example', done: false },
      { name: 'Read blog post', done: false },
      { name: 'Have fun!', done: false }
    ]);
    return Observable.of(true);
  }

  addTodo(name: string) {
    const todos = this.getTodos();
    todos.push({ name, done: false });
    this.setTodos(todos);
  }

  toggleTodo(name: string) {
    const todos = this.getTodos();
    todos.forEach(t => {
      if (t.name === name) {
        t.done = !t.done;
      }
    });
    this.setTodos(todos);
  }

  clearDoneTodos() {
    const todos = this.getTodos();
    this.setTodos(todos.filter(t => !t.done));
  }

  private getTodos(): Todo[] {
    return this._todos.getValue();
  }

  private setTodos(todos: Todo[]) {
    this._todos.next([...todos]);
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
