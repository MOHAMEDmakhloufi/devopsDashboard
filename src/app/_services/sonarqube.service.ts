import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, tap } from 'rxjs';
import { SonarQubeResponse } from '../_interfaces/SonarQubeResponse';

@Injectable({
  providedIn: 'root'
})
export class SonarqubeService {

  apiToken = "squ_18d57c0ec645a816dcefa65fcbd540887dc6b289";
  constructor(
    private http : HttpClient
  ) { }

  sonarAnalysis$() : Observable<SonarQubeResponse>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.apiToken
    });
    return this.http.get<SonarQubeResponse>(`/sonar/api/measures/component?component=devopsDashboard&metricKeys=security_rating,coverage,bugs,vulnerabilities,tests,comment_lines_density,duplicated_lines,duplicated_blocks,complexity,lines`, {headers})
    .pipe(
        tap(console.log)
      );
  }
}
