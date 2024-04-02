import { Component, OnInit } from '@angular/core';
import { AbsentModalComponent } from '../all-popup-modals/absent-modal/absent-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-total-present-absent-late-cards',
  templateUrl: './total-present-absent-late-cards.component.html',
  styleUrls: ['./total-present-absent-late-cards.component.css'],
})
export class TotalPresentAbsentLateCardsComponent implements OnInit {
  dialogRef: MatDialogRef<AbsentModalComponent> | undefined;

  constructor(private absentModal: MatDialog) {}

  openAbsentModal() {
    this.dialogRef = this.absentModal.open(AbsentModalComponent);
  }

  closeAbsentModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {}
}
