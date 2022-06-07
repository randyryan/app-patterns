import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, ButtonModule, CodeSnippetModule, GridModule, TabsModule } from 'carbon-components-angular';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InfoModule } from './info/info.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    TutorialRoutingModule,
    BreadcrumbModule,
    ButtonModule,
    CodeSnippetModule,
    GridModule,
    TabsModule,
    InfoModule
  ]
})
export class TutorialModule { }
