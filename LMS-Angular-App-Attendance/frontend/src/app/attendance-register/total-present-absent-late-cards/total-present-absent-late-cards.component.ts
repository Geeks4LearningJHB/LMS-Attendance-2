import { Component, OnInit } from '@angular/core';
import { AbsentModalComponent } from '../all-popup-modals/absent-modal/absent-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LatecomersModalComponent } from '../all-popup-modals/latecomers-modal/latecomers-modal.component';
import { EarlyDepatureModalComponent } from '../all-popup-modals/early-depature-modal/early-depature-modal.component';
import { AttendanceService } from '../services/attendance.service';
import { AttendanceModel } from '../models/attendance.interface';

@Component({
  selector: 'app-total-present-absent-late-cards',
  templateUrl: './total-present-absent-late-cards.component.html',
  styleUrls: ['./total-present-absent-late-cards.component.css'],
})
export class TotalPresentAbsentLateCardsComponent implements OnInit {

  dialogRef: MatDialogRef<AbsentModalComponent> | undefined;
  lateComersFilter: MatDialogRef<LatecomersModalComponent> | undefined;
  ealyDepatureFilter: MatDialogRef<EarlyDepatureModalComponent> | undefined;
  ealryDepatureCount: any;
  allAttendancesCount:any;
  allGeeks:any;
  constructor(private absentModal: MatDialog,
     private lateComersModal: MatDialog, private ealyDepatureModal: MatDialog 
    ,private attendanceService:AttendanceService , private dialog: MatDialog) {}


     ngOnInit(): void {
      this.getCount()
      this. getAllAttendanceCount()
      this.getAllGeeks()
     }

  openAbsentModal() {
    this.dialogRef = this.absentModal.open(AbsentModalComponent);
  }

  closeAbsentModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openLatecomersModal() {
    this.lateComersFilter = this.lateComersModal.open(LatecomersModalComponent);
  }

  openEarlyDepatureModal(){
  this.dialog.open  
  }

  earlyDeparture() {
    this.attendanceService
      .earlyDeparture()
      .subscribe((earlyDeparture: AttendanceModel[]) => {
        const dialogRef = this.ealyDepatureModal.open(EarlyDepatureModalComponent, {
          data: earlyDeparture,
         
        });
      
      });
  }

  getCount(){
    this.attendanceService
    .earlyDeparture()
    .subscribe((e : AttendanceModel[])=>{
      this.ealryDepatureCount = e.length
    }
    );
   
  }

  getAllAttendanceCount(){
    this.attendanceService
    .getAttendances()
    .subscribe((all : AttendanceModel[])=>{
      this.allAttendancesCount = all.length
    }
    );
  }
  getAllGeeks(){
    this.attendanceService
    .getAllGeeks()
    .subscribe((geeks : any)=>{
      this.allGeeks = geeks.length
    })
  };
}
