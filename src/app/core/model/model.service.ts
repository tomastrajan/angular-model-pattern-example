import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Model<T> {

  private _data: BehaviorSubject<T>;

  data$: Observable<T>;

  constructor(initialData: any, immutable: boolean, clone?: (data: T) => T) {
    this._data = new BehaviorSubject(initialData);
    this.data$ = this._data.asObservable()
      .map(data => immutable
        ? clone ? clone(data) : JSON.parse(JSON.stringify(data))
        : data);
  }

  getData(): T {
    return this._data.getValue();
  }

  setData(data: T) {
    this._data.next(data);
  }

}

export class ModelFactory<T> {
  create(
    initialData: T,
    immutable: boolean = true,
    clone?: (data: T) => T): Model<T> {
    return new Model<T>(initialData, immutable, clone);
  }
}

export function useModelFactory() {
  return new ModelFactory();
}

export const MODEL_PROVIDER = {
  provide: ModelFactory, useFactory: useModelFactory
};
