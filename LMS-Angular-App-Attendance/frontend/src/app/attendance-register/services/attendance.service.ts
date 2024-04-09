import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';
import { AttendanceModel, HoursType } from '../models/attendance.interface';
import { User } from 'src/app/mockData/data.service';

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
  getQrCode(attendanceId: String): Observable<Blob> {
    return this.http.get(`${this.config.apiUrl}/api/attendance/generate/${attendanceId}`, { responseType: 'blob' });
  }

  getAttendances(){
    return this.http.get<any>(`${this.config.apiUrl}/attendance/today-attendance`)
  }

  getPagedAttendance(skip: any, take: any) {
    return this.http.get(
      `${this.config.apiUrl}/attendance/view-all/pages?skip=${skip}&take=${take}`
    );
  }
   updateAttendance(id: any, status: any): Observable<any> {
      const url = `${this.config.apiUrl}/attendance/update/status/${id}/${status}`;
      return this.http.put(url, {});
    }

  getAttendancesByUserId(userId: string | null): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(
      `${this.config.apiUrl}/attendance/view-by-user-id/${userId}`
    );
  }

  getUserAttendanceById(attendanceId: string | null): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(
      `${this.config.apiUrl}/attendance/view-by-attendance-id/${attendanceId}`
    );
  }


  getUserLocation(){

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

  unexpectedLogOutTime(attendanceId: any): Observable<boolean> {
    return this.http.get<boolean>(`${this.config.apiUrl}/attendance/log-out-flag/${attendanceId}`)
  }

  earlyDeparture(): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(`${this.config.apiUrl}/attendance/early-logouts`)
  }
  
  getAllGeeks(): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/users/all-geeks`)
  }

  getAbsentGeeks():Observable<any>{
    return this.http.get<any>(`${this.config.apiUrl}/attendance/absent`)
  }


 getUserEarlyDeparture(userId : string | null): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(`${this.config.apiUrl}/attendance/user-early-logouts/${userId}`)
  }

}
