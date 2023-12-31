import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './admin/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GreenPointComponent } from './admin/green-point/green-point.component';
import { ReportComponent } from './admin/report/report.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { UserComponent } from './admin/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'greenpoint',
    component: GreenPointComponent,
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
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
