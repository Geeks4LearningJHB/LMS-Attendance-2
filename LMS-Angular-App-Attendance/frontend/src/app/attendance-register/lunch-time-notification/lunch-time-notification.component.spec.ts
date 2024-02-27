import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchTimeNotificationComponent } from './lunch-time-notification.component';

describe('LunchTimeNotificationComponent', () => {
  let component: LunchTimeNotificationComponent;
  let fixture: ComponentFixture<LunchTimeNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchTimeNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchTimeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
