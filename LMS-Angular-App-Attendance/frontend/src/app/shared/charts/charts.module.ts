import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DoughnutChartComponent
  ],
  exports: [
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ]
})
export class ChartsModule { }
