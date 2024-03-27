import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { constants } from 'src/app/shared/global/global.constants';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  navItems: string[] = [];
  url: string = '';
  username: string | null = null;
  filterTerm!: string;
  date: string = new Date().toDateString();
  time: string = new Date().toTimeString();
  searchTarget!: string;

  constructor(private router: Router) {
    this.username = sessionStorage.getItem(constants.username);

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url.replace('/', '').replace('-', ' ');
        this.searchTarget = "Search " + this.url
      }
    });

  }

  ngOnInit(): void { console.log(this.filterTerm) }

  logout() {
    sessionStorage.clear();
    window.location.reload();
    sessionStorage.setItem(constants.time, this.time);
    sessionStorage.setItem("date", this.date);

  }

}
