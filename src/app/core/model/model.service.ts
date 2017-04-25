import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class Model<T> {

  private _data: BehaviorSubject<T>;

  data$: Observable<T>;

  constructor(initialData: any, immutable: boolean) {
    this._data = new BehaviorSubject(initialData);
    this.data$ = this._data.asObservable()
      .map(data => immutable ? JSON.parse(JSON.stringify(data)) : data);
  }

  getData(): T {
    return this._data.getValue();
  }

  setData(data: T) {
    this._data.next(data);
  }

}

export class ModelFactory<T> {
  create(initialData: T, immutable: boolean = true): Model<T> {
    return new Model<T>(initialData, immutable);
  }
}

export function useModelFactory() {
  return new ModelFactory();
}

export const MODEL_PROVIDER = {
  provide: ModelFactory, useFactory: useModelFactory
};
