import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestComponent } from './leave-request.component';

describe('LeaveRequestComponent', () => {
  let component: LeaveRequestComponent;
  let fixture: ComponentFixture<LeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
