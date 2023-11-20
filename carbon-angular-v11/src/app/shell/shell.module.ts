import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, GridModule, IconModule, IconService, RadioModule, UIShellModule } from 'carbon-components-angular';
import Apps20 from "@carbon/icons/es/apps/20";
import Code20 from "@carbon/icons/es/code/20";
import ColorPalette20 from '@carbon/icons/es/color-palette/20';
import Home20 from "@carbon/icons/es/home/20";
import Notification20 from "@carbon/icons/es/notification/20";
import Settings20 from "@carbon/icons/es/settings/20";
import UserAvatar20 from "@carbon/icons/es/user--avatar/20";

import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    // Carbon Component modules
    BreadcrumbModule,
    GridModule,
    IconModule,
    RadioModule,
    UIShellModule
  ],
  exports: [
    // For debugging <cds-side-nav>
    UIShellModule,
    IconModule,
    HeaderComponent,
    BannerComponent,
    SidenavComponent,
  ]
})
export class ShellModule {
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
    iconService.registerAll([Apps20, Code20, ColorPalette20, Home20, Notification20, Settings20, UserAvatar20]);
  }
}
