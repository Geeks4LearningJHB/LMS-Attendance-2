import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalColumnHeadersComponent } from './goal-column-headers.component';

describe('GoalColumnHeadersComponent', () => {
  let component: GoalColumnHeadersComponent;
  let fixture: ComponentFixture<GoalColumnHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalColumnHeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalColumnHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
