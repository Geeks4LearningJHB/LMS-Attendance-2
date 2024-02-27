import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  //mimic the response the the server
  leaveBalance =  new BehaviorSubject<any>(undefined);

  constructor(@Inject(APP_SERVICE_CONFIG) private config : AppConfig,private http: HttpClient) {``
  }

  applyForLeave(value: any): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/leave`, value);
  }

  getLeaveApplications(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/leave/${userId}`);
  }

  getLeaveToApprove(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/leave/approve/${userId}`);
  }

  updateLeave(leave: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/leave/${leave?.id}`, leave);
  }

  getLeaveStats(userId: any){
    return this.http.get(`${this.config.apiUrl}/leave/approverBalance/${userId}`);
  }

  getLeaveBalances(userId: any) {
    return this.http.get(`${this.config.apiUrl}/leave/balances/${userId}`);
  }


  uploadAttachments(value: any) : Observable <any> {

     return this.http.post(`${this.config.apiUrl}/leave/Post_Attachments`, value);
  }

  getAttachments(leave: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/leave/Get_Attachments/${leave?.Id}`);
  }

  updateLeaveRequest(value: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/leave/${value.id}`, value);
  }

  getApproverByStream(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/leave/approverByStream/${userId}`);
  }

  updateApprover(leaveId: string, approvers: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/leave/${leaveId}/approvers`, approvers);
  }
}
