import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpopupComponent } from './adminpopup.component';

describe('AdminpopupComponent', () => {
  let component: AdminpopupComponent;
  let fixture: ComponentFixture<AdminpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminpopupComponent]
    });
    fixture = TestBed.createComponent(AdminpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
