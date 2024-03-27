import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AttendanceModel } from '../attendance-register/models/attendance.interface';
import { AttendanceService } from '../attendance-register/services/attendance.service';
import { CaptureGoalsComponent } from '../goal-management/modals/capture-goals/capture-goals.component';
import { GoalModel } from '../goal-management/models/goal-model';
import { GoalManagementApiService } from '../goal-management/services/api/goal-management-api.service';
import { ActiveGoalService } from '../goal-management/services/logic-handlers/active-goal.service';
import { CaptureGoalService } from '../goal-management/services/logic-handlers/capture-goal.service';
import { EventService } from '../leave-management/services/event.service';
import {
  archivedState,
  backlogState,
  completedState,
  pausedState,
  startedState,
} from '../shared/constants/goal-states';
import { constants } from '../shared/global/global.constants';
import { Roles } from '../shared/global/roles';
import { getSessionStorageValue } from '../shared/global/utils';
import { TokenService } from '../user-management/login/services/token.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css'],
})
export class MasterLayoutComponent implements OnInit {
  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time: any;
  testTime: any;
  attendance!: AttendanceModel[];

  constructor(
    private tokenService: TokenService,
    private attendanceService: AttendanceService,
    private eventService: EventService,
    private captureGoalService: CaptureGoalService,
    private goalManagementApiService: GoalManagementApiService,
    private activeGoalPopupService: ActiveGoalService
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();

    // this.attendanceService
    //   .getAttendancesByUserId(user.id)
    //   .subscribe((attendances: AttendanceModel[]) => {
    //     attendances.forEach((res: any) => {
    //       this.attendance = res;
    //     });
    //   });

    this.getPublicHoildays(
      'en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom'
    );
    // this.captureGoal();

    if (
      getSessionStorageValue(constants.role) == Roles.Learner ||
      getSessionStorageValue(constants.role) == Roles.Super_Admin
    ) {
      this.getUserGoals(user.id);
    }
  }

  captureGoal() {
    this.testTime = new Date(Date.now()).getMinutes();
    const time: string | null = getSessionStorageValue('times');

    console.log(this.testTime, time);

    if (this.testTime == time) {
      this.captureGoalService.createNewGoal(this.attendance);
    }
    console.log(this.testTime);
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }

  getUserGoals(user_id: string) {
    console.log('Loading Goals');
    this.goalManagementApiService
      .onSelectUserGoals(user_id)
      .subscribe((goalObject: GoalModel) => {
        console.log(goalObject);
        switch (goalObject.goalStatus) {
          case backlogState:
            this.goalManagementApiService
              .getGoalTypeObjectList()
              .backlog.push(goalObject);
            break;
          case archivedState:
            this.goalManagementApiService
              .getGoalTypeObjectList()
              .archived.push(goalObject);
            break;
          case completedState:
            this.goalManagementApiService
              .getGoalTypeObjectList()
              .completed.push(goalObject);
            break;
          case pausedState:
            this.goalManagementApiService
              .getGoalTypeObjectList()
              .paused.push(goalObject);
            break;
          case startedState:
            // Restore goal session
            if (
              this.goalManagementApiService.getGoalTypeObjectList().started
                .length === 0
            ) {
              // Checking if user has a past session
              if (getSessionStorageValue('activeGoalSession')) {
                const lastActiveGoalSession = JSON.parse(
                  getSessionStorageValue('activeGoalSession')!
                );
                if (goalObject.id === lastActiveGoalSession.id)
                  goalObject.timeRemaining =
                    lastActiveGoalSession.timeRemaining;
              }

              this.goalManagementApiService
                .getGoalTypeObjectList()
                .started.push(goalObject);
              this.activeGoalPopupService.activateGoalCountDown(
                this.goalManagementApiService.getGoalTypeObjectList().started[0]
              );
            }
            break;
        }
      });
  }
}
