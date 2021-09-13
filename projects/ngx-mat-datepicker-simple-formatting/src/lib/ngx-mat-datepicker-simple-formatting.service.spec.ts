import { TestBed } from '@angular/core/testing';

import { NgxMatDatepickerSimpleFormattingService } from './ngx-mat-datepicker-simple-formatting.service';

describe('NgxMatDatepickerSimpleFormattingService', () => {
  let service: NgxMatDatepickerSimpleFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatDatepickerSimpleFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
