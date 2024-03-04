import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../goal-management/modals/capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from './lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from './review-goals/review-goals.component';
import { constants } from '../shared/global/global.constants';
import { Roles } from '../shared/global/roles';
import { getSessionStorageValue } from '../shared/global/utils';



@Component({
  selector: 'app-attendance-register',
  templateUrl: './attendance-register.component.html',
  styleUrls: ['./attendance-register.component.css']
})
export class AttendanceRegisterComponent implements OnInit {

  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time = new Date();
  today = new Date();
  todaysDataTime = '';


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,

  ) { }

  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;


  ngOnInit(): void {
    const role = getSessionStorageValue(constants.role);
    this.determinRole(role);
  }
  determinRole(role: string | null) {
    switch (role) {
      case Roles.Super_Admin:
      case Roles.Admin:
        this.isAdmin = true;
        break;
      case Roles.Trainer:
        this.isTrainer = true;
        break;
      case Roles.Learner:
        this.isLearner = true;
        break;
    }



  }

  CreateGoalsDialog() {
    this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }


  LunchDialog() {
    this.modalDialog = this.modalService.open(LunchTimeNotificationComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }


  GoalsDialog() {
    this.modalDialog = this.modalService.open(ReviewGoalsComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }

}
