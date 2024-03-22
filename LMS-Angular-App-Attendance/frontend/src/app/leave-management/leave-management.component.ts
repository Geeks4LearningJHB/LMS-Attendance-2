import { Component, OnInit } from '@angular/core';
import { constants as constants } from '../shared/global/global.constants';
import { Roles } from '../shared/global/roles';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;

  constructor(
  ) { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(constants.role);
    this.determineRole(role);
  }

  determineRole(role: string | null) {
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
}
