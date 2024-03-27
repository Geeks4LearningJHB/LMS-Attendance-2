import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card.component';

@NgModule({
  declarations: [
    EventCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent
  ]
})
export class EventCardModule { }
