import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolComponent } from './enrol.component';

describe('EnrolComponent', () => {
  let component: EnrolComponent;
  let fixture: ComponentFixture<EnrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
