import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TodosService, Todo, TodosCounts } from './todos.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ampe-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit, OnDestroy {

  newTodo: string;
  counts: TodosCounts;
  subs: Subscription[] = [];

  constructor(public todosService: TodosService) { }

  ngOnInit() {
    this.newTodo = '';
    this.subs.push(this.todosService.todosCounts$
      .subscribe(counts => (this.counts = counts)));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  onNewTodoChange(newTodo: string) {
    this.newTodo = newTodo;
  }

  onAddTodo() {
    this.todosService.addTodo(this.newTodo);
    this.newTodo = '';
  }

  onClearTodoInput() {
    this.newTodo = '';
  }

  onTodoClick(todo: Todo) {
    this.todosService.toggleTodo(todo.name);
  }

  onClearDoneTodosClick() {
    this.todosService.clearDoneTodos();
  }

  todosTrackBy(index, todo) {
    return todo.name;
  }

}
