import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WidgetComponent } from './widget/widget.component';
import { MiniTableComponent } from './mini-table/mini-table.component';
import { TrainerDashboardComponent } from './views/trainer-dashboard/trainer-dashboard.component';
import { TraineeDashboardComponent } from './views/trainee-dashboard/trainee-dashboard.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    MiniTableComponent,
    TrainerDashboardComponent,
    TraineeDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
