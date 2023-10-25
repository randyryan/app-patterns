import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconModule, IconService, UIShellModule } from 'carbon-components-angular';
import { HeaderComponent } from './header/header.component';

import Notification20 from "@carbon/icons/es/notification/20";
import UserAvatar20 from "@carbon/icons/es/user--avatar/20";
import Apps20 from "@carbon/icons/es/apps/20";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconModule,
    UIShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Inject Icon service into module constructor or even component,
   * it's better to register these modules early instead of later.
   *
   * It's recommended to use module constructor for most cases
   *
   * If needed, you can even create a shared module & register ALL needed icons. IconService is a singleton,
   * so registered icons will be available once you import the shared icon module.
   */
  constructor(protected iconService: IconService) {
    /**
     * Register the icons!
     */
    iconService.registerAll([Notification20, UserAvatar20, Apps20]);
  }
}
