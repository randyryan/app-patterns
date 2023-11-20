import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';
import { GridModule, RadioModule } from 'carbon-components-angular';


@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    GridModule,
    RadioModule
  ]
})
export class ThemeModule { }
