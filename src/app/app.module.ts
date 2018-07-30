import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { WINDOW_PROVIDERS } from "./window.service";

import {ShowRealImgDirective} from './showRealImg.directive';
import {ColourPercentDirective} from './currency-percent-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    ShowRealImgDirective,
    ColourPercentDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ WINDOW_PROVIDERS ],
  bootstrap: [AppComponent]
})
export class AppModule { }
