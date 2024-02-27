import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
// import { AttendanceStatus } from 'src/app/attendance-register/models/attendance-type';

import { CaptureGoalService } from 'src/app/goal-management/services/logic-handlers/capture-goal.service';
import { constants } from 'src/app/shared/global/global.constants';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { CaptureGoalsComponent } from '../../../goal-management/modals/capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../../lunch-time-notification/lunch-time-notification.component';
import { AttendanceModel } from '../../models/attendance.interface';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
})
export class TraineeComponent implements OnInit {
  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  date: any;
  userId: any | null;
  holdingArray: UntypedFormGroup = new UntypedFormGroup({});
  attendances!: AttendanceModel[];
  id!: string;
  loginTime: any;
  statu$: any = 'Present';
  testTime: any;
  leaveApplications: any;

  hoursWorked = {
    totalToday: 0,
    totalWeek: 0,
    totalMonth: 0,
  };

  constructor(
    private tokenService: TokenService,
    private attendanceService: AttendanceService,
    private formBuilder: UntypedFormBuilder,
    private modalService: MdbModalService,
    private captureGoalService: CaptureGoalService
  ) {}
  ngOnInit(): void {
    // this.startTimer();
    let date: any = sessionStorage.getItem('date');
    let loginTime: any = sessionStorage.getItem(constants.time);
    this.loginTime = loginTime;

    this.date = date;
    this.buildData();
    this.getTotalHoursWorked();
    // this.sendDetails()
  }
  sendDetails() {
    console.log(this.holdingArray.value + ' ');
    this.attendanceService
      .captureDetails(this.holdingArray.value)
      .subscribe((_) => {
        window.location.reload();
      });
  }
  buildData() {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    console.log(this.userId);
    this.holdingArray = this.formBuilder.group({
      userId: [this.userId],
      date: [this.date],
      checkInTime: [this.loginTime],
      status: [this.statu$],
    });
    console.log('I am here');
    console.log(this.holdingArray.value);
    this.getAttendance(this.userId);
  }
  getAttendance(userId: any) {
    this.attendanceService
      .getAttendancesByUserId(userId)
      .subscribe((attendance: AttendanceModel[]) => {
        console.log(attendance);
        this.attendances = attendance;
        console.log('I am results');
        console.log(attendance);
        this.attendances.forEach((attendance: AttendanceModel) => {
          this.id = attendance.id;
        });
      });
  }

  getTotalHoursWorked() {
    const todayAttendance: AttendanceModel[] = this.attendances.filter(
      (attendance) => attendance.date === new Date()
    );
    if (todayAttendance.length === 1) {
    }
    const date1 = new Date('2023-04-20');
    const date2 = new Date('2023-04-22');

    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log('I am date');
    console.log(diffInDays);
  }

  getStatus(status: string): any {
    return status.toLowerCase();
  }

  //Testing pagination
  page = 3;
  isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
  //Test above

  startTimer() {
    setInterval(() => {
      let time = new Date(Date.now()).getSeconds();
      this.testTime = new Date().toTimeString();
      if (this.testTime.substring(0, 8) == '12:00:00') {
        this.modalDialog = this.modalService.open(
          LunchTimeNotificationComponent,
          {
            animation: true,
            backdrop: true,
            containerClass: 'modal top fade modal-backdrop',
            ignoreBackdropClick: false,
            keyboard: true,
            modalClass: 'modal-xl modal-dialog-centered',
          }
        );
      }
      console.log(time);
    }, 1000);
  }

  createNewGoal() {
    this.captureGoalService.createNewGoal();
  }

  // CreateGoalsDialog(id:any) {
  //   this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
  //     animation: true,
  //     backdrop: true,
  //     data:{attendanceId: id},
  //     containerClass: 'modal top fade modal-backdrop',
  //     ignoreBackdropClick: false,
  //     keyboard: true,
  //     modalClass: 'modal-xl modal-dialog-centered',
  //   });
  // }
}
