import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from 'carbon-components-angular';

import { CardComponent } from './card.component';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    GridModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
