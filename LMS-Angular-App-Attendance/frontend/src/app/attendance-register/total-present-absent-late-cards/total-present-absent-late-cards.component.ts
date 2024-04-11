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
  absentCount : any;
  lateCount : any;
  constructor(private absentModal: MatDialog,
     private lateComersModal: MatDialog, private ealyDepatureModal: MatDialog 
    ,private attendanceService:AttendanceService , private dialog: MatDialog) {}


     ngOnInit(): void {
      this.getCount()
     }

  openAbsentModal() {
    this.dialog.open;
  }

  closeAbsentModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openLatecomersModal() {
    // this.lateComersFilter = this.lateComersModal.open(LatecomersModalComponent);
    this.dialog.open
  }

  openLateModal(){
    if(this.lateComersFilter){
      this.lateComersFilter.close();
    }
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

  getAbsentGeeks(){
    this.attendanceService
    .getAbsentGeeks()
    .subscribe((absentGeeks : any )=>{
      const dialogRef = this.absentModal.open(AbsentModalComponent , {
        data: absentGeeks,
    
      });
    });
  }

  getLateGeeks(){
    this.attendanceService
    .getLateComers()
    .subscribe(( lateGeeks : AttendanceModel[]) => {
      const dialogRef = this.lateComersModal.open(LatecomersModalComponent , {
        data: lateGeeks,
      });
    })
  }

  getCount(){
    this.attendanceService
    .earlyDeparture()
    .subscribe((e : AttendanceModel[])=>{
      this.ealryDepatureCount = e.length
    }
    );
   this.attendanceService
   .getAbsentGeeks()
   .subscribe((absent : any)=>{
    this.absentCount = absent.length
  }
  );
  this.attendanceService
  .getAttendances()
  .subscribe((all : AttendanceModel[])=>{
    this.allAttendancesCount = all.length
  }
  );
  this.attendanceService
  .getAllGeeks()
  .subscribe((geeks : any)=>{
    this.allGeeks = geeks.length
  });
  this.attendanceService
  .getLateComers()
  .subscribe((late : AttendanceModel[])=>{
    this.lateCount = late.length
  })
  }
}
