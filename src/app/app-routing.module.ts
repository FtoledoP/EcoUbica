import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './admin/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GreenPointComponent } from './admin/green-point/green-point.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [],
  },
  {
    path: 'greenpoint',
    component: GreenPointComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
