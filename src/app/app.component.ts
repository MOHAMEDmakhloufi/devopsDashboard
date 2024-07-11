import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OptionObj } from './_interfaces/OptionObj';
import { JenkinsService } from './_services';
import { Build } from './_interfaces/Build';
import { BehaviorSubject } from 'rxjs';
import { SeleniumTest, TestCase } from './_interfaces/TestCase';


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
  generalLogs: string;
  selectedLogs: string;
  lastSeleniumTest: SeleniumTest;
  selectedSeleniumTest: SeleniumTest;
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
          this.getBuildLogs(this.selectedBuild.id)
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
        if(buildId == this.selectedBuild.id){
          this.selectedLogs = response;
          this.selectedSeleniumTest =this.getSeleniumTestInfo(this.selectedLogs)
        }
          
        if(buildId == this.builds[0].id  ){
          this.generalLogs = response;
          this.lastSeleniumTest =this.getSeleniumTestInfo(this.generalLogs)
        }
          

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

  getSeleniumTestInfo(log: string){
    const seleniumTest = {} as SeleniumTest;

    const lines = log.trim().split('\n');
    const totalTestsLine = lines.find(line => line.startsWith('Total Selenium Tests :'));
    if (!totalTestsLine) {
        console.error('Failed to parse Jenkins log: Total Tests line not found.');
        return null;
    }
    
    const totalTests = parseInt(totalTestsLine.split(':')[1].trim());

    const passedTestsLine = lines.find(line => line.startsWith('Total Selenium Passed Tests :'));
    if (!passedTestsLine) {
        console.error('Failed to parse Jenkins log: Total Passed Tests line not found.');
        return null;
    }
    const countPassedTests = parseInt(passedTestsLine.split(':')[1].trim());
    seleniumTest.totalPassedTest = countPassedTests
    const testStatus = lines.find(line => line.startsWith('Exception: Selenium Test Stage Was Failed'));
    seleniumTest.status = !testStatus
    const failedTestsLine = lines.find(line => line.startsWith('Total Selenium Failed Tests :'));
    if (!failedTestsLine) {
        console.error('Failed to parse Jenkins log: Total Failed Tests line not found.');
        return null;
    }
    const countFailedTests = parseInt(failedTestsLine.split(':')[1].trim());
    seleniumTest.totalFailedTest = countFailedTests

    const testCases: TestCase[] = [];

    for (let i = 0; i < totalTests; i++) {
        const testLine = lines.find(line => line.startsWith(`Test Selenium ${i + 1} :`));
        if (!testLine) {
            
            return null;
        }

        const statusMatch = testLine.match(/(Passed|Failed)/);
        if (!statusMatch) {
            
            return null;
        }
        const status = statusMatch[1] === 'Passed';

        const testMatch = testLine.match(/<([^>]*)>/);
        if (!testMatch) {
            
            return null;
        }
        const test = testMatch[1].trim();

        testCases.push({ status, test });
    }
    seleniumTest.testCase = testCases;
    return seleniumTest;

  }
}