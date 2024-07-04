import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { Build } from '../_interfaces/Build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipeline } from '../_interfaces/Pipeline';

@Injectable({
  providedIn: 'root'
})
export class JenkinsService {
  username = "mohamed_makhloufi";
  apiToken = "11f1a2f71344ebe8f331dd8e30ae00f155";
  constructor(
    private http : HttpClient
  ) { }

  builds$() : Observable<Build[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + this.encodeCredentials(this.username, this.apiToken)
    });
    return this.http.get<Build[]>(`/jenkins/job/DASHBOARD-PIPELINE/wfapi/runs`, {headers})
    .pipe(
        map(response => {
          response.forEach(build => {
            build.startDate = new Date(build.startTimeMillis)
            build.status = build.status.toLowerCase();
            build.stages.forEach(s=> s.status = s.status.toLowerCase())
          });
          return response
        }),
        //tap(console.log),
        delay(1000)
      );
  }

    buildLogs$(id) : Observable<string>{
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + this.encodeCredentials(this.username, this.apiToken),
      });
      return this.http.get<string>(`/jenkins/job/DASHBOARD-PIPELINE/${id}/logText/progressiveText/api/json`, {headers, responseType: 'text' as 'json'})
      .pipe(
          tap(console.log)
        );
    }
  

  encodeCredentials(username: string, password: string): string {
    return btoa(`${username}:${password}`);
  }
}
