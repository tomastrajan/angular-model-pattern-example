import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MODEL_PROVIDER } from '../core';

import { RestService } from './rest.service';


describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MODEL_PROVIDER, RestService]
    });
  });

  it('should ...', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
