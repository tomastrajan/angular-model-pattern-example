import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxModelModule } from 'ngx-model';

import { TodosComponent } from './todos.component';
import { TodosService } from './todos.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NgxModelModule],
      declarations: [TodosComponent],
      providers: [TodosService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should enable add todo button with new todo longer than 3 chars', () => {
    fixture.debugElement.query(By.css('input.new'))
      .triggerEventHandler('keyup', { target: { value: '123' } });

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button.add')).nativeElement
      .disabled).toBe(false);
  });

  it('should disable add todo button with new todo shorter than 4 chars', () => {
    fixture.debugElement.query(By.css('input.new'))
      .triggerEventHandler('keyup', { target: { value: '12' } });

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button.add')).nativeElement
      .disabled).toBe(true);
  });

  it('should disable clear all todos if no todo is done', () => {
    expect(fixture.debugElement.query(By.css('button.clear')).nativeElement
      .disabled).toBe(true);
  });

  it('should enable clear all todos if at least one todo is done', () => {
    component.newTodo = 'My test todo';
    component.onAddTodo();
    component.onTodoClick({ name: 'My test todo', done: false });

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button.clear')).nativeElement
      .disabled).toBe(false);
  });

  it('should display all done message when no todos are available', () => {
    expect(fixture.debugElement.query(By.css('.all-done')).nativeElement)
      .toBeDefined();
  });

  it('should hide all done message when some todos are available', () => {
    component.newTodo = 'My test todo';
    component.onAddTodo();

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.all-done'))).toBeNull();
  });

});
