import { Component, Inject, Output , EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceModel } from '../../models/attendance.interface';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-adminpopup',
  templateUrl: './adminpopup.component.html',
  styleUrls: ['./adminpopup.component.css']
})

export class AdminpopupComponent {

  unexpectedLogOut!:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceModel[] , private attendanceService:AttendanceService) {}
  
  ngOnInit() {
    if (this.data && this.data.length > 0) {
      const attendanceId = this.data[0].id;
      this.checkUexpectedLogOut(attendanceId);
    }
  }
  checkUexpectedLogOut(attendanceId: string) {
    this.attendanceService
      .unexpectedLogOutTime(attendanceId)
      .subscribe(response => {
        this.unexpectedLogOut = response;
        console.log(attendanceId)
        console.log("The status is " + this.unexpectedLogOut);
      });
  }
 
  @Output() doneClicked = new EventEmitter<void>();

  onDoneClick() {
    this.doneClicked.emit();
  }

}
