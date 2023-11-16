import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'carbon-components-custom';
import {
  DatePickerModule,
  DropdownModule,
  GridModule,
  TimePickerModule,
  TimePickerSelectModule
} from 'carbon-components-angular';
import { DataTimeModule } from 'src/app/components';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DatePickerModule,
    DropdownModule,
    GridModule,
    TimePickerModule,
    TimePickerSelectModule,
    CardModule,
    DataTimeModule,
  ]
})
export class DashboardModule { }
