# Model pattern for Angular by [@tomastrajan](https://twitter.com/tomastrajan) [![Build Status](https://travis-ci.org/tomastrajan/angular-model-pattern-example.svg?branch=master)](https://travis-ci.org/tomastrajan/angular-model-pattern-example)
                           
Check out [Demo & Documentation](http://tomastrajan.github.io/angular-model-pattern-example/) 

## Getting started

1. Create `model.service.ts` with following [content](https://github.com/tomastrajan/angular-model-pattern-example/blob/master/src/app/core/model/model.service.ts).
2. Import and provide `MODEL_PROVIDER` (from `model.service.ts`) constant in your `CoreModule` (use `AppModule` in case you don't have `CoreModule`)
3. Use model in your own services. Import `ModelFactory` and inject it in service's constructor, 
then create model instance with `this.model = this.modeFactory.create(initialData)`. 
Expose model with descriptively named variable (eg: `this.todos$ = this.model.data$`)
4. Use service in your component. Import and inject service into components constructor.
Subscribe to services data in template `todosService.todos$ | async` 
or explicitly `this.todosService.todos$.subscribe(todos => { /* ... */ })`

## Examples

 * [todos.service.ts](https://github.com/tomastrajan/angular-model-pattern-example/blob/master/src/app/todos/todos.service.ts#L20) - creating model instance and mutating model data
 * [todos.component.ts](https://github.com/tomastrajan/angular-model-pattern-example/blob/master/src/app/todos/todos.component.ts#L38) - consuming model
 * [routes](https://github.com/tomastrajan/angular-model-pattern-example/blob/master/src/app/app-routing.module.ts#L44) - for initializing of model data before navigation


Built with [Angular CLI](https://github.com/angular/angular-cli)
