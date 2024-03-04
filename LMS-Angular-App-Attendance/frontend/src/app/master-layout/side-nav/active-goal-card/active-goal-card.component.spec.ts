import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveGoalCardComponent } from './active-goal-card.component';

describe('ActiveGoalCardComponent', () => {
  let component: ActiveGoalCardComponent;
  let fixture: ComponentFixture<ActiveGoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveGoalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
