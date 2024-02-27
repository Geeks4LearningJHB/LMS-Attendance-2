import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '../shared/material/material.module';
import { MasterLayoutRoutingModule } from './master-layout.routing';
import { ActiveGoalCardComponent } from './side-nav/active-goal-card/active-goal-card.component';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MasterLayoutComponent,
    TopNavComponent,
    ContentAreaComponent,
    SideNavComponent,
    ActiveGoalCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MasterLayoutRoutingModule,
    PipesModule
  ]
})
export class MasterLayoutModule {}
