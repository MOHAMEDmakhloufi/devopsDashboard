import { Component, Input } from '@angular/core';
import { SeleniumTest } from '../_interfaces/TestCase';

@Component({
  selector: 'app-selenium',
  templateUrl: './selenium.component.html',
  styleUrls: ['./selenium.component.css']
})
export class SeleniumComponent {
  @Input() seleniumTest: SeleniumTest;
}
