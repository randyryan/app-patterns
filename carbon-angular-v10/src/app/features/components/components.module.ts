import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from 'carbon-components-angular';
import { FireModule } from '@carbon/icons-angular';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { KpiCardModule } from 'src/app/components/kpi-card/kpi-card.module';
import { CarbonComponentsCustomModule, CardModule } from 'carbon-components-custom';

@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    ComponentsRoutingModule,
    CardModule,
    FireModule,
    KpiCardModule,
    CarbonComponentsCustomModule
  ]
})
export class ComponentsModule { }
