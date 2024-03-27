import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AttendanceModel } from '../../models/attendance.interface';
import { AttendanceService } from '../../services/attendance.service';
@Component({
  selector: 'app-view-attendances',
  templateUrl: './view-attendances.component.html',
  styleUrls: ['./view-attendances.component.css']
})
export class ViewAttendancesComponent {

  allowModalClosure!: boolean;
  formModel: any;
  attendance!:AttendanceModel
  constructor(
    private formBuilder: UntypedFormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data: AttendanceModel ,
    private attendanceService:AttendanceService){}
   
    ngOnInit(){
      this.attendance = this.data
      console.log(this.attendance)
    }
    close() {
      this.close();
    }
}
