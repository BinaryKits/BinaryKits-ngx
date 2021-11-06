import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormKitDemoComponent } from './ngx-form-kit-demo.component';

describe('NgxFormKitDemoComponent', () => {
  let component: NgxFormKitDemoComponent;
  let fixture: ComponentFixture<NgxFormKitDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFormKitDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormKitDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
