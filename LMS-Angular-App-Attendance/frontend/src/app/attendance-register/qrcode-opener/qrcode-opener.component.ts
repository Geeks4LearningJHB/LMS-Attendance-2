import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from '../services/attendance.service';
import { AttendanceModel } from '../models/attendance.interface';
@Component({
  selector: 'app-qrcode-opener',
  templateUrl: './qrcode-opener.component.html',
  styleUrls: ['./qrcode-opener.component.css']
})
export class QRCodeOpenerComponent {
    allowModalClosure!: boolean;
  formModel: any;
  attendance!:AttendanceModel
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AttendanceModel){}
   
    ngOnInit(){
      this.attendance = this.data
      console.log(this.attendance)
    }
    close() {
      this.close();
    }

}
