import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontrolCompanionComponent } from './formcontrol-companion.component';

describe('FormcontrolCompanionComponent', () => {
  let component: FormcontrolCompanionComponent;
  let fixture: ComponentFixture<FormcontrolCompanionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcontrolCompanionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcontrolCompanionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
