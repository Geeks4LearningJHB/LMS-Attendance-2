import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UserService } from 'src/app/user-management/services/user.service';
import { AttendanceService } from '../../services/attendance.service';
import { AdminpopupComponent } from '../../popup/adminpopup/adminpopup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttendanceModel } from '../../models/attendance.interface';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ViewAttendancesComponent } from '../../modal/view-attendances/view-attendances.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  attendences: any[] = [];
  users: any;
  testing: UntypedFormGroup = new UntypedFormGroup({});
  userId!: number;
  id!: string;
  statu$: any;
  date: any;
  reversedLogInTimes: any[] = []; 

  constructor(
    private formBuider: UntypedFormBuilder,
    private attendenceService: AttendanceService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const convertedDate = new Date(date);
    this.getAllAttendances(date);
    console.log(convertedDate);
  }

  openModal(): void {
    this.dialog.open;
  }
  closeModal() {
    this.dialog.closeAll;
  }

  updateStatus(attendanceId: string) {
    this.attendenceService.updateAttendance(attendanceId).subscribe();
  }
  getOneAttendanceById(attendanceId: string) {
    this.attendenceService.getUserAttendanceById(attendanceId).subscribe((attendance: AttendanceModel[]) => {
      const dialogRef = this.dialog.open(ViewAttendancesComponent, {
        width: '800px',
        data: attendance
      });
    });
    console.log("Fetching attendance data for attendance with ID:", attendanceId);
  }
  getAttendanceById(userId: string) {
    this.attendenceService.getAttendancesByUserId(userId).subscribe((attendance: AttendanceModel[]) => {
      const dialogRef = this.dialog.open(AdminpopupComponent, {
        width: '800px',
        data: attendance
      });
    });
    console.log("Fetching attendance data for user with ID:", userId);
  }
  
  getAllAttendances(date: String) {
    this.attendenceService.getAttendances(date).subscribe(response => {
      this.attendences = response
      this.reversedLogInTimes = this.attendences.map((attendance: any) => attendance.logInTime).reverse();
      console.log( this.attendences);
    });
  }

  getStatus(status: string): any {
    return status.toLowerCase();
  }
}
