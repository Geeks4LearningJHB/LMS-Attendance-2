import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-lunch-time-notification',
  templateUrl: './lunch-time-notification.component.html',
  styleUrls: ['./lunch-time-notification.component.css'],
})
export class LunchTimeNotificationComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<LunchTimeNotificationComponent>) {}

  ngOnInit(): void {}

  close() {
    this.modalRef.close();
  }
}
