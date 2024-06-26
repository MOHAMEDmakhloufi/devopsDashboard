import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode = new BehaviorSubject<boolean>(true);
  isDarkMode$ = this.isDarkMode.asObservable();


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setDarkModeFromLocalStorage();
    }
  }


  setDarkModeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkMode = localStorage.getItem('darkMode')
      if (isDarkMode == undefined) {
        this.toggleDarkMode(true);
      }else{
        this.toggleDarkMode(isDarkMode == 'true');
      }
      
    }
  }

  toggleDarkMode(isDarkMode?: boolean): void {
    
    if (isPlatformBrowser(this.platformId)) {
      if (isDarkMode === undefined) {
        isDarkMode = !this.isDarkMode.value;
      }
      this.isDarkMode.next(isDarkMode) ;
      localStorage.setItem('darkMode', this.isDarkMode.value.toString());
      document.documentElement.classList.toggle('dark', this.isDarkMode.value);
    }
  }
}
