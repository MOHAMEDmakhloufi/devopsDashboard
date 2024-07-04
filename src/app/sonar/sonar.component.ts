import { Component, OnInit } from '@angular/core';
import { SonarqubeService } from '../_services/sonarqube.service';
import { BehaviorSubject } from 'rxjs';
import { SonarQubeMeasure, SonarQubeResponse } from '../_interfaces/SonarQubeResponse';

@Component({
  selector: 'app-sonar',
  templateUrl: './sonar.component.html',
  styleUrls: ['./sonar.component.css']
})
export class SonarComponent implements OnInit{
  private isPageLoading = new BehaviorSubject<boolean>(true);
  isPageLoading$ = this.isPageLoading.asObservable();

  sonarMeasure: SonarQubeMeasure[];
  
  constructor(private sonarService: SonarqubeService){}

  ngOnInit(): void {
    this.sonarService.sonarAnalysis$().subscribe({
      next: (response)=> {
        this.sonarMeasure = response.component.measures;
        this.isPageLoading.next(false);
      },error: (e)=>{
        // this.isPageLoading.next(false);
         alert(e);
       }
    })
  }

}
