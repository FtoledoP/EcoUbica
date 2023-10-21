import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './admin/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { GreenPointComponent } from './admin/green-point/green-point.component';
import { ReportComponent } from './admin/report/report.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { UserComponent } from './admin/user/user.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    IndexComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    GreenPointComponent,
    ReportComponent,
    NotFoundComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    MatCardModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
