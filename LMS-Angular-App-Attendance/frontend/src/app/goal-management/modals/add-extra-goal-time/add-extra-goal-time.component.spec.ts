import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtraGoalTimeComponent } from './add-extra-goal-time.component';

describe('AddExtraGoalTimeComponent', () => {
  let component: AddExtraGoalTimeComponent;
  let fixture: ComponentFixture<AddExtraGoalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExtraGoalTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtraGoalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
