import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionObj } from 'src/app/_interfaces/OptionObj';





@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Output() onSelectBuild = new EventEmitter<string>();
  @Input() options: OptionObj[];
  @Input() selectedValue: string
  isChange: boolean =false;

  

  onSelectChange($event){
    this.onSelectBuild.emit($event)
  }
}
