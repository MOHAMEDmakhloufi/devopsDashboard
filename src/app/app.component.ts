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
  difficultStage: Object= {name: "nothing", value: 0};
  longerStage: Object = {name: "nothing", value: 0};
  status : string = 'in_progress';
  builds: Build[];
  selectedBuild : Build;
  logs: string;
  private isLogsLoading = new BehaviorSubject<boolean>(true);
  isLogsLoading$ = this.isLogsLoading.asObservable();

  buildsOptions: OptionObj[] = [];
  selectedValue: string;

  constructor(private jenkinsService: JenkinsService){}

  ngOnInit(): void {
    
    this.jenkinsService.builds$().subscribe({
      next: (response)=> {
        if(response.length){
          this.builds= response;
          
          this.getDifficultStage();
          this.getLongerStage();
          this.getBuildsOptions();
          this.selectedBuild = response[0]
          this.status = response[0]?.status;
          this.isPageLoading.next(false);
          setTimeout(() => {
            initFlowbite();
          }, 100);
        }else{
          alert("There aren't any build !")
        }
        //setInterval(()=>{this.changeDetection()}, 5000)
      },
      error: (e)=>{
       // this.isPageLoading.next(false);
        alert(e);
      }
    })
  }
  changeDetection(){
    this.jenkinsService.builds$().subscribe({
      next: (response)=> {
        let isChange= false;
        if(response.length){
          if(!this.builds){
            isChange = true
          }else if(response[0].name != this.builds[0].name || response[0].status != this.status || response[0].stages.length != this.builds[0].stages.length){
            isChange = true
          }
        }
        //console.log(isChange)
        if(isChange){
          
          this.isPageLoading.next(true);
          this.builds= response;
          this.getDifficultStage();
          this.getLongerStage();
          this.getBuildsOptions();
          this.selectedBuild = response[0]
          this.status = response[0]?.status;
          this.isPageLoading.next(false);
          setTimeout(() => {
            initFlowbite();
          }, 100);
        }
       //setInterval(()=>{console.log("hi")}, 1000)
      },
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
    this.buildsOptions.splice(0, this.buildsOptions.length)
    this.builds.forEach(b=> {
      
      this.buildsOptions.push({ value: b.id, label: b.name })
    })
    this.selectedValue = this.buildsOptions[0].value
    
  }
  getDifficultStage(){
    let failedStageCount= {}
    this.builds.forEach(build=> build.stages.forEach(stage=> {
      if (stage.status== 'failed') 
        failedStageCount[stage.name]?failedStageCount[stage.name]+=1: failedStageCount[stage.name]=1;

    }))
    const entries = Object.entries(failedStageCount)
    let maxEntry;
    if (entries.length){
      maxEntry = entries.reduce((max, entry) => {
        return entry[1] > max[1] ? entry : max;
      });
      this.difficultStage= {name: maxEntry[0], value: maxEntry[1]}
    }
    
    
  }

  getLongerStage(){
    let maxItem;
    const stages = this.builds[0].stages;
    if(stages.length){
      maxItem= stages.reduce((max, current)=>{
        return current.durationMillis > max.durationMillis? current: max;
      })
      this.longerStage= {name: maxItem.name, value: maxItem.durationMillis}
    }
    
    
    
  }
}