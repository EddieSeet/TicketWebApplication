import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketComponent } from './Ticket/ticket/ticket.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {angularMaterial} from "./angularMaterial";
import { HomeComponent } from './home/home/home.component';
import { HeaderComponent } from './header/header/header.component';
import { SummaryComponent } from './summary/summary/summary.component'; 


@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    HomeComponent,
    HeaderComponent,
    SummaryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    angularMaterial


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
