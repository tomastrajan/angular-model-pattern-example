import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { NgxModelModule } from 'ngx-model';

import { RestService } from './rest.service';


describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, NgxModelModule],
      providers: [RestService]
    });
  });

  it('should ...', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
