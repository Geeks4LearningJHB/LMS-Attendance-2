import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedGoalComponent } from './view-selected-goal.component';

describe('ViewSelectedGoalComponent', () => {
  let component: ViewSelectedGoalComponent;
  let fixture: ComponentFixture<ViewSelectedGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectedGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
