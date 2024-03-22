import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { EnrolComponent } from './enrol/enrol.component';
import { FooterComponent } from './login/footer/footer.component';
import { IconsComponent } from './login/icons/icons.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management.component';
import { LearnershipApplicationModule } from './learnership-application/learnership-application.module';


@NgModule({
  declarations: [
    UserManagementComponent,
    LoginComponent,
    RegisterComponent,
    EnrolComponent,
    IconsComponent,
    FooterComponent,
    
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    PipesModule,
    MaterialModule,
    LearnershipApplicationModule
  ],
})
export class UserManagementModule {}
