export interface SonarQubeMeasure {
    metric: string;
    value: string;
    bestValue?: boolean;
  }
  
  export interface SonarQubeComponent {
    key: string;
    name: string;
    qualifier: string;
    measures: SonarQubeMeasure[];
  }
  
  export interface SonarQubeResponse {
    component: SonarQubeComponent;
  }
  