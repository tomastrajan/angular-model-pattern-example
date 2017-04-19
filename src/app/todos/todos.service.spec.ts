import { TestBed, inject } from '@angular/core/testing';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosService]
    });
  });

  it('should initialize mock data on resolve',
    inject([TodosService], (service: TodosService) => {
      service.resolve(undefined, undefined);

      service.todos.subscribe(todos => {
        expect(todos.length).toBe(5);
        expect(todos[0].name).toBe('Try Todos example');
      });
    }));

  it('should add todo',
    inject([TodosService], (service: TodosService) => {
      service.addTodo('test todo');

      service.todos.subscribe(todos => {
        expect(todos.length).toBe(1);
        expect(todos[0].name).toBe('test todo');
      });
    }));

  it('should toggle todo',
    inject([TodosService], (service: TodosService) => {
      service.addTodo('test todo');
      service.toggleTodo('test todo');

      service.todos.subscribe(todos => {
        expect(todos[0].done).toBe(true);
      });
    }));

  it('should clear done todos',
    inject([TodosService], (service: TodosService) => {
      service.addTodo('test todo');
      service.toggleTodo('test todo');
      service.clearDoneTodos();

      service.todos.subscribe(todos => {
        expect(todos.length).toBe(0);
      });
    }));
});
