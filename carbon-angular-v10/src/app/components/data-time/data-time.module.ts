import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronDownModule, TimeModule, WarningAltFilledModule, WarningAltModule, WarningFilledModule } from '@carbon/icons-angular';

import { DataTimePickerComponent } from './data-time-picker/data-time-picker.component';
import { DataTimeSelectComponent } from './data-time-select/data-time-select.component';

@NgModule({
  declarations: [
    DataTimePickerComponent,
    DataTimeSelectComponent
  ],
  imports: [
    CommonModule,
    ChevronDownModule,
    WarningAltFilledModule,
    WarningFilledModule,
    TimeModule
  ],
  exports: [
    DataTimePickerComponent,
    DataTimeSelectComponent
  ]
})
export class DataTimeModule { }
