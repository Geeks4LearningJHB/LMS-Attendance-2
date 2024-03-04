import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAttachmentsComponent } from './applicant-attachments.component';

describe('ApplicantAttachmentsComponent', () => {
  let component: ApplicantAttachmentsComponent;
  let fixture: ComponentFixture<ApplicantAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
