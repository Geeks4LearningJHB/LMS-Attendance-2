import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceRegisterComponent } from './attendance-register.component';

describe('AttendenceRegisterComponent', () => {
  let component: AttendenceRegisterComponent;
  let fixture: ComponentFixture<AttendenceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
