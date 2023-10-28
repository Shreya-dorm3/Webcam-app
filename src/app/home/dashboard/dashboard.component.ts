import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import worldMap from "@highcharts/map-collection/custom/world-continents.geo.json";

// const worldMap = require('@highcharts/map-collection/custom/world.geo.json');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap
    },
    subtitle: {
      text:
        '<a href="http://code.highcharts.com/mapdata/custom/world-continents.topo.json"></a>'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }
}
