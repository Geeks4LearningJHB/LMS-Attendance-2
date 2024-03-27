import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalColumnListComponent } from './goal-column-list.component';

describe('GoalColumnListComponent', () => {
  let component: GoalColumnListComponent;
  let fixture: ComponentFixture<GoalColumnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalColumnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
