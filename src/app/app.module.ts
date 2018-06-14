import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthServiceProvider } from './services/auth.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { AudioBarComponent } from './audio-bar/audio-bar.component';
import { PodcastComponent } from './podcast/podcast.component';
import { SettingComponent } from './setting/setting.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'podcast', component: PodcastComponent
  },
  {
    path: 'pricing', component: PricingComponent
  },
  {
    path: 'setting', component: SettingComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LandingComponent,
    AuthModalComponent,
    PageNotFoundComponent,
    PricingComponent,
    AudioBarComponent,
    PodcastComponent,
    SettingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule
  ],
  providers: [
    AuthServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
