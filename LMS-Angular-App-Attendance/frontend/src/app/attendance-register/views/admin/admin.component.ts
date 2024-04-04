import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { AttendanceStatus } from 'src/app/attendance-register/models/attendance-type';
import { UserService } from 'src/app/user-management/services/user.service';
import { AttendanceService } from '../../services/attendance.service';
import { AdminpopupComponent } from '../../popup/adminpopup/adminpopup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttendanceModel } from '../../models/attendance.interface';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ViewAttendancesComponent } from '../../modal/view-attendances/view-attendances.component';
import { EarlyDepatureModalComponent } from '../../all-popup-modals/early-depature-modal/early-depature-modal.component';

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
  loginTime: any;
  statu$: any;
  date: any;

  // testing data

  constructor(

    private formBuider: UntypedFormBuilder,
    private attendenceService: AttendanceService,
    private userService: UserService,private dialog: MatDialog
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const convertedDate = new Date(date);
    this.getAllAttendances();
    console.log(convertedDate)

  }

  openModal(): void {
    this.dialog.open
  }
  closeModal() {
    this.dialog.closeAll;
  }

//  updateStatus(attendanceId : string){
//   this.attendenceService.updateAttendance(attendanceId)
//   .subscribe()
//  }
 getOneAttendanceById(attendanceId: string) {
  this.attendenceService
  .getUserAttendanceById(attendanceId)
    .subscribe((attendance: AttendanceModel[]) => {
      const dialogRef = this.dialog.open(ViewAttendancesComponent, {
        width: '800px',
        data: attendance
      });
    });
    console.log("Fetching attendance data for attendance with ID:", attendanceId);
}
  getAttendanceById(userId: string) {
    this.attendenceService
      .getAttendancesByUserId(userId)
      .subscribe((attendance: AttendanceModel[]) => {
        const dialogRef = this.dialog.open(AdminpopupComponent, {
          width: '800px',
          data: attendance
        });
      });
      console.log("Fetching attendance data for user with ID:", userId);
  }
getAllAttendances(){
  this.attendenceService.getAttendances().subscribe(respose=>{
  this.attendences = respose
 console.log(this.attendences)
  })
}





  // getAttendences(skip: any, take: any) {
  //   this.attendenceService
  //     .getPagedAttendance(skip, take)
  //     .subscribe((res: any) => {
  //       this.attendences = res;
  //       console.log(res)
  //       console.log("Get Attendances method");

  //     });
  //   this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
  //     res.forEach((element: any) => {
  //       if (element.role == 'Learner') {
  //         this.ids = element.id;
  //         this.testing = this.formBuider.group({
  //           userId: [element.id],
  //           date: [this.date],
  //           status: ['Absent'],
  //         });
  //         this.attendenceService
  //           .captureDetails(this.testing.value)
  //           .subscribe((_) => {});
  //         console.log(this.testing.value);
  //         console.log(this.ids);
  //       }
  //     });
  //     this.users = res;
  //   });
  // }

  // getStatus(status: any): any {
  //   return status.toLowerCase();
  // }








  getStatus(status: string): any {
    return status.toLowerCase();
  }
}
