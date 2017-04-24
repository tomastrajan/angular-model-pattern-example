import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelService {

  private Model = class <T> {

    private _data: BehaviorSubject<T>;

    data$: Observable<T>;

    constructor(initialData: T) {
      this._data = new BehaviorSubject(initialData);
      this.data$ = this._data.asObservable()
        .map(data => JSON.parse(JSON.stringify(data)));
    }

    getData(): T {
      return this._data.getValue();
    }

    setData(data: T) {
      this._data.next(data);
    }

  };

  createModel<T>(initialData: T): Model<T> {
    return new this.Model<T>(initialData);
  }

}

export interface Model<T> {
  data$: Observable<T>;
  getData(): T;
  setData(data: T): void;
}
