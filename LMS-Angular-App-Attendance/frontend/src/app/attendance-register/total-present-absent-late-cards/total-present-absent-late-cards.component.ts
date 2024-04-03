import { Component, OnInit } from '@angular/core';
import { AbsentModalComponent } from '../all-popup-modals/absent-modal/absent-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LatecomersModalComponent } from '../all-popup-modals/latecomers-modal/latecomers-modal.component';
import { EarlyDepatureModalComponent } from '../all-popup-modals/early-depature-modal/early-depature-modal.component';

@Component({
  selector: 'app-total-present-absent-late-cards',
  templateUrl: './total-present-absent-late-cards.component.html',
  styleUrls: ['./total-present-absent-late-cards.component.css'],
})
export class TotalPresentAbsentLateCardsComponent implements OnInit {

  dialogRef: MatDialogRef<AbsentModalComponent> | undefined;
  lateComersFilter: MatDialogRef<LatecomersModalComponent> | undefined;
  ealyDepatureFilter: MatDialogRef<EarlyDepatureModalComponent> | undefined;

  constructor(private absentModal: MatDialog,
     private lateComersModal: MatDialog, private ealyDepatureModal: MatDialog ) {}

  openAbsentModal() {
    this.dialogRef = this.absentModal.open(AbsentModalComponent);
  }

  closeAbsentModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openLatecomersModal() {
    this.lateComersFilter = this.lateComersModal.open(LatecomersModalComponent);
  }

  openEarlyDepatureModal() {
  this.ealyDepatureFilter = this.ealyDepatureModal.open(EarlyDepatureModalComponent);
}

  ngOnInit(): void {}
}
