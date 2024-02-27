import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkmManagementComponent } from './ikm-management.component';

describe('IkmManagementComponent', () => {
  let component: IkmManagementComponent;
  let fixture: ComponentFixture<IkmManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IkmManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IkmManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
