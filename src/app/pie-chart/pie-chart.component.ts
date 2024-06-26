import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Build } from '../_interfaces/Build';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() data: Build[];
  labels: string[];
  values: number[];
  colors: string[];
  chart: Chart<"pie", number[], string> | undefined;

  constructor() {
    // Register Chart.js components
    Chart.register(...registerables);
  }

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
    const ctx = (document.getElementById('myPieChart') as HTMLCanvasElement)?.getContext('2d');
    // Ensure the canvas context is available
    if (!ctx) {
      return;
    }

    // Destroy any existing chart instance
    if (this.chart) {

      this.chart.destroy();
    }
    
    // Chart configuration object with correct types
    const config: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.values, // example data
          backgroundColor: this.colors,
          
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    };

    // Create new Chart instance with the configuration
    this.chart = new Chart(ctx, config);
  }

  getData(){
    let statusCount={}
    this.data.forEach(build=> {
      switch(build.status){
        case 'success' : statusCount['success']? statusCount['success']+=1: statusCount['success']=1;break;
        case 'failed' : statusCount['failed']? statusCount['failed']+=1: statusCount['failed']=1;break;
        case 'unstable' : statusCount['unstable']? statusCount['unstable']+=1: statusCount['unstable']=1;break;
        case 'aborted' : statusCount['aborted']? statusCount['aborted']+=1: statusCount['aborted']=1;break;
        case 'in_progress' : statusCount['in_progress']? statusCount['in_progress']+=1: statusCount['in_progress']=1;break;
      }
    })

    const statusColors: { [key: string]: string } = {
      success: 'rgba(75, 192, 192, 0.2)',   
      failed: 'rgba(255, 99, 132, 0.2)',    
      unstable: 'rgba(255, 206, 86, 0.2)',  
      aborted: 'rgba(201, 203, 207, 0.2)',  
      progress: 'rgba(54, 162, 235, 0.2)'   
    };
    
   
    this.colors = Object.keys(statusCount).map(key => statusColors[key]);

    this.labels = Object.keys(statusCount)
    this.values = Object.values(statusCount)
    
  }
}
