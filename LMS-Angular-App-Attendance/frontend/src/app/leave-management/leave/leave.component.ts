import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { constants } from 'src/app/shared/global/global.constants';
import { Roles } from 'src/app/shared/global/roles';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  formModel: any;
  request: any | null = null;
  userRole: string | null = null;
  serverErrorMessage: any;
  editCrucialInfo: boolean = false;

  constructor(
    public modalRef: MdbModalRef<LeaveComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.request);
    this.userRole = sessionStorage.getItem(constants.role);
  }


  close() {
    this.modalRef.close();
  }

  isAllowed(role: any) {
    if (this.userRole == Roles.Super_Admin) {
      switch (role) {
        case Roles.Super_Admin:
          return true;
        default:
          return false;
      }
    } else if (this.userRole == Roles.Admin) {
      switch (role) {
        case Roles.Super_Admin:
        case Roles.Admin:
          return true;
        default:
          return false;
      }
    } else {
      return true;
    }
  }

}

