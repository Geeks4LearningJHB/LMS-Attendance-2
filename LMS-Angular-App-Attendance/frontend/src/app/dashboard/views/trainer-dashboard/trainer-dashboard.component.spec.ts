import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDashboardComponent } from './trainer-dashboard.component';

describe('TrainerDashboardComponent', () => {
  let component: TrainerDashboardComponent;
  let fixture: ComponentFixture<TrainerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
