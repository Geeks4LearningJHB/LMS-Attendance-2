import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApplicationIndicator } from 'src/app/shared/global/application-indicator';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css', '../../dashboard.component.css']
})
export class TraineeDashboardComponent implements OnInit {
  labels: string[] | undefined;
  data1: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number; }[]; } | undefined;
  config: Chart<"bar", number[], unknown> | undefined;
  data: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string[]; hoverOffset: number; }[]; } | undefined;
  myPieChart: Chart<"doughnut", number[], string> | undefined;

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
      name: 'Andile Makhubu',
      idNumber: '9909024606082',
      testDate: '2022-08-23',
      testName: 'DEVOPS (DEVELOPMENT AND OPERATIONS) - RETIRED 6-10-2021',
      score: 69,
      percentile: 77,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-brands fa-dev'
    },
    {
      name: 'Andile Makhubu',
      idNumber: '9909024606082',
      testDate: '2022-08-15',
      testName: 'DATABASE CONCEPTS',
      score: 66,
      percentile: 38,
      applicationIndicator: ApplicationIndicator.Moderate,
      faIcon: 'fa-solid fa-database'
    },
    {
      name: 'Andile Makhubu',
      idNumber: '9909024606082',
      testDate: '2022-08-05',
      testName: 'AGILE PROCESS MANAGEMENT',
      score: 69,
      percentile: 19,
      applicationIndicator: ApplicationIndicator.Significant,
      faIcon: 'fa-brands fa-dev'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // bar 1
  //   const myChart = new Chart("myChart", {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });

  //bar 2
  this.labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

this.data1 =  {
  labels: this.labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
  this.config = new Chart("myChart", {
    type: 'bar',
    data: this.data1,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  });


// pie chart
this.data = {
  labels: [
    'Process',
    'In Process'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 100],
    backgroundColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    hoverOffset: 3
  }]
};
this.myPieChart = new Chart("myChartPie", {
  type: 'doughnut',
  data: this.data,
});

//Radar Chart
// const data2 = {
//   labels: [
//     'Eating',
//     'Drinking',
//     'Sleeping',
//     'Designing',
//     'Coding',
//     'Cycling',
//     'Running'
//   ],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 90, 81, 56, 55, 40],
//     fill: true,
//     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     borderColor: 'rgb(255, 99, 132)',
//     pointBackgroundColor: 'rgb(255, 99, 132)',
//     pointBorderColor: '#fff',
//     pointHoverBackgroundColor: '#fff',
//     pointHoverBorderColor: 'rgb(255, 99, 132)'
//   }, {
//     label: 'My Second Dataset',
//     data: [28, 48, 40, 19, 96, 27, 100],
//     fill: true,
//     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     borderColor: 'rgb(54, 162, 235)',
//     pointBackgroundColor: 'rgb(54, 162, 235)',
//     pointBorderColor: '#fff',
//     pointHoverBackgroundColor: '#fff',
//     pointHoverBorderColor: 'rgb(54, 162, 235)'
//   }]
// };
// const myRadarChart= new Chart("myChartRadar", {
//   type: 'radar',
//   data: data2,
//   options: {
//     elements: {
//       line: {
//         borderWidth: 3
//       }
//     }
//   },
// });


  }

}
