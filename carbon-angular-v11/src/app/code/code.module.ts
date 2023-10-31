import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { CodeComponent } from './code.component';
import { GridModule } from 'carbon-components-angular';


@NgModule({
  declarations: [
    CodeComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    GridModule
  ]
})
export class CodeModule { }
