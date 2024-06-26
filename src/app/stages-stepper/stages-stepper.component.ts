import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stages-stepper',
  templateUrl: './stages-stepper.component.html',
  styleUrls: ['./stages-stepper.component.css']
})
export class StagesStepperComponent {
  @Input() stages: { name: string, status: string }[] = [
    { name: 'Stage 1', status: 'success' },
    { name: 'Stage 2', status: 'failure' },
    { name: 'Stage 3', status: 'running' },
    { name: 'Stage 4', status: 'unstable' },
    { name: 'Stage 5', status: 'aborted' },
    { name: 'Stage 6', status: 'not executed' }
  ];
}
