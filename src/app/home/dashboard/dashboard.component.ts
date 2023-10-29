import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts/highmaps';
import worldMap from "@highcharts/map-collection/custom/world-continents.geo.json";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  displayPicture: boolean = false;
  imgURL: string = '';
  name: string = '';
  editName: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    subtitle: {
      text:
        ''
    },
    mapNavigation: {
      enabled: false,
    },
    colorAxis: {
      min: 0
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: "map",
        states: {
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ['eu', 0],
          ['oc', 1],
          ['as', 2],
          ['na', 0],
          ['sa', 0],
          ['af', 1],
        ]
      }
    ]
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imgURL = localStorage.getItem('profile_picture') ?? '';
    this.displayPicture = this.imgURL === '' || this.imgURL == 'undefined' ? false : true;
    this.name = localStorage.getItem('name') ?? '';
  }

  editNameChange() {
    this.editName = !this.editName;
    localStorage.setItem('name', this.name);
  }

  navigateToCamera() {
    localStorage.setItem('name', this.name);
    this.router.navigate(['/capture']);
  }
}
