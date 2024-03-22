import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnershipApplicationRoutingModule } from './learnership-application-routing.module';
import { LearnershipApplicationComponent } from './learnership-application.component';
import { ApplicantAttachmentsComponent } from './applicant-attachments/applicant-attachments.component';
import { ApplicantEducationComponent } from './applicant-education/applicant-education.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';


@NgModule({
  declarations: [
    LearnershipApplicationComponent,
    ApplicantAttachmentsComponent,
    ApplicantEducationComponent,
    PersonalInformationComponent
  ],
  
  imports: [
    CommonModule,
    LearnershipApplicationRoutingModule

  ]
})
export class LearnershipApplicationModule { }
