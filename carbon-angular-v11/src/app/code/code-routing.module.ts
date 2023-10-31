import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from '../shell/banner/banner.component';
import { CodeComponent } from './code.component';

const routes: Routes = [
  { path: '', component: BannerComponent, outlet: 'banner' },
  { path: '', component: CodeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
