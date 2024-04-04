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
  
 constructor(public dialogRef: MatDialogRef<EarlyDepatureModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AttendanceModel[],
               private attendanceService:AttendanceService) {}
               //  absentStudents: { name: string, phoneNumber: string, sponsor: string, date: Date , reason: string}[] = [
  //   { name: 'Neo Moloi', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'), reason: "Took a half day." },
  //   { name: 'Themba Zwane', phoneNumber: '123-456-7890', sponsor: 'ABSA', date: new Date('2022-04-05'),  reason: "Was not feeling ok." },
  //   { name: 'Thembinkosi Lorch', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'),  reason: "Felt like leaving early." },
  //   { name: 'Rowen Willams', phoneNumber: '123-456-7890', sponsor: 'Riverside', date: new Date('2022-04-05') ,  reason: "Tired of code not running!"},
  //   { name: 'Grant Kekana', phoneNumber: '123-456-7890', sponsor: 'AWS', date: new Date('2022-04-05') ,  reason: "Was a bit upset."},
  // ];
 
  ngOnInit(): void {
   if (this.data && this.data.length > 0) {
      this.earlyDepartures = this.data
      console.log(this.earlyDepartures)
    }
    
  }
  closeModal() {
    this.dialogRef.close();
  }
}
