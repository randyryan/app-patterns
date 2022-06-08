import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule, GridModule, UIShellModule } from 'carbon-components-angular';
import {
  AppSwitcherModule,
  BookmarkModule,
  CodeModule,
  DashboardModule,
  HomeModule,
  NotificationModule,
  OpenPanelFilledTopModule,
  UserAvatarModule
} from '@carbon/icons-angular';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    UIShellModule,
    BreadcrumbModule,
    HomeModule,
    CodeModule,
    DashboardModule,
    BookmarkModule,
    AppSwitcherModule,
    NotificationModule,
    UserAvatarModule
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    BannerComponent,
    HomeModule,
    CodeModule,
    OpenPanelFilledTopModule,
    DashboardModule,
    BookmarkModule,
    AppSwitcherModule,
    NotificationModule,
    UserAvatarModule
  ]
})
export class ShellModule { }
