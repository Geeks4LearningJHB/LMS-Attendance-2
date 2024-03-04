import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show: boolean = false;
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loadState.subscribe(res => {
      this.show = res;
    });
  }

}
