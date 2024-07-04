import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { BoxComponent } from './box/box.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BoxChartComponent } from './box-chart/box-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { FormsModule} from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { StagesStepperComponent } from './stages-stepper/stages-stepper.component';
import { SonarComponent } from './sonar/sonar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DarkModeToggleComponent,
    BoxComponent,
    PieChartComponent,
    BoxChartComponent,
    LineChartComponent,
    SelectComponent,
    StagesStepperComponent,
    SonarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
