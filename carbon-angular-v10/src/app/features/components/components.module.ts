import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from 'carbon-components-angular';
import { FireModule } from '@carbon/icons-angular';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { CardModule, KpiCardModule } from 'carbon-components-custom';

@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    FireModule,
    ComponentsRoutingModule,
    CardModule,
    KpiCardModule
  ]
})
export class ComponentsModule { }
