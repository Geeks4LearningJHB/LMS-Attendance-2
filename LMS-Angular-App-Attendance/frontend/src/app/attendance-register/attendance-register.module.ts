import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceRegisterComponent } from './attendance-register.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { AdminComponent } from './views/admin/admin.component';
import { TraineeComponent } from './views/trainee/trainee.component';

@NgModule({
  declarations: [
    AttendanceRegisterComponent,
    TotalPresentAbsentLateCardsComponent,
    AdminComponent,
    TraineeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    MatIconModule,
    NgbModule,
  ],
})
export class AttendanceRegisterModule {}
