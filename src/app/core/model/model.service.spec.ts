import { TestBed, inject } from '@angular/core/testing';

import { MODEL_PROVIDER, ModelFactory } from './model.service';

describe('ModelService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MODEL_PROVIDER]
    });
  });

  it('should expose model data in observable',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model = modelFactory.create({ value: 'test' });

      model.data$.subscribe(data => {
        expect(data).toEqual({ value: 'test' });
      });
    }));

  it('should expose raw data getter',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model = modelFactory.create({ value: 'test' });

      expect(model.get()).toEqual({ value: 'test' });
    }));

  it('should expose raw data setter',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model = modelFactory.create(<TestModel> { value: 'test' });

      model.set({ value: 'changed' });

      expect(model.get()).toEqual({ value: 'changed' });
    }));

  it('should use immutable data in exposed observable by default',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model = modelFactory.create({ value: 'test' });

      model.data$.subscribe(data => {

        data.value = 'changed';

        expect(model.get()).toEqual({ value: 'test' });
      });
    }));

  it('should use mutable data in exposed observable when configured',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model = modelFactory.create({ value: 'test' }, false);

      model.data$.subscribe(data => {

        data.value = 'changed';

        expect(model.get()).toEqual({ value: 'changed' });
      });
    }));

  it('should use custom clone function when configured',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const cloneSpy = jasmine.createSpy('clone');
      const model = modelFactory.create({ value: 'test' }, true, cloneSpy);

      model.data$.subscribe(() => {
        expect(cloneSpy).toHaveBeenCalled();
        expect(cloneSpy).toHaveBeenCalledWith({ value: 'test' });
      });
    }));

  it('should create multiple independent instances',
    inject([ModelFactory], (modelFactory: ModelFactory<TestModel>) => {
      const model1 = modelFactory.create({ value: 'test1' });
      const model2 = modelFactory.create({ value: 'test2' });

      model2.set({ value: 'changed' });

      model1.data$.subscribe(data => expect(data).toEqual({ value: 'test1' }));
      model2.data$.subscribe(data => expect(data)
        .toEqual({ value: 'changed' }));
    }));

});

interface TestModel {
  value: string;
}
