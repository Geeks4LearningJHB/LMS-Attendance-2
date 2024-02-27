import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPendingApprovalRejectionComponent } from './total-pending-approval-rejection.component';

describe('TotalPendingApprovalRejectionComponent', () => {
  let component: TotalPendingApprovalRejectionComponent;
  let fixture: ComponentFixture<TotalPendingApprovalRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPendingApprovalRejectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPendingApprovalRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
