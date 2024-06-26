import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from '../_services';



@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent implements OnInit{
  isDarkMode: boolean = true;
  @Input() enableDark: boolean =false;
  constructor(private service: DarkModeService) {}

  ngOnInit(): void {
    this.service.isDarkMode$.subscribe({
      next : (state)=> this.isDarkMode= state
    })
  }

  toggleDarkMode(): void {
    this.service.toggleDarkMode();
  }
}
