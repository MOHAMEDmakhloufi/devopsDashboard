export interface Build{
    id: string;
    name: string;
    status: string;
    startTimeMillis: number;
    startDate?: Date;
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
  
 
  