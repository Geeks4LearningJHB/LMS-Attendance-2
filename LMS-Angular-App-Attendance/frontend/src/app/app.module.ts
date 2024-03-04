import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { LoaderInterceptor } from './shared/loader/interceptor/loader.interceptor';
import { UserManagementModule } from './user-management/user-management.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterLayoutModule } from './master-layout/master-layout.module';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { AttendanceRegisterModule } from './attendance-register/attendance-register.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { APP_SERVICE_CONFIG, APP_CONFIG } from './shared/app-config/app-config.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  
    //ApplicantDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserManagementModule,
    MasterLayoutModule,
    BrowserAnimationsModule, // required animations module
    AttendanceRegisterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
