export interface Build{
    id: string;
    name: string;
    status: string;
    startTimeMillis: number;
    endTimeMillis: number;
    durationMillis: number;
    stages: Stage[];
}

export interface Stage {
    
    id: string;
    name: string;
    status: string;
    startTimeMillis: number;
    durationMillis: number;
  }
  
 
  