import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaskDateDemoComponent } from './ngx-mask-date-demo.component';

describe('NgxMaskDateDemoComponent', () => {
  let component: NgxMaskDateDemoComponent;
  let fixture: ComponentFixture<NgxMaskDateDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMaskDateDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMaskDateDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
