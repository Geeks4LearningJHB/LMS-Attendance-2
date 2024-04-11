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
  reversedAttendance: any[] = [];
  reversedLogInTime: any[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
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
  this.attendenceService.getAttendances().subscribe(response=>{
  this.attendences = response
  this.reversedAttendance = this.attendences.map((attendance: any) => attendance).reverse();
  this.reversedLogInTime = this.attendences.map((attendance: any) => attendance.logInTime).reverse();

 console.log(this.attendences)
  })
}


  getStatus(status: string): any {
    return status.toLowerCase();
  }

    nextPage() {
      this.currentPage++;
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

    getIndexRange(): { start: number, end: number } {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.attendences.length);
      return { start: startIndex, end: endIndex };
    }

    getPageNumbers(): number[] {
      const pageCount = Math.ceil(this.attendences.length / this.itemsPerPage);
      return Array(pageCount).fill(0).map((x, i) => i + 1);
    }
}
