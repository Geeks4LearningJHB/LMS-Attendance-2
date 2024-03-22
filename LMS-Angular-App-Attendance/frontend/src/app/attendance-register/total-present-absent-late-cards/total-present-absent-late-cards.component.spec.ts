import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards.component';

describe('TotalPresentAbsentLateCardsComponent', () => {
  let component: TotalPresentAbsentLateCardsComponent;
  let fixture: ComponentFixture<TotalPresentAbsentLateCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPresentAbsentLateCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPresentAbsentLateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
