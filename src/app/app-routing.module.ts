import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddComponent } from './contact/add/add.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';
import { AuthGuard } from './_core/_guard/auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  {
    path: 'contact',
    component: ContactComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: AddComponent },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule)
  },
  {
    path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: '**', component: StatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
