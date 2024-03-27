import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGoalsComponent } from './review-goals.component';

describe('ReviewGoalsComponent', () => {
  let component: ReviewGoalsComponent;
  let fixture: ComponentFixture<ReviewGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
