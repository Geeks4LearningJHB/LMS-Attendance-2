import { Component, OnInit } from '@angular/core';
import { ApplicationIndicator } from 'src/app/shared/global/application-indicator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css', '../../dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  ikmList: any[] = [
    {
      name: 'Andile Makhubu',
      idNumber: '9909024606082',
      testDate: '2022-08-23',
      testName: 'JAVA 8 PROGRAMMING (JAVA SE 8)',
      score: 59,
      percentile: 10,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-brands fa-java red-text'
    },
    {
      name: 'Anthony Shungube',
      idNumber: '0007131599081',
      testDate: '2022-08-23',
      testName: 'DEVOPS (DEVELOPMENT AND OPERATIONS) - RETIRED 6-10-2021',
      score: 69,
      percentile: 77,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-brands fa-dev'
    },
    {
      name: 'Clifford Kalake',
      idNumber: '9305249429089',
      testDate: '2022-08-23',
      testName: 'DATABASE CONCEPTS',
      score: 66,
      percentile: 38,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-solid fa-database'
    },
    {
      name: 'Joel Maredi',
      idNumber: '0201185232083',
      testDate: '2022-08-23',
      testName: 'AGILE PROCESS MANAGEMENT',
      score: 69,
      percentile: 19,
      applicationIndicator: ApplicationIndicator.Significant,
      faIcon: 'fa-brands fa-dev'
    },
    {
      name: 'Isaac Segagudi Makgato',
      idNumber: '9101097323080',
      testDate: '2022-08-23',
      testName: 'DATABASE CONCEPTS',
      score: 54,
      percentile: 15,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-solid fa-database'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
