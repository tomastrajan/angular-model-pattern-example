import { TestBed, inject } from '@angular/core/testing';

import { ModelService } from './model.service';

describe('ModelService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelService]
    });
  });

  it('should expose model data in observable',
    inject([ModelService], (service: ModelService) => {
      const model = service.createModel(<TestModel> { value: 'test' });

      model.data$.subscribe(data => {
        expect(data).toEqual({ value: 'test' });
      });
    }));

  it('should expose raw data',
    inject([ModelService], (service: ModelService) => {
      const model = service.createModel(<TestModel> { value: 'test' });

      expect(model.getData()).toEqual({ value: 'test' })
    }));

  it('should expose raw data setter',
    inject([ModelService], (service: ModelService) => {
      const model = service.createModel(<TestModel> { value: 'test' });

      model.setData({ value: 'changed' });

      expect(model.getData()).toEqual({ value: 'changed' })
    }));

  it('should clone exposed model data in observable to prevent mutations',
    inject([ModelService], (service: ModelService) => {
      const model = service.createModel(<TestModel> { value: 'test' });

      model.data$.subscribe(data => {

        data.value = 'changed';

        expect(model.getData()).toEqual({ value: 'test' });
      });
    }));

});

interface TestModel {
  value: string;
}
