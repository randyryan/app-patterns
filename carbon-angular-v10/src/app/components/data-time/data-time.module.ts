import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from 'carbon-components-angular';

import { DataTimePickerComponent } from './data-time-picker/data-time-picker.component';
import { DataTimeSelectComponent } from './data-time-select/data-time-select.component';

@NgModule({
  declarations: [
    DataTimePickerComponent,
    DataTimeSelectComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    DataTimePickerComponent,
    DataTimeSelectComponent
  ]
})
export class DataTimeModule { }
