import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceRegisterComponent } from './attendance-register.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { AdminComponent } from './views/admin/admin.component';
import { TraineeComponent } from './views/trainee/trainee.component';
import { AdminpopupComponent } from './popup/adminpopup/adminpopup.component';
import { ViewAttendancesComponent } from './modal/view-attendances/view-attendances.component';
import { AbsentModalComponent } from './all-popup-modals/absent-modal/absent-modal.component';
import { LatecomersModalComponent } from './all-popup-modals/latecomers-modal/latecomers-modal.component';
import { EarlyDepatureModalComponent } from './all-popup-modals/early-depature-modal/early-depature-modal.component';

@NgModule({
  declarations: [
    AttendanceRegisterComponent,
    TotalPresentAbsentLateCardsComponent,
    AdminComponent,
    TraineeComponent,
    AdminpopupComponent,
    ViewAttendancesComponent,
    AbsentModalComponent,
    LatecomersModalComponent,
    EarlyDepatureModalComponent,
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
