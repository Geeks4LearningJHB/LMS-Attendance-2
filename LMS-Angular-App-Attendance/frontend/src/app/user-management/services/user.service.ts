import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';
import { Roles } from 'src/app/shared/global/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig,private http: HttpClient) { }

  authenticate(value: any , ): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/user/login`, value);
  }

  getAllUsers(): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/users`);
  }

  getUserById(id: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/user/${id}`);
  }

  addUser(body: any): Observable<any>  {
    return this.http.post(`${this.config.apiUrl}/user`, body);
  }

  updateUser( body: any) {
    return this.http.put(`${this.config.apiUrl}/user`, body);
  }

  getPagedUsers(skip: number, take: number) {
    return this.http.get(`${this.config.apiUrl}/users?skip=${skip}&take=${take}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.config.apiUrl}/user?id=${id}`);
  }

  getUsersByRole(role: Roles) {
    return this.http.get(`${this.config.apiUrl}/user/role/${role}`);
  }
   
  


}
