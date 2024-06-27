import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Build } from '../_interfaces/Build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipeline } from '../_interfaces/Pipeline';

@Injectable({
  providedIn: 'root'
})
export class JenkinsService {
  jenkinsUrl = "http://192.168.1.23:8080";
  username = "mohamed_makhloufi";
  apiToken = "11a138f688794ae1e51fdfb3bd2db99850";
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
        tap(console.log)
      );
  }

  buildLogs$(id) : Observable<string>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + this.encodeCredentials(this.username, this.apiToken)
    });
    return this.http.get<string>(`/jenkins/job/DASHBOARD-PIPELINE/${id}/logText/progressiveText/api/json`, {headers})
    .pipe(
        tap(console.log)
      );
  }
  

  encodeCredentials(username: string, password: string): string {
    return btoa(`${username}:${password}`);
  }
}
