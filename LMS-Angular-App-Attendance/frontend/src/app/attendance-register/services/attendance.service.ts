import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';
import { AttendanceModel, HoursType } from '../models/attendance.interface';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  TODAY_HOURS = 8;
  MONTH_HOURS = 160;
  WEEK_HOURS = 40;
 

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  updateAttendanceGoals(value: any) {
    return this.http.put(`${this.config.apiUrl}/Attendance`, value);
  }

  getAttendances(date: String){
    return this.http.get<any>(`${this.config.apiUrl}/attendance/today-attendance/${date}`)
  }

  getPagedAttendance(skip: any, take: any) {
    return this.http.get(
      `${this.config.apiUrl}/attendance/view-all/pages?skip=${skip}&take=${take}`
    );
  }
  updateAttendance(logoutTime: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/Attendance`, logoutTime);
  }

  getAttendancesByUserId(userId: number): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(
      `${this.config.apiUrl}/attendance/view-by-user-id/${userId}`
    );
  }

  getHoursWorked(period: HoursType, count: number): number {
    switch (period) {
      case 'Month':
        return this.calculateHoursWorked(count, this.MONTH_HOURS);
      case 'Today':
        return this.calculateHoursWorked(count, this.TODAY_HOURS);
      case 'Week':
        return this.calculateHoursWorked(count, this.WEEK_HOURS);
      default:
        return 0;
    }
  }

  calculateHoursWorked(count: number, maximumHours: number): number {
    return (count / maximumHours) * 100;
  }

  captureDetails(value: any): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/Attendance`, value);
  }
}
