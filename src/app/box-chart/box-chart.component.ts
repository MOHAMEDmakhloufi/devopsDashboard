import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.css']
})
export class BoxChartComponent {
  @Input() title: string;
}
