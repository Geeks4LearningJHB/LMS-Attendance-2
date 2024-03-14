import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { AttendanceStatus } from 'src/app/attendance-register/models/attendance-type';
import { UserService } from 'src/app/user-management/services/user.service';
import { AttendanceService } from '../../services/attendance.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  attendences: any[] = [];
  users: any;
  ids: any;
  testing: UntypedFormGroup = new UntypedFormGroup({});
  date: any;
  // testing data

  constructor(
    private formBuider: UntypedFormBuilder,
    private attendenceService: AttendanceService,
    //private userService: UserService
    private userService: UserService,private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAttendences(0, 10);
    this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -1);
  }

 /* user = [
    { id: 1, name: 'Thembi', surname: 'Makuwa', client: 'FNB', date: '2024-03-07', status: 'Present' },
    { id: 2, name: 'Fortune', surname: 'Mupisa', client: 'FNB',  date: '2024-03-07', status: 'Late' },
    { id: 2, name: 'Bheki', surname: 'Dube', client: 'Riverside',  date: '2024-03-07', status: 'Late' },
    { id: 2, name: 'Lethabo', surname: 'Mampa', client: 'Riverside',  date: '2024-03-07', status: 'Present' }
    
  ];

 
  openModal(): void {
    this.dialog.open(TrainerComponent, {
      width: '800px',
    });
  }*/
  getAttendences(skip: any, take: any) {
    this.attendenceService
      .getPagedAttendance(skip, take)
      .subscribe((res: any) => {
        this.attendences = res;
        console.log(this.attendences, 'attendances');
      });
    this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.role == 'Learner') {
          this.ids = element.id;
          this.testing = this.formBuider.group({
            userId: [element.id],
            date: [this.date],
            status: ['Absent'],
          });
          this.attendenceService
            .captureDetails(this.testing.value)
            .subscribe((_) => {});
          console.log(this.testing.value);
          console.log(this.ids);
        }
      });
      this.users = res;
    });
  }

  getStatus(status: any): any {
    return status.toLowerCase();
  }
}