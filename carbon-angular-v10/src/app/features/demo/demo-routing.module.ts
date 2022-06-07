import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from 'src/app/shell/banner/banner.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: '', component: BannerComponent, outlet: 'banner' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
