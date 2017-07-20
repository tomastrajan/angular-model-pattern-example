import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { NgxModelModule } from 'ngx-model';

import { RestComponent } from './rest.component';
import { RestService } from './rest.service';

describe('RestComponent', () => {
  let component: RestComponent;
  let fixture: ComponentFixture<RestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, NgxModelModule],
      declarations: [RestComponent],
      providers: [RestService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
