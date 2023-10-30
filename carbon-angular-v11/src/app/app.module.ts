import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbModule, GridModule, IconModule, IconService, UIShellModule } from 'carbon-components-angular';
import Notification20 from "@carbon/icons/es/notification/20";
import UserAvatar20 from "@carbon/icons/es/user--avatar/20";
import Apps20 from "@carbon/icons/es/apps/20";
import Home20 from "@carbon/icons/es/home/20";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconModule,
    UIShellModule,
    GridModule,
    BreadcrumbModule
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
    iconService.registerAll([Notification20, UserAvatar20, Apps20, Home20]);
  }
}
