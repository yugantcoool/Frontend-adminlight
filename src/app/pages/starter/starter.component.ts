
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-starter-menu',
  styleUrls: ['./starter.component.scss'],
  templateUrl: './starter.component.html',
})
export class StarterMenuComponent {

  chart: any;
  canvas1: any;
  canvas2: any;
  ctx1: any;
  ctx2: any;


  constructor() { }

  ngAfterViewInit() {
    this.canvas1 = document.getElementById('donutChart');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart1 = new Chart(this.ctx1, {
      type: 'doughnut',
      data: {
        labels: ["Dataset 1", "Dataset 2", "Dataset 3"],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    this.canvas2 = document.getElementById('barChart');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart2 = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
        datasets: [{
          label: '# Data Usage',
          data: [65, 30, 40, 59, 25, 33, 70, 99],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(50, 168, 82)',
            'rgba(240, 156, 0)',
            'rgba(126, 7, 230)',
            'rgba(198, 224, 81)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });
  }

}
