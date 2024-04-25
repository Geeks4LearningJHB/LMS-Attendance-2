import { Component,  Inject,  OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-absent-modal',
  templateUrl: './absent-modal.component.html',
  styleUrls: ['./absent-modal.component.css']
})
export class AbsentModalComponent implements OnInit {
absentGeeks : any
currentDate!: Date;
itemsPerPage: number = 5;
currentPage: number = 1;

 constructor(public dialogRef: MatDialogRef<AbsentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
 

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    if (this.data && this.data.length > 0) {
      this.absentGeeks = this.data
      console.log(this.absentGeeks)
    }
  }


  getStatus(status: string): any {
    return status.toLowerCase();
  }

  nextPage() {
    const pageCount = Math.ceil(this.absentGeeks.length / this.itemsPerPage);
    if (this.currentPage < pageCount) {
      this.currentPage++;
    }
  }
  

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getIndexRange(): { start: number, end: number } {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.absentGeeks.length);
    return { start: startIndex, end: endIndex };
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.absentGeeks.length / this.itemsPerPage);

    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
  isNextButtonDisabled(): boolean {
    const pageCount = Math.ceil(this.absentGeeks.length / this.itemsPerPage);
    return this.currentPage >= pageCount;
  }
  

}
