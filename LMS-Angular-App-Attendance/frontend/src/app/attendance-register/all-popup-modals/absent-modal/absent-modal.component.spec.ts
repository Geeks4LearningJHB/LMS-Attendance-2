import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentModalComponent } from './absent-modal.component';

describe('AbsentModalComponent', () => {
  let component: AbsentModalComponent;
  let fixture: ComponentFixture<AbsentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsentModalComponent]
    });
    fixture = TestBed.createComponent(AbsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
