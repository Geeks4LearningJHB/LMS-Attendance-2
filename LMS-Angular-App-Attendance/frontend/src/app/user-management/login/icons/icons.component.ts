import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openSocialMediaOnNewTab(url: string) {
    window.open(url, "_blank");
  }
}
