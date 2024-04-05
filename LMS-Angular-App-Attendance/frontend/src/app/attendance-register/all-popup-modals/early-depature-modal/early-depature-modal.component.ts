import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceModel } from '../../models/attendance.interface';

@Component({
  selector: 'app-early-depature-modal',
  templateUrl: './early-depature-modal.component.html',
  styleUrls: ['./early-depature-modal.component.css']
})
export class EarlyDepatureModalComponent implements OnInit {

  earlyDepartures: AttendanceModel[] = []
  yesterdayDate!: Date;
  currentDate!:Date;
 constructor(public dialogRef: MatDialogRef<EarlyDepatureModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AttendanceModel[],
               private attendanceService:AttendanceService) {}
  
 
  ngOnInit(): void {
    this.currentDate = new Date();
    this.yesterdayDate = new Date();
    this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
    
   if (this.data && this.data.length > 0) {
      this.earlyDepartures = this.data
      console.log(this.earlyDepartures)
    }
    
  }
  closeModal() {
    this.dialogRef.close();
  }
}
