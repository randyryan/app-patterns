import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { CodeComponent } from './code.component';
import { DropdownModule, GridModule } from 'carbon-components-angular';
import { DropdownTreelist } from 'carbon-fiber';


@NgModule({
  declarations: [
    CodeComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    GridModule,
    DropdownModule,
    DropdownTreelist
  ]
})
export class CodeModule { }
