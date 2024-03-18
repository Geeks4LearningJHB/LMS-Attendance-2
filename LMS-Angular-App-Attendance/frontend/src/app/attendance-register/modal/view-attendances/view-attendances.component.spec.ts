import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendancesComponent } from './view-attendances.component';

describe('ViewAttendancesComponent', () => {
  let component: ViewAttendancesComponent;
  let fixture: ComponentFixture<ViewAttendancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAttendancesComponent]
    });
    fixture = TestBed.createComponent(ViewAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
