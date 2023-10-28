import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';

import { HighchartsChartModule } from 'highcharts-angular';
import { CaptureImageComponent } from './capture-image/capture-image.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CaptureImageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    HighchartsChartModule
  ]
})
export class HomeModule { }
