import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatDatepickerSimpleFormattingComponent } from './ngx-mat-datepicker-simple-formatting.component';

describe('NgxMatDatepickerSimpleFormattingComponent', () => {
  let component: NgxMatDatepickerSimpleFormattingComponent;
  let fixture: ComponentFixture<NgxMatDatepickerSimpleFormattingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatDatepickerSimpleFormattingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatDatepickerSimpleFormattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
