import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig,private http: HttpClient) { }

  getSponsors(): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sponsor`);
  }

  getSponsorById(sponsorId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sponsor/${sponsorId}`);
  }

  getApproversBySponsor(sponsorId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sponsor/${sponsorId}/approvers`);
  }

  getSponsorByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sponsor/approvers/${userId}`);
  }

}
