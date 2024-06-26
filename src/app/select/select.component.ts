import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionObj } from 'src/app/_interfaces/OptionObj';





@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit{

  @Output() onSelectBuild = new EventEmitter<string>();
  @Input() options: OptionObj[];
  selectedValue: string
  isChange: boolean =false;

  ngOnInit(): void {
    this.selectedValue = this.options[0].value
  }

  onSelectChange($event){
    this.onSelectBuild.emit($event)
  }
}
