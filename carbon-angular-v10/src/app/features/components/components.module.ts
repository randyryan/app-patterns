import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from 'carbon-components-angular';
import { FireModule } from '@carbon/icons-angular';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { CardModule } from 'src/app/components/card/card.module';
import { KpiCardModule } from 'src/app/components/kpi-card/kpi-card.module';

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
    KpiCardModule
  ]
})
export class ComponentsModule { }
