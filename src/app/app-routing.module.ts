import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/components/login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'rickmorty', loadChildren: () => import('./rickmorty/rickmorty.module').then(m => m.RickmortyModule), canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent }, 
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
