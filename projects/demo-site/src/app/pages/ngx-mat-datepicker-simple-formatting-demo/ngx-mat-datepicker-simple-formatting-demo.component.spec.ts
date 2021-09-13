import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatDatepickerSimpleFormattingDemoComponent } from './ngx-mat-datepicker-simple-formatting-demo.component';

describe('NgxMatDatepickerSimpleFormattingDemoComponent', () => {
  let component: NgxMatDatepickerSimpleFormattingDemoComponent;
  let fixture: ComponentFixture<NgxMatDatepickerSimpleFormattingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatDatepickerSimpleFormattingDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatDatepickerSimpleFormattingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
