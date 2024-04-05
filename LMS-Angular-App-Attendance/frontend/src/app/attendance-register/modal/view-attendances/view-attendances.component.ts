import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
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
  presentCount: any
  userEarlyDepartureCount: any
  constructor(
    private formBuilder: UntypedFormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data: AttendanceModel ,
    private attendanceService:AttendanceService,
    private fb: FormBuilder){}

    ngOnInit(){
      this.attendance = this.data
      console.log(this.attendance);
      this.formModel = this.fb.group({
        AttendanceStatus: [this.attendance.status, Validators.required] // Validators for required selection
      });
     const userId =  sessionStorage.getItem('userId')
     console.log("ID on view "+userId)
     this.getCount(this.attendance.userId)

    }


    close() {
      this.close();
    }
    updateStatus() {

      this.formModel
      const id = this.attendance.id;
      const newStatus = this.formModel.get('AttendanceStatus').value;
      this.attendanceService.updateAttendance(id,newStatus).subscribe((response) => {
        console.log('Status updated successfully', response);
      }, (error) => {
        console.error('Error updating status', error);
      });
    }


    getCount(userId : string | null){
      this.attendanceService
      .getAttendancesByUserId(userId)
      .subscribe((data : AttendanceModel[])=>{
       console.log('Present ', data)
      this.presentCount = data.length
      }
      )
      this.attendanceService.getUserEarlyDeparture(userId)
      .subscribe((data : AttendanceModel[])=>{
        console.log('Early Logouts', data);
        this.userEarlyDepartureCount = data.length;
      })
    }

}
