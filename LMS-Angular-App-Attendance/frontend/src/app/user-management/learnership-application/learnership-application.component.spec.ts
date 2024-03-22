import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnershipApplicationComponent } from './learnership-application.component';

describe('LearnershipApplicationComponent', () => {
  let component: LearnershipApplicationComponent;
  let fixture: ComponentFixture<LearnershipApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnershipApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnershipApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
