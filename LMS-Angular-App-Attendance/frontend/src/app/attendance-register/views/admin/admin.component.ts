import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { AttendanceStatus } from 'src/app/attendance-register/models/attendance-type';
import { UserService } from 'src/app/user-management/services/user.service';
import { AttendanceService } from '../../services/attendance.service';
import { AdminpopupComponent } from '../../popup/adminpopup/adminpopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
attendences: any[] = [];
  users: any;
  ids: any;
  testing: UntypedFormGroup = new UntypedFormGroup({});
  date: any;
  // testing data
  
  constructor(
    
    private formBuider: UntypedFormBuilder,
    private attendenceService: AttendanceService,
    private userService: UserService,private dialog: MatDialog
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    

    const date = currentDate.toISOString().split('T')[0];
    const convertedDate = new Date(date);
    this.getAllAttendances(date);
    console.log(convertedDate)
   
  }
 
  openModal(): void {
    this.dialog.open(AdminpopupComponent, {
      width: '800px',
    });
  }
  
getAllAttendances(date : String){
  this.attendenceService.getAttendances(date).subscribe(respose=>{
  this.attendences = respose
 console.log(this.attendences)
  })
}
  // getAttendences(skip: any, take: any) {
  //   this.attendenceService
  //     .getPagedAttendance(skip, take)
  //     .subscribe((res: any) => {
  //       this.attendences = res;
  //       console.log(res)
  //       console.log("Get Attendances method");
        
  //     });
  //   this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
  //     res.forEach((element: any) => {
  //       if (element.role == 'Learner') {
  //         this.ids = element.id;
  //         this.testing = this.formBuider.group({
  //           userId: [element.id],
  //           date: [this.date],
  //           status: ['Absent'],
  //         });
  //         this.attendenceService
  //           .captureDetails(this.testing.value)
  //           .subscribe((_) => {});
  //         console.log(this.testing.value);
  //         console.log(this.ids);
  //       }
  //     });
  //     this.users = res;
  //   });
  // }

  // getStatus(status: any): any {
  //   return status.toLowerCase();
  // }

  
}
