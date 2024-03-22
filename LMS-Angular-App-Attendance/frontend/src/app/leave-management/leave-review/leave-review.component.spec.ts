import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReviewComponent } from './leave-review.component';

describe('LeaveReviewComponent', () => {
  let component: LeaveReviewComponent;
  let fixture: ComponentFixture<LeaveReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
