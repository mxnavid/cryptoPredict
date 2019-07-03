import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CryptoSearchComponent } from './crypto-search/crypto-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CryptoCardComponent,
    NavbarComponent,
    CryptoSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
