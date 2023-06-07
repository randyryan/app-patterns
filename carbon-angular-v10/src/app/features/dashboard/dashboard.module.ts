import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePickerModule, GridModule, TimePickerModule, TimePickerSelectModule } from 'carbon-components-angular';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataTimeModule } from 'src/app/components/data-time/data-time.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridModule,
    DataTimeModule,
    DatePickerModule,
    TimePickerModule,
    TimePickerSelectModule
  ]
})
export class DashboardModule { }
