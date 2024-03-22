import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoalTaskComponent } from './create-goal-task.component';

describe('CreateGoalTaskComponent', () => {
  let component: CreateGoalTaskComponent;
  let fixture: ComponentFixture<CreateGoalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGoalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGoalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
