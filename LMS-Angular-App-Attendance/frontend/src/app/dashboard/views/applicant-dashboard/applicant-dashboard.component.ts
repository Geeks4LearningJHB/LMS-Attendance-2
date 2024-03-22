import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { Roles } from 'src/app/shared/global/roles';
import {
  AttendanceRegister,
  Dashboard,
  GoalManagement,
  IKMManagement,
  LeaveManagement,
  UserManagement,
} from 'src/app/shared/global/routing.management';
import { EnrolComponent } from 'src/app/user-management/enrol/enrol.component';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { UserService } from 'src/app/user-management/services/user.service';
//import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css']
})
export class ApplicantDashboardComponent implements OnInit {

  holdingArray: UntypedFormGroup = new UntypedFormGroup({});
  user: any;
  //navItems: NavItem[] = [];
  modalDialog: MdbModalRef<EnrolComponent> | null = null;
  logoutTime: any;
  userId: any;
  date: any;
  loginTime: any;
  comingdata: any;

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private tokenService: TokenService,
    private attendanceService: AttendanceService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.getUserDetails(user.id);
    this.logoutTime = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1);
    this.buildData();
    console.log(this.logoutTime);
  }

  getUserDetails(userId: string | null) {
    this.userService.getUserById(userId).subscribe((response: any) => {
      this.user = response;
      //this.navItems = this.getNavItems(this.user);
    });
  }

  getNavItems(user: any) {
    switch (user?.role) {
      case Roles.Super_Admin:
        return [
          Dashboard,
          UserManagement,
          AttendanceRegister,
          LeaveManagement,
          IKMManagement,
          GoalManagement,
        ];
      case Roles.Admin:
        return [
          Dashboard,
          UserManagement,
          AttendanceRegister,
          LeaveManagement,
          IKMManagement,
        ];
      case Roles.Trainer:
        return [Dashboard, AttendanceRegister, LeaveManagement, IKMManagement];
      case Roles.Learner:
        return [
          Dashboard,
          AttendanceRegister,
          LeaveManagement,
          IKMManagement,
          GoalManagement,
        ];
      default:
        return [];
    }
  }

  openLMSinNewTab(url: string) {
    window.open(url, '_blank');
  }

  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(EnrolComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'right',
      data: { user: user, editCrucialInfo: false },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe(() => {});
  }
  buildData() {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.getAttendance(this.userId);
  }
  getAttendance(userId: string) {
    this.attendanceService
      .getAttendancesByUserId(userId)
      .subscribe((res: any) => {
        this.comingdata = res;
        console.log(this.comingdata);
        this.comingdata.forEach((element: any) => {
          this.holdingArray = this.formBuilder.group({
            id: [element.id],
            clockout_Time: [this.logoutTime],
          });
          console.log(element);
        });
      });
  }
  logout() {
    console.log(this.holdingArray.value);
    //clear the sessionStorage and reload
    switch (this.user?.role) {
      case Roles.Learner:
        this.attendanceService
          .updateAttendance(this.holdingArray.value)
          .subscribe((_: any) => {
            sessionStorage.clear();
            window.location.reload();
          });
        break;
      default:
        sessionStorage.clear();
        window.location.reload();
        break;
    }
  }
}

