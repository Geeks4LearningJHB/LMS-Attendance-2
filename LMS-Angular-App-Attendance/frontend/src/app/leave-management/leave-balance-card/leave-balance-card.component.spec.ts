import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceCardComponent } from './leave-balance-card.component';

describe('LeaveBalanceCardComponent', () => {
  let component: LeaveBalanceCardComponent;
  let fixture: ComponentFixture<LeaveBalanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveBalanceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
