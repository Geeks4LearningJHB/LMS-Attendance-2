import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularNumberComponent } from './circular-number.component';

describe('CircularNumberComponent', () => {
  let component: CircularNumberComponent;
  let fixture: ComponentFixture<CircularNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
