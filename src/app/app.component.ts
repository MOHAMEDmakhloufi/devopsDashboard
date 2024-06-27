import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OptionObj } from './_interfaces/OptionObj';
import { JenkinsService } from './_services';
import { Build } from './_interfaces/Build';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isPageLoading = new BehaviorSubject<boolean>(true);
  isPageLoading$ = this.isPageLoading.asObservable();
  difficultStage: Object;
  longerStage: Object;
  status : string = 'in_progress';
  builds: Build[];
  selectedBuild : Build;
  logs: string;
  private isLogsLoading = new BehaviorSubject<boolean>(true);
  isLogsLoading$ = this.isLogsLoading.asObservable();

  buildsOptions: OptionObj[] = [];
  constructor(private jenkinsService: JenkinsService){}

  ngOnInit(): void {
    
    this.jenkinsService.builds$().subscribe({
      next: (response)=> {
        this.builds= response;
        console.log(this.builds.length)
        this.getDifficultStage();
        this.getLongerStage();
        this.getBuildsOptions();
        this.selectedBuild = response[0]
        this.status = response[0]?.status;
        this.isPageLoading.next(false);
        setTimeout(() => {
          initFlowbite();
        }, 100);
      },
      error: (e)=>{
       // this.isPageLoading.next(false);
        alert(e);
      }
    })
  }

  getBuildLogs(buildId: string){
    this.isLogsLoading.next(true)
    this.jenkinsService.buildLogs$(buildId).subscribe({
      next: (response)=> {
        
        this.logs = response;
        this.isLogsLoading.next(false);
      },
      error: (e)=>{
        console.log(e)
        alert(e);
      }
    })
  }

  onSelectBuild(buildId){
    this.selectedBuild = this.builds.filter(b => b.id==buildId)[0];
  }

  getBuildsOptions(){
    this.builds.forEach(b=> {
      
      this.buildsOptions.push({ value: b.id, label: b.name })
    })
    
  }
  getDifficultStage(){
    let failedStageCount= {}
    this.builds.forEach(build=> build.stages.forEach(stage=> {
      if (stage.status== 'failed') 
        failedStageCount[stage.name]?failedStageCount[stage.name]+=1: failedStageCount[stage.name]=1;

    }))
    const maxEntry = Object.entries(failedStageCount).reduce((max, entry) => {
      return entry[1] > max[1] ? entry : max;
    });
    this.difficultStage= {name: maxEntry[0], value: maxEntry[1]}
    
  }

  getLongerStage(){
    let maxItem;
    if(this.builds[0].status!= 'in_progress')
      maxItem= this.builds[0].stages.reduce((max, current)=>{
        return current.durationMillis > max.durationMillis? current: max;
      })
    else
      maxItem= this.builds[1].stages.reduce((max, current)=>{
        return current.durationMillis > max.durationMillis? current: max;
      })
    
    this.longerStage= {name: maxItem.name, value: maxItem.durationMillis}
    
  }
}