import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyDepatureModalComponent } from './early-depature-modal.component';

describe('EarlyDepatureModalComponent', () => {
  let component: EarlyDepatureModalComponent;
  let fixture: ComponentFixture<EarlyDepatureModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarlyDepatureModalComponent]
    });
    fixture = TestBed.createComponent(EarlyDepatureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
