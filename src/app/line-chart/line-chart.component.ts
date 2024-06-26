import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Build } from '../_interfaces/Build';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() data: Build[];
  labels: string[];
  values: number[];

  chart: Chart<"line", number[], string> | undefined;

  

  ngOnInit(): void {
    this.getData()
    this.createChart();
  }

  ngOnDestroy(): void {
    // Destroy the chart instance if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart() {
    const ctx = (document.getElementById('myLineChart') as HTMLCanvasElement)?.getContext('2d');

    // Ensure the canvas context is available
    if (!ctx) {
      return;
    }

    // Destroy any existing chart instance
    if (this.chart) {
      this.chart.destroy();
    }

    // Chart configuration object with correct types
    const config: ChartConfiguration<'line', number[], string> = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'duration',
          data: this.values,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Build'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Duration Millis'
            },
            beginAtZero: true
          }
        }
      }
    };

    // Create new Chart instance with the configuration
    this.chart = new Chart(ctx, config);
  }

  getData(){
    this.labels = this.data.map(build=> build.name).reverse()
    this.values = this.data.map(build=> build.durationMillis).reverse()
    
  }
}
