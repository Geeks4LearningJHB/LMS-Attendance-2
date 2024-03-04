import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { constants } from 'src/app/shared/global/global.constants';

import { APP_SERVICE_CONFIG } from '../../shared/app-config/app-config.service';
import { AppConfig } from '../../shared/app-config/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  holidays = new BehaviorSubject<any[]>([]);

  constructor(@Inject(APP_SERVICE_CONFIG) private config : AppConfig,private http: HttpClient) {
    const holidays = localStorage.getItem(constants.holidays);
    this.holidays.next(holidays ? JSON.parse(holidays) : []);
  }

  getCalendarEvents(calendarId: any) {
    this.http.get(`${this.config.apiUrl}/googleCalendar/${calendarId}`)
      .subscribe((holidays: any) => {
        localStorage.setItem(constants.holidays, JSON.stringify(holidays));
        this.holidays.next(holidays);
      }
      );
  }

}
