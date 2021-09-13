import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core'
import { NgxMatDatepickerSimpleFormattingDemoComponent } from './pages/ngx-mat-datepicker-simple-formatting-demo/ngx-mat-datepicker-simple-formatting-demo.component';
import { NgxMatDatepickerSimpleFormattingModule } from 'ngx-mat-datepicker-simple-formatting';

@NgModule({
  declarations: [
    AppComponent,
    NgxMatDatepickerSimpleFormattingDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMatDatepickerSimpleFormattingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
