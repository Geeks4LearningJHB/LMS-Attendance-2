import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-review-goals',
  templateUrl: './review-goals.component.html',
  styleUrls: ['./review-goals.component.css']
})
export class ReviewGoalsComponent implements OnInit {

  constructor( public modalRef: MdbModalRef<ReviewGoalsComponent>,) {
 

  }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.close();
  }
  
}
