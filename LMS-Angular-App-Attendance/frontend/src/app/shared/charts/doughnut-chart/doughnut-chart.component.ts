import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() dataSet: any;
  @Input() primaryColor: any;

  // Doughnut
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {};

  constructor() {

  }

  ngOnInit(): void {
    this.doughnutChartDatasets = [
      {
        data: [ this.dataSet?.used, this.dataSet?.remaining ],
        backgroundColor: [
          '#CCCCCC',
          this.primaryColor
        ],
        hoverBackgroundColor: [
          '#CCCCCC',
          this.primaryColor
        ],
        hoverBorderColor: [
          '#CCCCCC',
          this.primaryColor
        ],
        borderWidth: 1
      }
    ];

    this.doughnutChartOptions = {
      responsive: false,
    };

  }

}
