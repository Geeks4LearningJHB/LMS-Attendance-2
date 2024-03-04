import { UserManagementModule } from './../user-management/user-management.module';
import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { LeaveManagementComponent } from '../leave-management/leave-management.component';
import { LeaveManagementModule } from '../leave-management/leave-management.module';
import { IkmManagementModule } from '../ikm-management/ikm-management.module';
import { IkmManagementComponent } from '../ikm-management/ikm-management.component';
import { AttendanceRegisterComponent } from '../attendance-register/attendance-register.component';
import { AttendanceRegisterModule } from '../attendance-register/attendance-register.module';
import { GoalManagementComponent } from '../goal-management/goal-management.component';
import { GoalManagementModule } from '../goal-management/goal-management.module';


const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // {
      //   path: 'user-management',
      //   component: UserManagementComponent,
      //   canActivate: [AdminGuard],
      // },
      // {
      //   path: 'leave-management',
      //   component: LeaveManagementComponent,
      // },
      // {
      //   path: 'ikm-management',
      //   component: IkmManagementComponent,
      // },
      {
        path: 'attendance-register',
        component: AttendanceRegisterComponent,
      }
      
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    DashboardModule,
    UserManagementModule,
    LeaveManagementModule,
    IkmManagementModule,
    AttendanceRegisterModule,
    GoalManagementModule,

  ],
})
export class MasterLayoutRoutingModule {
  static components = [MasterLayoutComponent]
}
