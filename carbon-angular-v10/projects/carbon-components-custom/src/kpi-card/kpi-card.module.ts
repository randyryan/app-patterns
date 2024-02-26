import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from 'carbon-components-angular';
import { FireModule } from '@carbon/icons-angular';

import { CardModule } from '../card';
import { KpiCardComponent } from './kpi-card.component';

@NgModule({
  declarations: [
    KpiCardComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    FireModule,
    CardModule
  ],
  exports: [
    KpiCardComponent
  ]
})
export class KpiCardModule { }
