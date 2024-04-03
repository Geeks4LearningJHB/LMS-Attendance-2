import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatecomersModalComponent } from './latecomers-modal.component';

describe('LatecomersModalComponent', () => {
  let component: LatecomersModalComponent;
  let fixture: ComponentFixture<LatecomersModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatecomersModalComponent]
    });
    fixture = TestBed.createComponent(LatecomersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
