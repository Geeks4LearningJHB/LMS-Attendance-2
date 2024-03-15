import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceModel } from '../../models/attendance.interface';

@Component({
  selector: 'app-adminpopup',
  templateUrl: './adminpopup.component.html',
  styleUrls: ['./adminpopup.component.css']
})
export class AdminpopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceModel[]) {}
  
}
