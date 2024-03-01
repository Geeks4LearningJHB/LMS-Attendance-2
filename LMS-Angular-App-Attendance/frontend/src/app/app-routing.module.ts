import { LoginComponent } from './user-management/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './user-management/login/guards/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },{
    path:'dashboard',
    component : MasterLayoutComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./master-layout/master-layout.module').then(
        (m) => m.MasterLayoutModule
      ),
   
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


