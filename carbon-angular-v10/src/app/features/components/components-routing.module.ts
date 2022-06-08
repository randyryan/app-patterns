import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { BannerComponent } from 'src/app/shell/banner/banner.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent },
  { path: '', component: BannerComponent, outlet: 'banner' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
