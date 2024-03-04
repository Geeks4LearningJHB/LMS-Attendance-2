import { Component, OnChanges, OnInit } from '@angular/core';
import { EventService } from 'src/app/leave-management/services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnChanges {

  title: string = 'Public Holidays';
  events: any = null;

  constructor(private eventService: EventService) {
    this.events = this.eventService.holidays.value;
   }

  ngOnChanges(changes: any) {
    console.log(changes);
    console.log(this.eventService.holidays.value);
  }

  getTimeSpan(value: any): any {
    let days = '', hours = '', minutes = '';

    if (value.days === 1) {
      days = `${value.days} day`;
    }

    if (value.days > 1) {
      days = `${value.days} days`;
    }

    if (value.hours === 1) {
      hours = `${value.hours} hr`;
    }

    if (value.hours > 1) {
      hours = `${value.hours} hrs`;
    }

    if (value.minutes === 1) {
      minutes = `${value.minutes} min`;
    }

    if (value.minutes > 1) {
      minutes = `${value.minutes} mins`;
    }

    return `${days} ${hours} ${minutes}`
  }

}
