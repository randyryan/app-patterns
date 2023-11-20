import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from './theme.component';
import { BannerComponent } from '../shell';

const routes: Routes = [
  { path: '', component: BannerComponent, outlet: 'banner' },
  { path: '', component: ThemeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
