import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnershipApplicationComponent } from './learnership-application.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ApplicantEducationComponent } from './applicant-education/applicant-education.component';
import { ApplicantAttachmentsComponent } from './applicant-attachments/applicant-attachments.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LearnershipApplicationComponent,
  //   children: [
  //     {
  //       path: 'personal-information',
  //       component: PersonalInformationComponent,
  //     },

  //     {
  //       path: 'education',
  //       component: ApplicantEducationComponent,
  //     },
  //     {
  //       path: 'attachments',
  //       component: ApplicantAttachmentsComponent,
  //     },
  //     {
  //       path: '**',
  //       pathMatch: 'full',
  //       redirectTo: 'personal-information',
  //     }

  //   ],
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnershipApplicationRoutingModule { }
