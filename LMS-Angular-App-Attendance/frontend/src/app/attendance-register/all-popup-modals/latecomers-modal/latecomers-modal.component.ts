import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-latecomers-modal',
  templateUrl: './latecomers-modal.component.html',
  styleUrls: ['./latecomers-modal.component.css']
})
export class LatecomersModalComponent implements OnInit{



 constructor(public dialogRef: MatDialogRef<LatecomersModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
              
   lateComers: { name: string, phoneNumber: string, sponsor: string, date: Date , reason: string}[] = [
    { name: 'Thaba Sambo', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'), reason: "Taxi strike" },
    { name: 'Tshepo Msiza', phoneNumber: '123-456-7890', sponsor: 'ABSA', date: new Date('2022-04-05'),  reason: "Car broke" },
    { name: 'Sol Zondeka', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05'),  reason: "Wake up late" },
    { name: 'Aubrey Mashaba', phoneNumber: '123-456-7890', sponsor: 'FNB', date: new Date('2022-04-05') ,  reason: "Too much traffic"},
    { name: 'Wiseman Tali', phoneNumber: '123-456-7890', sponsor: 'Riverside', date: new Date('2022-04-05') ,  reason: "Waiting for my friend"},
  ];
 

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

}
