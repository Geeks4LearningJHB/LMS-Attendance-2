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
    }

    
    close() {
      this.close();
    }
    updateStatus() {

      this.formModel
      // Call the backend service to update the status
      const id = this.attendance.id;
      const newStatus = this.formModel.get('AttendanceStatus').value;

      this.attendanceService.updateAttendance1(id,newStatus).subscribe((response) => {
        // Handle response if needed
        console.log('Status updated successfully', response);
      }, (error) => {
        // Handle error if needed
        console.error('Error updating status', error);
      });
    }
  

}
