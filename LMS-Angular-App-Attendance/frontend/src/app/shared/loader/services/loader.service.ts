import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadCount: number = 0;
  loadState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.loadCount+=1;
    this.loadState.next(true);
  }

  hideLoader() {
    this.loadCount = (this.loadCount ? --this.loadCount : 0);
    if (!this.loadCount) this.loadState.next(false);
  }

}
