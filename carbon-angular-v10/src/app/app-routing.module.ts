import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(module => module.HomeModule) },
  { path: 'components', loadChildren: () => import('./features/components/components.module').then(module => module.ComponentsModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(module => module.DashboardModule) },
  { path: 'dashboard/nav', loadChildren: () => import('./features/demo/demo.module').then(module => module.DemoModule) },
  { path: 'tutorial', loadChildren: () => import('./features/tutorial/tutorial.module').then(module => module.TutorialModule) },
  { path: 'repos', loadChildren: () => import('./features/repositories/repositories.module').then(module => module.RepositoriesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
