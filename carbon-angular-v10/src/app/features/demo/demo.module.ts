import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule, TabsModule } from 'carbon-components-angular';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    GridModule,
    TabsModule
  ]
})
export class DemoModule { }
